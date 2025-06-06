import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Youtube, Users, Rocket, Heart, Zap, Target } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/PageTransition';

const About = () => {
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const timelineEvents = [
    {
      year: '2023',
      title: 'Started Learning to Code',
      description: 'Began my journey with JavaScript and web development fundamentals.',
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2024',
      title: 'First Mobile App',
      description: 'Built GameZone app in 60 days using React Native and Expo.',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2024',
      title: 'Started Teaching',
      description: 'Launched YouTube channel and began creating educational content.',
      icon: Youtube,
      color: 'from-red-500 to-orange-500'
    },
    {
      year: '2025',
      title: 'Digital Library',
      description: 'Created this platform to share comprehensive guides and tutorials.',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const skills = [
    { name: 'React Native', level: 85, color: 'bg-blue-500' },
    { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
    { name: 'React', level: 88, color: 'bg-cyan-500' },
    { name: 'Node.js', level: 75, color: 'bg-green-500' },
    { name: 'Firebase', level: 80, color: 'bg-orange-500' },
    { name: 'UI/UX Design', level: 70, color: 'bg-purple-500' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'Everything I create comes from genuine passion for helping others learn.'
    },
    {
      icon: Target,
      title: 'Practical Focus',
      description: 'I focus on real-world applications and practical skills that matter.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive community where everyone can grow together.'
    },
    {
      icon: Zap,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and sharing discoveries.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Dax Patel
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  A passionate developer and educator who believes in learning by doing. 
                  I create comprehensive guides and tutorials to help others start their 
                  journey in tech, sharing real experiences and practical insights.
                </motion.p>
                
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.a
                    href="https://www.youtube.com/@BuildwithDax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Youtube className="h-5 w-5 mr-2" />
                    Subscribe on YouTube
                  </motion.a>
                  
                  <motion.a
                    href="https://dax-patel.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full hover:bg-indigo-600 hover:text-white transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Portfolio
                  </motion.a>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-80 h-80 mx-auto">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <motion.div
                      className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      DP
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Drives Me
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The principles and values that guide my work and content creation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-purple-900/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                From beginner to educator - here's how it all started
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
              
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r ${event.color} rounded-full flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <event.icon className="h-8 w-8 text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Technical Skills
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Technologies I work with and teach
              </p>
            </motion.div>

            <div className="space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className={`h-3 rounded-full ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Join me on this exciting journey of building amazing apps and learning new technologies
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="https://www.youtube.com/@BuildwithDax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Youtube className="h-5 w-5 mr-2" />
                  Subscribe Now
                </motion.a>
                
                <motion.a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;