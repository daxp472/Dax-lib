import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Youtube, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hi, I'm Dax Patel. I'm passionate about teaching programming and helping others start their journey in tech.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="prose lg:prose-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h2>
          <p className="text-gray-600">
            Coming from a digital marketing background, I've always been fascinated by how apps are built. 
            I challenged myself to learn app development and documented my entire journey to help others 
            who are starting from scratch.
          </p>
          <p className="text-gray-600 mt-4">
            Now, I create comprehensive guides and tutorials to help beginners overcome the same challenges 
            I faced. My goal is to make programming education more accessible and practical.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-2 gap-6"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Code className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Coding Guides</h3>
            <p className="text-gray-600">Practical tutorials for beginners</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">E-Books</h3>
            <p className="text-gray-600">In-depth learning resources</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Youtube className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Video Content</h3>
            <p className="text-gray-600">Visual learning experiences</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Community</h3>
            <p className="text-gray-600">Learn together, grow together</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 bg-indigo-50 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">What's Next?</h2>
        <p className="text-gray-600 text-center mb-8">
          I'm working on new content to help more people learn programming. Subscribe to my YouTube channel 
          for upcoming tutorials and guides.
        </p>
        <div className="flex justify-center">
          <a
            href="https://www.youtube.com/@BuildwithDax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <Youtube className="h-5 w-5 mr-2" />
            Subscribe on YouTube
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default About;