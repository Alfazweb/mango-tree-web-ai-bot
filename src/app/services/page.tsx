'use client'

import { motion } from 'framer-motion'
import { 
  CloudArrowUpIcon, 
  CogIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CpuChipIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const services = [
  {
    icon: GlobeAltIcon,
    title: 'Digital Transformation',
    description: 'Transform your business with innovative digital solutions',
    features: [
      'Business Process Automation',
      'Legacy System Modernization',
      'Digital Strategy Consulting',
      'Enterprise Software Solutions',
      'Data Analytics & Insights',
      'User Experience Design'
    ],
    benefits: [
      'Increased Operational Efficiency',
      'Enhanced Customer Experience',
      'Data-Driven Decision Making',
      'Competitive Advantage'
    ]
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure services',
    features: [
      'Cloud Migration & Strategy',
      'Cloud-Native Development',
      'DevOps Implementation',
      'Microservices Architecture',
      'Containerization',
      'Serverless Computing'
    ],
    benefits: [
      'Reduced Infrastructure Costs',
      'Improved Scalability',
      'Enhanced Security',
      'Business Continuity'
    ]
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile Development',
    description: 'Custom mobile applications for iOS and Android',
    features: [
      'Native App Development',
      'Cross-Platform Solutions',
      'Progressive Web Apps',
      'Mobile UI/UX Design',
      'App Store Optimization',
      'Mobile Analytics'
    ],
    benefits: [
      'Increased User Engagement',
      'Broader Market Reach',
      'Enhanced Brand Presence',
      'Improved Customer Service'
    ]
  },
  {
    icon: CpuChipIcon,
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by advanced AI',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Machine Learning Models',
      'AI Consulting',
      'Automated Decision Systems'
    ],
    benefits: [
      'Automated Operations',
      'Predictive Insights',
      'Reduced Costs',
      'Improved Accuracy'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions for your business',
    features: [
      'Security Assessments',
      'Threat Detection & Response',
      'Compliance Management',
      'Data Protection',
      'Security Training',
      'Incident Response'
    ],
    benefits: [
      'Enhanced Data Protection',
      'Regulatory Compliance',
      'Risk Mitigation',
      'Peace of Mind'
    ]
  },
  {
    icon: CogIcon,
    title: 'IT Consulting',
    description: 'Expert guidance for your technology initiatives',
    features: [
      'Technology Strategy',
      'IT Infrastructure Planning',
      'Project Management',
      'Vendor Management',
      'Technology Assessment',
      'Digital Roadmap'
    ],
    benefits: [
      'Strategic Direction',
      'Cost Optimization',
      'Risk Management',
      'Innovation Leadership'
    ]
  }
]

export default function Services() {
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
            <h1 className="heading text-5xl mb-6">Our Services</h1>
            <p className="text-text-secondary text-xl">
              Comprehensive IT solutions tailored to drive your business forward in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary p-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-accent/10 p-4 rounded-lg w-16 h-16 mb-6">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-text-secondary mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-text-secondary">
                        <span className="text-accent mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-text-secondary">
                        <span className="text-accent mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="heading text-4xl mb-6">Ready to Get Started?</h2>
            <p className="text-text-secondary text-xl mb-8">
              Let's discuss how our services can help you achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact Us
              </Link>
              <Link href="/get-started" className="btn btn-outline btn-lg">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 