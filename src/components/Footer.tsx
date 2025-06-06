import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Youtube, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/daxp472', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/dax-cg/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/dax_CG', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@BuildwithDax', label: 'YouTube' },
    { icon: Mail, href: 'mailto:daxpatel.cg@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">About</h3>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              Sharing my journey and knowledge in app development through comprehensive guides and tutorials.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Subscribe</h3>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              Get notified about new guides and tutorials.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <motion.input
                type="email"
                className="appearance-none min-w-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                whileFocus={{ scale: 1.02 }}
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-gray-400 dark:text-gray-500 text-center flex items-center justify-center">
            © {new Date().getFullYear()} Dax Patel. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mx-1"
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.span>
            for the dev community.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;