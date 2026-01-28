'use client'

import { motion } from 'framer-motion'
import { ChartBarIcon, UserGroupIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { 
    value: '10+', 
    label: 'Years Experience',
    description: 'Delivering innovative IT solutions since 2014',
    icon: ChartBarIcon 
  },
  { 
    value: '500+', 
    label: 'Projects Completed',
    description: 'Successful projects across various industries',
    icon: RocketLaunchIcon 
  },
  { 
    value: '50+', 
    label: 'Expert Team',
    description: 'Skilled professionals dedicated to your success',
    icon: UserGroupIcon 
  },
  { 
    value: '20+', 
    label: 'Countries Served',
    description: 'Global reach with local expertise',
    icon: GlobeAltIcon 
  },
]

const values = [
  {
    title: 'Innovation',
    description: 'We constantly push the boundaries of technology to deliver cutting-edge solutions.',
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do, from code to customer service.',
  },
  {
    title: 'Integrity',
    description: 'We build trust through transparency, honesty, and ethical business practices.',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients to ensure their success is our success.',
  },
]

const timeline = [
  {
    year: '2014',
    title: 'Company Founded',
    description: 'Started with a vision to transform businesses through technology',
  },
  {
    year: '2016',
    title: 'Global Expansion',
    description: 'Opened offices in multiple countries to serve clients worldwide',
  },
  {
    year: '2018',
    title: 'Innovation Hub',
    description: 'Launched our innovation lab focusing on AI and emerging technologies',
  },
  {
    year: '2020',
    title: 'Digital Leadership',
    description: 'Recognized as a leader in digital transformation solutions',
  },
  {
    year: '2022',
    title: 'Sustainable Growth',
    description: 'Expanded our services while maintaining our commitment to quality',
  },
  {
    year: '2024',
    title: 'Future Ready',
    description: 'Continuing to innovate and shape the future of technology',
  },
]

const teamMembers = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    image: '/team/placeholder.jpg',
    bio: 'With over 15 years of experience in technology and business leadership, John leads our vision for innovation.',
    linkedin: '#',
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    image: '/team/placeholder.jpg',
    bio: 'A technology veteran with expertise in cloud architecture and digital transformation strategies.',
    linkedin: '#',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Innovation',
    image: '/team/placeholder.jpg',
    bio: 'Leading our AI and emerging technology initiatives with a focus on practical business applications.',
    linkedin: '#',
  },
  {
    name: 'Emily Williams',
    role: 'Client Success Director',
    image: '/team/placeholder.jpg',
    bio: 'Ensuring our clients achieve their goals through effective solution implementation and support.',
    linkedin: '#',
  },
]

export default function About() {
  return (
    <main className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading text-5xl mb-6">Our Story</h1>
            <p className="text-text-secondary text-xl">
              Building the future of technology solutions since 2014. We're passionate about 
              transforming businesses through innovative IT solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary p-6 rounded-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-accent/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-white font-medium mb-2">{stat.label}</div>
                <p className="text-text-secondary text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading text-4xl mb-6">Our Mission</h2>
              <div className="space-y-6 text-text-secondary text-lg">
                <p>
                  At MangoIT, we're driven by a simple but powerful mission: to help businesses 
                  thrive in the digital age through innovative technology solutions.
                </p>
                <p>
                  We believe that every business deserves access to cutting-edge technology that 
                  can transform their operations and drive growth. Our team of experts works 
                  tirelessly to deliver solutions that make this vision a reality.
                </p>
                <p>
                  Through our commitment to excellence, innovation, and client success, we've 
                  become a trusted partner for businesses across the globe.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <div key={value.title} className="bg-secondary p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl mb-6">Our Journey</h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              A decade of innovation, growth, and transformative success.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start mb-12 last:mb-0"
              >
                <div className="flex-none w-24 text-2xl font-bold text-accent">{item.year}</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl mb-6">Our Leadership Team</h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              Meet the experts leading our mission to deliver innovative technology solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary rounded-lg overflow-hidden group"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <div className="text-accent mb-4">{member.role}</div>
                  <p className="text-text-secondary mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading text-4xl mb-6">Join Our Journey</h2>
            <p className="text-text-secondary text-xl mb-8">
              Be part of our mission to transform businesses through technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="btn btn-primary btn-lg">
                View Careers
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 