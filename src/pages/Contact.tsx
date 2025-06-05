import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions about app development? Want to collaborate? I'd love to hear from you!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:daxpatel.cg@gmail.com" className="text-gray-900 hover:text-indigo-600">
                    daxpatel.cg@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Social Media</p>
                  <div className="space-x-4">
                    <a href="https://www.linkedin.com/in/dax-cg/" className="text-gray-900 hover:text-indigo-600">LinkedIn</a>
                    <a href="https://x.com/dax_CG" className="text-gray-900 hover:text-indigo-600">Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">YouTube Channel</h3>
              <p className="text-gray-600 mb-4">
                Subscribe to my channel for upcoming tutorials and guides on app development.
              </p>
              <a
                href="https://www.youtube.com/@BuildwithDax"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
              >
                Visit Channel →
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;