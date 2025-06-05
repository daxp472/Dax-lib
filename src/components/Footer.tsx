import React from 'react';
import { Github, Linkedin, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
            <p className="mt-4 text-base text-gray-500">
              Sharing my journey and knowledge in app development through comprehensive guides and tutorials.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="https://github.com/daxp472" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/dax-cg/" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://x.com/dax_CG" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@BuildwithDax" className="text-gray-400 hover:text-gray-500">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="mailto:daxpatel.cg@gmail.com" className="text-gray-400 hover:text-gray-500">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Subscribe</h3>
            <p className="mt-4 text-base text-gray-500">
              Get notified about new guides and tutorials.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <input
                type="email"
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Dax Patel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;