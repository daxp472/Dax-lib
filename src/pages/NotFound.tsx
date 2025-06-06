import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen, RefreshCw, Search, AlertTriangle, Coffee, Code, HelpCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [floatingElements, setFloatingElements] = useState([]);
  
  // Add floating elements on page load
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
        rotate: Math.random() * 360,
      });
    }
    setFloatingElements(elements);
  }, []);

  // Handle 404 number click for easter egg
  const handle404Click = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 4) {
      setShowEasterEgg(true);
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would search the site
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 },
  };

  const floatingVariants = {
    animate: (custom) => ({
      x: [`${custom.x}%`, `${custom.x + (Math.random() * 10 - 5)}%`],
      y: [`${custom.y}%`, `${custom.y + (Math.random() * 10 - 5)}%`],
      rotate: [custom.rotate, custom.rotate + 360],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: custom.delay,
      },
    }),
  };

  const errorCodeVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 overflow-hidden relative">
        {/* Floating background elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            custom={element}
            variants={floatingVariants}
            animate="animate"
          />
        ))}

        <div className="max-w-4xl mx-auto text-center px-4 py-16 z-10 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* 404 Error Code */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center"
            >
              <motion.div
                className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
                variants={errorCodeVariants}
                whileHover="hover"
                onClick={handle404Click}
              >
                404
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                Page Not Found
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Oops! It seems like you've ventured into uncharted territory. The page you're looking for has either been moved, deleted, or never existed in the first place.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="max-w-md mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for content..."
                  className="w-full px-5 py-3 rounded-full border-2 border-indigo-200 dark:border-indigo-900/50 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 pr-12 transition-all duration-300 shadow-md focus:shadow-lg"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 dark:text-indigo-400 p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors duration-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 flex items-center justify-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/">
                <motion.button
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </motion.button>
              </Link>

              <Link to="/read/app-in-60-days">
                <motion.button
                  className="flex items-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Reading
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  className="flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Get Help
                </motion.button>
              </Link>
            </motion.div>

            {/* Error Details Accordion */}
            <motion.div variants={itemVariants} className="mt-8">
              <details className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md overflow-hidden transition-all duration-300 group">
                <summary className="px-6 py-4 cursor-pointer flex items-center justify-between text-indigo-700 dark:text-indigo-400 font-medium">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Technical Details
                  </div>
                  <div className="transform group-open:rotate-180 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </summary>
                <div className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                  <p className="mb-2"><span className="font-semibold">Error Code:</span> 404 Not Found</p>
                  <p className="mb-2"><span className="font-semibold">Description:</span> The requested resource could not be found on this server.</p>
                  <p className="mb-2"><span className="font-semibold">Possible Causes:</span></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>The URL might be misspelled or incorrect</li>
                    <li>The page might have been moved or deleted</li>
                    <li>You might not have permission to access this resource</li>
                    <li>The resource might be temporarily unavailable</li>
                  </ul>
                </div>
              </details>
            </motion.div>

            {/* Easter Egg */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-8 p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 dark:from-pink-500/10 dark:to-purple-500/10 rounded-xl shadow-lg"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Coffee className="h-8 w-8 text-pink-600 dark:text-pink-400 mr-3" />
                    <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400">You Found an Easter Egg!</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Congratulations! You've discovered a hidden feature by clicking the 404 text multiple times. 
                    In a real app, this could unlock a mini-game, special theme, or hidden content.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <motion.button
                      onClick={() => setShowEasterEgg(false)}
                      className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Quote */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 text-gray-600 dark:text-gray-400 italic"
            >
              "Not all those who wander are lost, but you definitely are right now."
            </motion.div>

            {/* Developer Note */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-500 mt-8"
            >
              <Code className="h-4 w-4 mr-2" />
              <span>Built with ❤️ by Dax's Library</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;