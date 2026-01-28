import json
import os
import sys
import urllib.request
import urllib.error
import urllib.parse
import re


def _read_stdin_json() -> dict:
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    return json.loads(raw)

def _strip_quotes(s: str) -> str:
    return re.sub(r"^['\"]+|['\"]+$", "", (s or "").strip())


def _http_json(url: str, headers: dict, method: str = "GET", body: dict | None = None, timeout: int = 30) -> dict:
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        err_body = ""
        try:
            err_body = e.read().decode("utf-8")
        except Exception:
            pass
        raise RuntimeError(f"HTTPError {e.code}: {err_body or e.reason}") from e
    except Exception as e:
        raise RuntimeError(f"Request failed: {e}") from e


def _groq_chat_completion(api_key: str, messages: list[dict]) -> str:
    url = "https://api.groq.com/openai/v1/chat/completions"
    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": messages,
        "temperature": 0.6,
        "max_tokens": 512,
    }

    parsed = _http_json(
        url,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "mango-chatbot/1.0",
        },
        method="POST",
        body=payload,
        timeout=30,
    )
    return (
        parsed.get("choices", [{}])[0]
        .get("message", {})
        .get("content", "")
        .strip()
    )


def _is_order_question(text: str) -> bool:
    t = (text or "").lower()
    keywords = [
        "order",
        "orders",
        "tracking",
        "track",
        "delivery",
        "delivered",
        "shipment",
        "shipping",
        "status",
        "refund",
        "return",
        "cancel",
        "cancellation",
        "invoice",
    ]
    return any(k in t for k in keywords)


def _extract_order_identifiers(text: str) -> tuple[str | None, str | None]:
    """
    Returns (order_id, order_number).
    - order_id: Shopify numeric id (usually long digits)
    - order_number: something like 1001, optionally preceded by '#'
    """
    t = (text or "")

    # Try to find explicit Shopify order ID: long numeric (>= 10 digits)
    m = re.search(r"\b(\d{10,})\b", t)
    order_id = m.group(1) if m else None

    # Try to find order number like #1001 or "order 1001"
    m2 = re.search(r"#\s*(\d{3,7})\b", t)
    if not m2:
        m2 = re.search(r"\border\s*(?:no\.?|number)?\s*(\d{3,7})\b", t, flags=re.IGNORECASE)
    order_number = m2.group(1) if m2 else None

    return order_id, order_number


def _shopify_base(shop_name: str, api_version: str) -> str:
    shop = (shop_name or "").strip()
    shop = shop.replace("https://", "").replace("http://", "")
    shop = shop.replace(".myshopify.com", "")
    if not shop:
        raise RuntimeError("Missing SHOPIFY_STORE_NAME")
    ver = (api_version or "2024-01").strip()
    return f"https://{shop}.myshopify.com/admin/api/{ver}"


def _shopify_headers(access_token: str) -> dict:
    token = (access_token or "").strip()
    if not token:
        raise RuntimeError("Missing SHOPIFY_ACCESS_TOKEN")
    return {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
        "User-Agent": "mango-chatbot/1.0",
    }


def _shopify_get_order_by_id(shop_name: str, access_token: str, api_version: str, order_id: str) -> dict:
    base = _shopify_base(shop_name, api_version)
    url = f"{base}/orders/{urllib.parse.quote(order_id)}.json"
    return _http_json(url, headers=_shopify_headers(access_token), method="GET", timeout=30)


def _shopify_get_orders_by_number(shop_name: str, access_token: str, api_version: str, order_number: str) -> dict:
    base = _shopify_base(shop_name, api_version)
    # Shopify REST: /orders.json?name=#1001
    q = urllib.parse.urlencode({"name": f"#{order_number}"})
    url = f"{base}/orders.json?{q}"
    return _http_json(url, headers=_shopify_headers(access_token), method="GET", timeout=30)

def _safe_get(d: dict, key: str, default=None):
    try:
        return d.get(key, default)
    except Exception:
        return default


def _format_money(amount, currency: str | None) -> str:
    if amount is None:
        return ""
    try:
        s = str(amount)
    except Exception:
        s = ""
    cur = (currency or "").strip()
    return f"{s} {cur}".strip()


