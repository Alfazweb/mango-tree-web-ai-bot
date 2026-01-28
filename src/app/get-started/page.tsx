'use client'

import { motion } from 'framer-motion'
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const pricingPlans = [
  {
    name: 'Starter',
    price: '$2,999',
    description: 'Perfect for small businesses starting their digital journey',
    features: [
      'Initial consultation',
      'Basic website development',
      'Mobile responsive design',
      'SEO optimization',
      '3 months support',
      'Basic analytics',
    ],
  },
  {
    name: 'Professional',
    price: '$5,999',
    description: 'Ideal for growing businesses needing comprehensive solutions',
    features: [
      'Everything in Starter, plus:',
      'Custom web application',
      'Advanced integrations',
      'E-commerce functionality',
      '6 months support',
      'Advanced analytics',
      'Performance optimization',
      'Security features',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations',
    features: [
      'Everything in Professional, plus:',
      'Custom software development',
      'AI/ML integration',
      'Cloud infrastructure',
      'Dedicated support team',
      'Priority response',
      'Custom analytics',
      'Advanced security',
      'Training sessions',
    ],
  },
]

export default function GetStarted() {
  return (
    <main className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading text-5xl mb-6">Get Started with MangoIT</h1>
            <p className="text-text-secondary text-xl">
              Choose the perfect plan for your business and start your digital transformation journey today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-primary rounded-lg p-8 relative ${
                  plan.popular ? 'border-2 border-accent' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-accent mb-4">{plan.price}</div>
                  <p className="text-text-secondary">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className="h-6 w-6 text-accent flex-shrink-0 mr-3" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary w-full">
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="heading text-4xl mb-6">Schedule a Free Consultation</h2>
              <p className="text-text-secondary text-xl">
                Not sure which plan is right for you? Let's discuss your needs and find the perfect solution.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-secondary p-8 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-text-secondary mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-primary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Your Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-primary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-text-secondary mb-2">Company</label>
                <input
                  type="text"
                  placeholder="Your company name"
                  className="w-full px-4 py-3 bg-primary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                />
              </div>
              <div className="mb-6">
                <label className="block text-text-secondary mb-2">Project Details</label>
                <textarea
                  placeholder="Tell us about your project and requirements..."
                  rows={4}
                  className="w-full px-4 py-3 bg-primary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                ></textarea>
              </div>
              <button className="btn btn-primary w-full text-lg py-4">
                Schedule Consultation
                <ArrowRightIcon className="ml-2 h-6 w-6" />
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  )
} 