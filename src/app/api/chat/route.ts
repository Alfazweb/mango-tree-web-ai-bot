import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

type ChatRequestBody = {
  message?: string
  messages?: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
}

function runPythonChat(body: ChatRequestBody): Promise<string> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), 'scripts', 'chatbot.py')

    let groqKey = process.env.groqapi || process.env.GROQ_API_KEY
    if (groqKey) {
      // Strip any accidental surrounding quotes from .env
      groqKey = groqKey.replace(/^["']+|["']+$/g, '')
    }
    if (!groqKey) {
      reject(new Error('Missing Groq API key. Set `groqapi` in .env.'))
      return
    }

    const child = spawn('python', [scriptPath], {
      env: {
        ...process.env,
        GROQ_API_KEY: groqKey,
        SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME || '',
        SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN || '',
        SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION || '',
      },
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (d) => {
      stdout += d.toString()
    })
    child.stderr.on('data', (d) => {
      stderr += d.toString()
    })

    child.on('error', (err) => {
      reject(err)
    })

    child.on('close', (code) => {
      if (stderr.trim()) {
        // stderr is helpful but don't fail just because it's non-empty
        // unless Python returned non-zero.
      }

      if (code !== 0) {
        try {
          const parsed = JSON.parse(stdout || '{}') as { error?: string }
          reject(new Error(parsed.error || `Python exited with code ${code}`))
          return
        } catch {
          reject(new Error(`Python exited with code ${code}: ${stderr || stdout}`))
          return
        }
      }

      try {
        const parsed = JSON.parse(stdout) as { reply?: string; error?: string }
        if (parsed.error) {
          reject(new Error(parsed.error))
          return
        }
        resolve(parsed.reply || '')
      } catch (e) {
        reject(new Error(`Invalid Python output: ${String(e)}`))
      }
    })

    child.stdin.write(JSON.stringify(body))
    child.stdin.end()
  })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody
    const message = (body.message || '').trim()
    const hasMessages = Array.isArray(body.messages) && body.messages.length > 0

    if (!hasMessages && !message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const reply = await runPythonChat(body)
    return NextResponse.json({ reply })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
