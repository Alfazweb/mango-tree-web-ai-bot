'use client'

import { motion } from 'framer-motion'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

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

export default function Contact() {
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
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-text-secondary text-xl">
              Get in touch with us to discuss your project or learn more about our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {/* Phone Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-primary p-6 rounded-lg text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-accent/10 rounded-lg">
                <PhoneIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                {contactInfo.phone}
              </a>
            </motion.div>

            {/* Email Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-primary p-6 rounded-lg text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-accent/10 rounded-lg">
                <EnvelopeIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-text-secondary hover:text-accent transition-colors break-all"
              >
                {contactInfo.email}
              </a>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary p-6 rounded-lg text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-accent/10 rounded-lg">
                <MapPinIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
              <address className="text-text-secondary not-italic">
                {contactInfo.address.street}<br />
                {contactInfo.address.city} - {contactInfo.address.pincode}<br />
                {contactInfo.address.country}
              </address>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-primary p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-center mb-8">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div>
                  <label className="block text-text-secondary mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                  />
                </div>
                <div>
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
                <p className="text-text-secondary text-sm text-center">
                  * Required fields
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 