def _format_order_summary(order: dict) -> str:
    """
    Creates a clean, readable summary for chat UI (no raw JSON).
    """
    name = _safe_get(order, "name") or ""
    oid = _safe_get(order, "id") or ""
    created = _safe_get(order, "created_at") or ""
    financial = _safe_get(order, "financial_status") or ""
    fulfillment = _safe_get(order, "fulfillment_status") or "unfulfilled"
    currency = _safe_get(order, "currency") or ""
    total = _format_money(_safe_get(order, "current_total_price") or _safe_get(order, "total_price"), currency)

    customer = _safe_get(order, "customer") or {}
    customer_name = " ".join(
        [str(customer.get("first_name") or "").strip(), str(customer.get("last_name") or "").strip()]
    ).strip()
    email = _safe_get(order, "email") or customer.get("email") or ""

    lines = []
    if name or oid:
        lines.append(f"Order: {name} (ID: {oid})".strip())
    if created:
        lines.append(f"Created: {created}")
    if total:
        lines.append(f"Total: {total}")
    if financial:
        lines.append(f"Payment: {financial}")
    if fulfillment:
        lines.append(f"Fulfillment: {fulfillment}")
    if customer_name or email:
        lines.append(f"Customer: {customer_name}{(' — ' + email) if email else ''}".strip())

    # Items
    items = _safe_get(order, "line_items") or []
    if isinstance(items, list) and items:
        lines.append("")
        lines.append("Items:")
        for it in items[:25]:
            title = str(_safe_get(it, "title") or "").strip()
            qty = _safe_get(it, "quantity")
            price = _format_money(_safe_get(it, "price"), currency)
            part = f"- {qty} × {title}".strip()
            if price:
                part += f" @ {price}"
            lines.append(part)

    # Shipping / tracking
    fulfillments = _safe_get(order, "fulfillments") or []
    tracking_lines = []
    if isinstance(fulfillments, list):
        for f in fulfillments:
            tnum = _safe_get(f, "tracking_number")
            turl = _safe_get(f, "tracking_url")
            company = _safe_get(f, "tracking_company")
            if tnum or turl:
                tracking_lines.append(
                    f"- {company + ': ' if company else ''}{tnum or ''}{(' — ' + turl) if turl else ''}".strip()
                )
    if tracking_lines:
        lines.append("")
        lines.append("Tracking:")
        lines.extend(tracking_lines[:10])

    # Helpful follow-up
    lines.append("")
    lines.append("If this isn’t the right order, please share your Order ID (long number) or Order Number like #1001.")

    return "\n".join(lines).strip()


def _build_system_prompt() -> str:
    return (
        "You are a helpful support assistant for the Mango Tree website.\n"
        "IMPORTANT:\n"
        "- you should reply in only that language which customer is using even the whatsapp indian like english (which means the conetent is in english but as we read the conent it sounds hindi)\n"
        "- Keep answers concise and clear.\n"
        "- If the user asks about order status/details/tracking/refund, ask for their Shopify Order ID "
        "(a long number) OR their Order Number like #1001 if you don't have it yet.\n"
        "- When order data is provided to you, summarize the key details (financial status, fulfillment status, "
        "shipping/tracking if present, items, total, created date) and ask any missing follow-up questions.\n"
        "- Never reveal API keys or access tokens.\n"
    )


def _coerce_messages(inp: dict) -> list[dict]:
    """
    Accept either:
      - { message: "..." }
      - { messages: [{role: "user"|"assistant"|"system", content: "..."}] }
    """
    msgs = inp.get("messages")
    if isinstance(msgs, list) and msgs:
        cleaned = []
        for m in msgs:
            if not isinstance(m, dict):
                continue
            role = (m.get("role") or "").strip()
            content = (m.get("content") or "").strip()
            if role in ("user", "assistant", "system") and content:
                cleaned.append({"role": role, "content": content})
        if cleaned:
            return cleaned
    message = (inp.get("message") or "").strip()
    if message:
        return [{"role": "user", "content": message}]
    return []


