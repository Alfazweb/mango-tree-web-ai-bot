'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

const blogPosts = [
  {
    id: 'ai-in-healthcare',
    title: 'The Impact of AI in Modern Healthcare',
    excerpt: 'Discover how artificial intelligence is revolutionizing healthcare delivery and patient care.',
    category: 'Artificial Intelligence',
    author: 'Dr. Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#334155"/><text x="400" y="200" font-family="Arial" font-size="32" fill="#fff" text-anchor="middle" dominant-baseline="middle">AI in Healthcare</text></svg>'),
    tags: ['AI', 'Healthcare', 'Technology']
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security Best Practices for 2024',
    excerpt: 'Learn the latest security measures to protect your cloud infrastructure from emerging threats.',
    category: 'Cloud Computing',
    author: 'Michael Chen',
    date: 'March 10, 2024',
    readTime: '7 min read',
    image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#2563eb"/><text x="400" y="200" font-family="Arial" font-size="32" fill="#fff" text-anchor="middle" dominant-baseline="middle">Cloud Security</text></svg>'),
    tags: ['Cloud', 'Security', 'DevOps']
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation Success Stories',
    excerpt: 'Real-world examples of successful digital transformation initiatives across industries.',
    category: 'Digital Transformation',
    author: 'Emily Rodriguez',
    date: 'March 5, 2024',
    readTime: '6 min read',
    image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#475569"/><text x="400" y="200" font-family="Arial" font-size="32" fill="#fff" text-anchor="middle" dominant-baseline="middle">Digital Transformation</text></svg>'),
    tags: ['Digital Transformation', 'Innovation', 'Business']
  },
  {
    id: 'blockchain-finance',
    title: 'Blockchain Revolution in Finance',
    excerpt: 'How blockchain technology is reshaping the future of financial services.',
    category: 'Blockchain',
    author: 'Alex Thompson',
    date: 'March 1, 2024',
    readTime: '8 min read',
    image: '/blog/blockchain.jpg',
    tags: ['Blockchain', 'Finance', 'Technology']
  },
  {
    id: 'iot-smart-cities',
    title: 'IoT and the Future of Smart Cities',
    excerpt: 'Exploring how IoT technologies are transforming urban environments into smart cities.',
    category: 'IoT',
    author: 'David Kim',
    date: 'February 28, 2024',
    readTime: '6 min read',
    image: '/blog/iot-cities.jpg',
    tags: ['IoT', 'Smart Cities', 'Innovation']
  },
  {
    id: 'cybersecurity-trends',
    title: 'Emerging Cybersecurity Trends',
    excerpt: 'Stay ahead of the curve with these emerging cybersecurity trends and threats.',
    category: 'Cybersecurity',
    author: 'Lisa Martinez',
    date: 'February 25, 2024',
    readTime: '5 min read',
    image: '/blog/cybersecurity.jpg',
    tags: ['Cybersecurity', 'Technology', 'Security']
  }
]

export default function Blog() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-text-secondary text-xl">
              Insights, thoughts, and expertise from our team of technology experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
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
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 