'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, PhoneIcon, CalendarIcon, ChartBarIcon, UserGroupIcon, GlobeAltIcon, ShieldCheckIcon, CpuChipIcon, ClockIcon, UserIcon, RocketLaunchIcon, TrophyIcon, ChatBubbleBottomCenterTextIcon, CubeTransparentIcon, DocumentTextIcon, LightBulbIcon, WrenchScrewdriverIcon, StarIcon, CheckIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    title: 'Digital Transformation',
    description: 'Transform your business with cutting-edge digital solutions that drive growth and efficiency.',
    icon: '🚀',
  },
  {
    title: 'Cloud Solutions',
    description: 'Leverage the power of cloud computing with our scalable and secure infrastructure solutions.',
    icon: '☁️',
  },
  {
    title: 'Custom Software',
    description: 'Build tailored software solutions that perfectly align with your business needs.',
    icon: '💻',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to gain competitive advantages.',
    icon: '🤖',
  },
]

const clients = [
  { name: 'Tech Corp', logo: '/placeholder-logo.svg' },
  { name: 'Innovation Inc', logo: '/placeholder-logo.svg' },
  { name: 'Future Systems', logo: '/placeholder-logo.svg' },
  { name: 'Digital Dynamics', logo: '/placeholder-logo.svg' },
]

const achievements = [
  { number: '500+', label: 'Projects Completed' },
  { number: '200+', label: 'Happy Clients' },
  { number: '50+', label: 'Expert Team' },
  { number: '10+', label: 'Years Experience' },
]

const processSteps = [
  {
    icon: LightBulbIcon,
    title: 'Discovery & Analysis',
    description: 'We begin by understanding your business objectives, challenges, and requirements through in-depth consultation.',
    details: [
      'Business requirements gathering',
      'Technical assessment',
      'Stakeholder interviews',
      'Current system analysis'
    ]
  },
  {
    icon: DocumentTextIcon,
    title: 'Strategy & Planning',
    description: 'Our experts develop a comprehensive roadmap tailored to your specific needs and goals.',
    details: [
      'Solution architecture design',
      'Technology stack selection',
      'Project timeline planning',
      'Resource allocation'
    ]
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Development & Implementation',
    description: 'We bring your solution to life using agile methodologies and best practices.',
    details: [
      'Iterative development',
      'Quality assurance',
      'Regular progress updates',
      'Continuous integration'
    ]
  },
  {
    icon: RocketLaunchIcon,
    title: 'Launch & Support',
    description: 'We ensure smooth deployment and provide ongoing support for your solution.',
    details: [
      'Deployment preparation',
      'User training',
      'Performance monitoring',
      'Continuous improvement'
    ]
  }
]

const successStories = [
  {
    clientName: 'Healthcare Solutions Ltd',
    industry: 'Healthcare',
    projectType: 'Digital Transformation',
    description: 'Revolutionized patient care management system with AI-powered solutions and digital health records integration.',
    results: [
      '45% reduction in patient wait times',
      '60% improvement in data accuracy',
      'Enhanced patient satisfaction',
      'Streamlined operations workflow'
    ],
    image: '/success-story-1.jpg'
  },
  {
    clientName: 'SmartLogistics Corp',
    industry: 'Transportation',
    projectType: 'IoT Implementation',
    description: 'Implemented IoT-based fleet management and real-time tracking system for improved logistics operations.',
    results: [
      '35% reduction in fuel costs',
      '40% improvement in delivery times',
      'Real-time fleet monitoring',
      'Enhanced route optimization'
    ],
    image: '/success-story-2.jpg'
  },
  {
    clientName: 'SecureBank Financial',
    industry: 'Banking',
    projectType: 'Security Enhancement',
    description: 'Upgraded banking security infrastructure with advanced threat detection and prevention systems.',
    results: [
      '99.99% system security',
      'Zero security breaches',
      'Improved customer trust',
      'Regulatory compliance achieved'
    ],
    image: '/success-story-3.jpg'
  }
]

const recognitions = [
  {
    award: 'Technology Excellence Award 2023',
    organization: 'Digital Innovation Forum',
    description: 'Recognized for outstanding contributions to digital transformation.',
    icon: TrophyIcon
  },
  {
    award: 'Best IT Solutions Provider',
    organization: 'Business Technology Awards',
    description: 'Awarded for innovative IT solutions and exceptional service delivery.',
    icon: StarIcon
  },
  {
    award: 'Innovation Leader 2023',
    organization: 'Tech Innovators Council',
    description: 'Recognized for pioneering technology solutions in multiple industries.',
    icon: LightBulbIcon
  }
]

const contactInfo = {
  phone: '+91-9220607577',
  email: 'info@mangotreetechnology.com',
  address: {
    street: '1166 sector 14 dwarka',
    city: 'New Delhi',
    pincode: '110078',
    country: 'India'
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-secondary">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
            Innovate. Transform. Succeed.
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
            We deliver cutting-edge IT solutions that transform businesses and drive success in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl mb-6">Why Choose MangoIT?</h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that drive real results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary p-6 rounded-lg hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl mb-6">Our Process</h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary p-8 rounded-lg relative group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-text-secondary mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-text-secondary">
                      <span className="text-accent mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent mb-2">{achievement.number}</div>
                <div className="text-text-secondary">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Send Us a Message Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading text-4xl mb-6">Send Us a Message</h2>
              <p className="text-text-secondary text-xl">
                Have a project in mind? Let's discuss how we can help you achieve your goals.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-primary p-8 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-text-secondary mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-text-secondary mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                />
              </div>
              <div className="mb-6">
                <label className="block text-text-secondary mb-2">Message *</label>
                <textarea
                  required
                  placeholder="Tell us about your project..."
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full text-lg py-4">
                Send Message
              </button>
              <p className="text-text-secondary text-sm mt-4 text-center">
                * Required fields
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl mb-6">Success Stories</h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              Discover how we've helped businesses transform and achieve their goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.clientName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.clientName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-accent mb-2">{story.industry}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{story.clientName}</h3>
                  <div className="text-sm text-accent mb-4">{story.projectType}</div>
                  <p className="text-text-secondary mb-4">{story.description}</p>
                  <div className="space-y-2">
                    {story.results.map((result, i) => (
                      <div key={i} className="flex items-start text-text-secondary">
                        <CheckIcon className="w-5 h-5 text-accent mr-2 flex-shrink-0" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl mb-6">Recognized by the Best</h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              Our commitment to excellence has earned us recognition from leading industry organizations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recognitions.map((recognition, index) => (
              <motion.div
                key={recognition.award}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary p-8 rounded-lg text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <recognition.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{recognition.award}</h3>
                <div className="text-accent mb-4">{recognition.organization}</div>
                <p className="text-text-secondary">{recognition.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Certification Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
          >
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="w-32 h-16 bg-secondary/50 rounded-lg flex items-center justify-center"
              >
                <Image
                  src={`/certification-${index}.svg`}
                  alt={`Certification ${index}`}
                  width={80}
                  height={40}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading text-4xl mb-6">Ready to Transform Your Business?</h2>
            <p className="text-text-secondary text-xl mb-8">
              Let's discuss how we can help you achieve your digital transformation goals.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary btn-lg group"
            >
              Get in Touch
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 