def main() -> int:
    try:
        api_key = _strip_quotes(os.environ.get("GROQ_API_KEY", ""))
        if not api_key:
            raise RuntimeError("Missing GROQ_API_KEY in environment")

        inp = _read_stdin_json()
        history = _coerce_messages(inp)
        if not history:
            raise RuntimeError("Missing 'message' (or 'messages') in request body")

        # Ensure system prompt is first message
        messages: list[dict] = [{"role": "system", "content": _build_system_prompt()}]
        messages.extend(history)

        # Shopify integration (only when user is asking about orders)
        last_user_text = ""
        for m in reversed(history):
            if m.get("role") == "user":
                last_user_text = m.get("content", "")
                break

        if _is_order_question(last_user_text):
            order_id, order_number = _extract_order_identifiers(last_user_text)
            if not order_id and not order_number:
                # Ask for order identifier in user's language (via Groq)
                messages.append(
                    {
                        "role": "assistant",
                        "content": "To help with your order, please share your Order ID (long number) or Order Number like #1001.",
                    }
                )
                reply = _groq_chat_completion(api_key, messages)
            else:
                shop = _strip_quotes(os.environ.get("SHOPIFY_STORE_NAME", ""))
                token = _strip_quotes(os.environ.get("SHOPIFY_ACCESS_TOKEN", ""))
                ver = _strip_quotes(os.environ.get("SHOPIFY_API_VERSION", "2024-01"))

                order_data = None
                if order_id:
                    order_data = _shopify_get_order_by_id(shop, token, ver, order_id)
                else:
                    order_data = _shopify_get_orders_by_number(shop, token, ver, order_number or "")

                # Prefer deterministic formatting for order details (clean UI)
                # Shopify returns either {"order": {...}} or {"orders": [...]}
                order_obj = None
                if isinstance(order_data, dict):
                    if isinstance(order_data.get("order"), dict):
                        order_obj = order_data.get("order")
                    elif isinstance(order_data.get("orders"), list) and order_data.get("orders"):
                        order_obj = order_data.get("orders")[0]

                if not order_obj:
                    reply = "No order was found with that ID/number. Please double-check and try again."
                else:
                    reply = _format_order_summary(order_obj)
        else:
            reply = _groq_chat_completion(api_key, messages)

        if not reply:
            reply = "Sorry — I couldn't generate a response right now."

        sys.stdout.write(json.dumps({"reply": reply}))
        return 0
    except Exception as e:
        sys.stdout.write(json.dumps({"error": str(e)}))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())



# import os
# import json
# import requests
# from dotenv import load_dotenv

# load_dotenv()

# SHOP_NAME = os.getenv("SHOPIFY_STORE_NAME", "").strip()
# ACCESS_TOKEN = os.getenv("SHOPIFY_ACCESS_TOKEN", "").strip()
# API_VERSION = os.getenv("SHOPIFY_API_VERSION", "2024-01").strip()

# # ✅ Safety: remove domain if added by mistake
# SHOP_NAME = SHOP_NAME.replace(".myshopify.com", "")

# if not SHOP_NAME or not ACCESS_TOKEN:
#     print("❌ Missing env variables. Check .env file.")
#     exit()

# headers = {
#     "X-Shopify-Access-Token": ACCESS_TOKEN,
#     "Content-Type": "application/json"
# }

# def print_json(data):
#     print(json.dumps(data, indent=2, ensure_ascii=False))

# choice = input("Type 1 for Order ID OR Type 2 for Order Number (#1001): ").strip()

# if choice == "1":
#     order_id = input("Enter Shopify Order ID (example: 5897461234567): ").strip()
#     url = f"https://{SHOP_NAME}.myshopify.com/admin/api/{API_VERSION}/orders/{order_id}.json"

#     response = requests.get(url, headers=headers)

#     print("\n✅ Request URL:", url)
#     print("Status Code:", response.status_code)

#     if response.status_code == 200:
#         print("\n✅ ORDER FULL DETAILS (ALL DATA) ✅\n")
#         print_json(response.json())
#     else:
#         print("\n❌ ERROR RESPONSE\n")
#         print(response.text)

# elif choice == "2":
#     order_number = input("Enter Order Number (example: 1001 / 4999): ").strip()

#     url = f"https://{SHOP_NAME}.myshopify.com/admin/api/{API_VERSION}/orders.json"
#     params = {"name": f"#{order_number}"}

#     response = requests.get(url, headers=headers, params=params)

#     print("\n✅ Request URL:", url)
#     print("Status Code:", response.status_code)

#     if response.status_code == 200:
#         data = response.json()
#         orders = data.get("orders", [])

#         if not orders:
#             print("\n❌ No order found with this order number.")
#         else:
#             print("\n✅ ORDER FULL DETAILS (ALL DATA) ✅\n")
#             print_json({"orders": orders})   # prints everything
#     else:
#         print("\n❌ ERROR RESPONSE\n")
#         print(response.text)

# else:
#     print("❌ Wrong input. Please choose 1 or 2.")
