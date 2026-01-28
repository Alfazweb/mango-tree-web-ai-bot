'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'

type ContentBlock = {
  type: 'paragraph' | 'heading' | 'list' | 'quote'
  content?: string
  items?: string[]
} & (
  | { type: 'paragraph' | 'heading' | 'quote'; content: string }
  | { type: 'list'; items: string[] }
)

type BlogPost = {
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  tags: string[]
  content: ContentBlock[]
}

const blogContent: Record<string, BlogPost> = {
  'ai-in-healthcare': {
    title: 'The Impact of AI in Modern Healthcare',
    excerpt: 'Discover how artificial intelligence is revolutionizing healthcare delivery and patient care.',
    category: 'Artificial Intelligence',
    author: 'Dr. Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#334155"/><text x="400" y="200" font-family="Arial" font-size="32" fill="#fff" text-anchor="middle" dominant-baseline="middle">AI in Healthcare</text></svg>'),
    tags: ['AI', 'Healthcare', 'Technology'],
    content: [
      {
        type: 'paragraph',
        content: 'Artificial Intelligence is transforming the healthcare industry in unprecedented ways. From diagnosis to treatment planning, AI-powered solutions are enhancing medical professionals\' capabilities and improving patient outcomes.'
      },
      {
        type: 'heading',
        content: 'Early Disease Detection'
      },
      {
        type: 'paragraph',
        content: 'One of the most significant impacts of AI in healthcare is its ability to detect diseases at early stages. Machine learning algorithms can analyze medical images with remarkable accuracy, often identifying potential issues before they become visible to the human eye.'
      },
      {
        type: 'list',
        items: [
          'Advanced image recognition for radiology',
          'Pattern detection in patient data',
          'Predictive analytics for disease progression',
          'Real-time monitoring and alerts'
        ]
      },
      {
        type: 'heading',
        content: 'Personalized Treatment Plans'
      },
      {
        type: 'paragraph',
        content: 'AI systems can analyze vast amounts of patient data to recommend personalized treatment plans. By considering factors such as genetic makeup, lifestyle, and medical history, these systems help doctors make more informed decisions.'
      },
      {
        type: 'quote',
        content: 'AI is not replacing healthcare professionals; it\'s empowering them to make better decisions and provide superior care to their patients.'
      }
    ]
  },
  'cloud-security': {
    title: 'Cloud Security Best Practices for 2024',
    excerpt: 'Learn the latest security measures to protect your cloud infrastructure from emerging threats.',
    category: 'Cloud Computing',
    author: 'Michael Chen',
    date: 'March 10, 2024',
    readTime: '7 min read',
    image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#2563eb"/><text x="400" y="200" font-family="Arial" font-size="32" fill="#fff" text-anchor="middle" dominant-baseline="middle">Cloud Security</text></svg>'),
    tags: ['Cloud', 'Security', 'DevOps'],
    content: [
      {
        type: 'paragraph',
        content: 'As organizations continue to migrate their infrastructure to the cloud, securing these environments becomes increasingly critical. This guide explores the latest cloud security best practices for 2024.'
      },
      {
        type: 'heading',
        content: 'Zero Trust Architecture'
      },
      {
        type: 'paragraph',
        content: 'Zero Trust has become the gold standard for cloud security. This approach assumes no trust by default and requires verification from anyone trying to access resources, regardless of their location.'
      },
      {
        type: 'list',
        items: [
          'Identity and Access Management (IAM)',
          'Multi-factor Authentication (MFA)',
          'Network Segmentation',
          'Continuous Monitoring'
        ]
      },
      {
        type: 'heading',
        content: 'Data Encryption'
      },
      {
        type: 'paragraph',
        content: 'Implementing robust encryption for data at rest and in transit is crucial. Modern encryption standards and key management practices help protect sensitive information from unauthorized access.'
      },
      {
        type: 'quote',
        content: 'Security is not a one-time implementation but a continuous process of improvement and adaptation to new threats.'
      }
    ]
  },
  // Add content for other blog posts similarly
}

export default function BlogPost() {
  const params = useParams()
  const post = blogContent[params.id as keyof typeof blogContent]

  if (!post) {
    return (
      <main className="min-h-screen pt-24">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center">Blog post not found</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-primary">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-text-secondary hover:text-white mb-8 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <UserIcon className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto prose prose-invert prose-accent"
          >
            {post.content.map((block, index) => {
              switch (block.type) {
                case 'paragraph':
                  return (
                    <p key={index} className="text-text-secondary text-lg leading-relaxed mb-6">
                      {block.content}
                    </p>
                  )
                case 'heading':
                  return (
                    <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-6">
                      {block.content}
                    </h2>
                  )
                case 'list':
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-text-secondary mb-6">
                      {block.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )
                case 'quote':
                  return (
                    <blockquote key={index} className="border-l-4 border-accent pl-6 my-8">
                      <p className="text-xl text-text-secondary italic">
                        {block.content}
                      </p>
                    </blockquote>
                  )
                default:
                  return null
              }
            })}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary px-3 py-1 rounded-full text-sm text-text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </main>
  )
} 