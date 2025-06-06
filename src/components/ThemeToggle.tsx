import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'neon':
        return <Zap className="h-5 w-5" />;
      default:
        return <Moon className="h-5 w-5" />;
    }
  };

  const getColor = () => {
    switch (theme) {
      case 'light':
        return 'text-yellow-500';
      case 'dark':
        return 'text-blue-400';
      case 'neon':
        return 'text-pink-500';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${getColor()} hover:bg-opacity-20 hover:bg-current`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: theme === 'neon' ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;