import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Share2 } from 'lucide-react';

const books = [
  {
    id: 'app-in-60-days',
    title: 'How I Built a Full App in 60 Days',
    subtitle: 'A Realistic Beginner\'s Journey using React Native & Expo',
    description: 'Learn how I went from basic JavaScript knowledge to building a complete mobile app in just 60 days. This comprehensive guide covers everything from setup to deployment.',
    image: 'https://cdn.leonardo.ai/users/24666a3d-a6a6-45b6-9e3b-0cb07ef20336/generations/69ffecfa-1ba4-4d51-9497-986ad6f3ab00/Leonardo_Phoenix_10_Futuristic_mobile_app_development_themed_t_1.jpg',
    category: 'App Development'
  }
  // More books can be added here
];

const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to My Digital Library
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover comprehensive guides and tutorials about app development, coding, and technology.
        </p>
      </motion.div>

      {/* Books Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {books.map((book) => (
          <motion.div
            key={book.id}
            variants={item}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-w-3 aspect-h-2">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-indigo-600 font-semibold mb-2">{book.category}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/read/${book.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Book className="h-4 w-4 mr-2" />
                  Read Now
                </Link>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href + `read/${book.id}`);
                    alert('Link copied to clipboard!');
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 bg-indigo-50 rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to get notified about new guides and tutorials.
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Subscribe
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;