export const pages = [
  // Cover page (handled separately in EbookCover component)
  {
    title: "Cover",
    sections: []
  },
  
  // Index page
  {
    title: "Index",
    sections: [
      {
        paragraphs: [
          "This guide documents my personal journey of building a complete mobile application in just 60 days as a beginner. I've shared my experiences, challenges, and victories to help others on their development journey."
        ]
      },
      {
        heading: "Table of Contents",
        list: [
          "Introduction",
          "What You'll Learn",
          "Tools & Platforms Used",
          "Why App Development?",
          "Day-wise Journey",
          "Challenges Faced",
          "My Favorite AI Tools",
          "Final Project: GameZone App",
          "Screenshots & Highlights",
          "Tips to Stay Consistent",
          "Resources + Links",
          "Final Thoughts"
        ]
      },
      {
        paragraphs: [
          "You can navigate through this ebook using the navigation buttons at the bottom of the page. Each section contains valuable insights from my journey that I hope will inspire and guide you on your own path to becoming an app developer."
        ]
      }
    ]
  },
  
  // Introduction
  {
    title: "Introduction",
    sections: [
      {
        paragraphs: [
          "When I started this journey 60 days ago, I had basic JavaScript knowledge but no experience with mobile development. I decided to challenge myself to build a complete, working app within two months and document the entire process.",
          "My background is in digital marketing, but I've always been fascinated by how apps are built. I wanted to create something tangible that I could show to friends, family, and potential employers.",
          "This ebook isn't a typical programming tutorial—it's a realistic account of what it's like to learn app development from scratch, including all the frustrations, roadblocks, and moments of clarity along the way.",
          "I chose to build 'GameZone', a mobile app for tracking video game collections and connecting with other gamers. This project was perfect because it was something I was genuinely interested in, which helped me stay motivated throughout the learning process."
        ]
      },
      {
        heading: "Why I Wrote This Guide",
        paragraphs: [
          "Most programming resources don't show the messy reality of learning to code. They present a polished path that doesn't match the actual experience of a beginner.",
          "I wanted to create the resource I wish I had when I started—a candid look at the entire development process, including the struggles and how to overcome them.",
          "By sharing my journey, I hope to provide not just technical knowledge but emotional support and practical strategies for pushing through difficulties and completing your first significant project."
        ]
      }
    ]
  },
  
  // What You'll Learn
  {
    title: "What You'll Learn",
    sections: [
      {
        paragraphs: [
          "This ebook goes beyond just teaching you how to code. It provides a comprehensive look at the entire app development process from conceptualization to deployment."
        ]
      },
      {
        heading: "Technical Skills",
        list: [
          "React Native fundamentals and component-based architecture",
          "Using Expo for rapid development and testing",
          "State management with React's Context API",
          "Integrating with Firebase for authentication and data storage",
          "Implementing navigation and multiple screens",
          "Working with device features like camera and local storage",
          "Handling forms and user input validation"
        ]
      },
      {
        heading: "Soft Skills & Strategies",
        list: [
          "Planning and breaking down a large project into manageable tasks",
          "Problem-solving approaches when you get stuck",
          "Effectively using documentation and online resources",
          "Leveraging AI tools to accelerate learning and troubleshooting",
          "Building good development habits and workflows",
          "Staying motivated during challenging phases",
          "Knowing when to pivot vs. when to persevere on a difficult feature"
        ]
      },
      {
        paragraphs: [
          "By the end of this guide, you'll have a realistic understanding of what it takes to build your first app, along with practical strategies to make your journey smoother than mine was."
        ]
      }
    ]
  },
  
  // Tools & Platforms Used
  {
    title: "Tools & Platforms Used",
    sections: [
      {
        paragraphs: [
          "Choosing the right tools can make a huge difference in your development experience. Here are the key technologies and platforms I used throughout my 60-day journey."
        ]
      },
      {
        heading: "Core Technologies",
        list: [
          "React Native: The framework that allowed me to build a cross-platform mobile app using my existing JavaScript knowledge",
          "Expo: An incredible platform that simplified development, testing, and deployment (a lifesaver for beginners!)",
          "Firebase: For authentication, database, and cloud storage needs",
          "VS Code: My code editor with extensions for React Native, ESLint, and Prettier",
          "GitHub: For version control and backing up my code",
          "Figma: For designing app screens before coding them"
        ]
      },
      {
        heading: "AI Assistants",
        list: [
          "ChatGPT: Primarily used for debugging and learning new concepts",
          "Claude: Helped me summarize documentation and generate ideas",
          "Gemini: Used for identifying alternative approaches and tools"
        ]
      },
      {
        heading: "Other Essential Tools",
        list: [
          "React Navigation: For handling screen navigation and tabs",
          "Formik & Yup: For form management and validation",
          "Async Storage: For local data persistence",
          "Expo Image Picker: For camera and image gallery integration",
          "React Native Paper: For UI components",
          "Notion: For tracking progress and managing tasks"
        ]
      },
      {
        paragraphs: [
          "I recommend all these tools for beginners, especially Expo which removes much of the complexity involved in mobile development."
        ]
      }
    ]
  },
  
  // Why App Development?
  {
    title: "Why App Development?",
    sections: [
      {
        paragraphs: [
          "Before diving into the technical journey, I want to share why I chose app development specifically and why it might be right for you too."
        ]
      },
      {
        heading: "Personal Reasons",
        paragraphs: [
          "I've always been fascinated by the apps on my phone—how they work, how they're built, and the impact they have on daily life. There's something magical about creating software that people can carry in their pockets.",
          "I wanted a skill that combines creativity and logic. App development requires both design thinking and technical problem-solving, which keeps the work engaging and varied.",
          "The tangibility of app development was also appealing. Unlike some programming disciplines, you can easily show your work to friends and family, which provides immediate satisfaction and feedback."
        ]
      },
      {
        heading: "Professional Advantages",
        list: [
          "High demand for mobile developers in the job market",
          "Ability to create your own products without depending on others",
          "Transferable skills that apply to web and other platform development",
          "Potential for passive income through app stores",
          "Remote work opportunities"
        ]
      },
      {
        heading: "Why React Native Specifically",
        paragraphs: [
          "I chose React Native because it allowed me to build for both iOS and Android with a single codebase. This was important as I didn't want to limit my potential audience.",
          "The React ecosystem has extensive resources, libraries, and community support, making it easier to find solutions when stuck.",
          "My prior experience with JavaScript made React Native a logical choice compared to platform-specific languages like Swift or Kotlin."
        ]
      }
    ]
  },
  
  // Day-wise Journey - Phase 1
  {
    title: "Day-wise Journey - Phase 1: Basics",
    sections: [
      {
        heading: "Days 1-5: Setting Up & Learning Fundamentals",
        paragraphs: [
          "The first few days were focused on getting my development environment ready and learning the absolute basics of React Native."
        ],
        list: [
          "Day 1: Installed Node.js, VS Code, and Expo CLI. Created my first 'Hello World' app.",
          "Day 2-3: Learned about React components, JSX syntax, and the component lifecycle.",
          "Day 4: Explored styling in React Native and how it differs from CSS.",
          "Day 5: Built a simple counter app to understand state management."
        ]
      },
      {
        heading: "Days 6-10: UI Components & Navigation",
        paragraphs: [
          "After getting comfortable with the basics, I moved on to learning about the core building blocks of mobile apps."
        ],
        list: [
          "Day 6-7: Studied core components like View, Text, Image, ScrollView, and FlatList.",
          "Day 8: Installed and configured React Navigation.",
          "Day 9: Created a multi-screen app with stack navigation.",
          "Day 10: Implemented tab navigation and a drawer menu."
        ]
      },
      {
        heading: "Days 11-15: Forms & User Input",
        paragraphs: [
          "This week was all about handling user input—a critical aspect of interactive apps."
        ],
        list: [
          "Day 11-12: Learned about TextInput, Switch, and other input components.",
          "Day 13: Implemented form validation with Formik and Yup.",
          "Day 14: Created a user registration form for my app.",
          "Day 15: Added form error handling and visual feedback."
        ]
      },
      {
        paragraphs: [
          "Phase 1 was challenging mainly because everything was new. I spent a lot of time on documentation and simple examples before attempting to implement features in my own app."
        ]
      }
    ]
  },
  
  // Day-wise Journey - Phase 2
  {
    title: "Day-wise Journey - Phase 2: Mid Progress",
    sections: [
      {
        heading: "Days 16-25: Firebase Integration",
        paragraphs: [
          "This phase focused on connecting my app to backend services for data persistence and user authentication."
        ],
        list: [
          "Day 16-17: Set up Firebase project and installed necessary packages.",
          "Day 18-19: Implemented user authentication (sign up, login, logout).",
          "Day 20-21: Created Firestore database structure for game data.",
          "Day 22-23: Added CRUD operations for game collection.",
          "Day 24-25: Implemented real-time updates using Firebase listeners."
        ]
      },
      {
        heading: "Days 26-30: Core App Features",
        paragraphs: [
          "With the foundation in place, I started building the main features of GameZone."
        ],
        list: [
          "Day 26-27: Created the game collection screen with search and filtering.",
          "Day 28: Implemented the game details screen.",
          "Day 29: Added the ability to mark games as 'Playing', 'Completed', or 'Wishlist'.",
          "Day 30: Built a basic profile screen showing user stats."
        ]
      },
      {
        heading: "Challenges During Phase 2",
        paragraphs: [
          "This phase was particularly challenging because I was integrating multiple technologies. Firebase authentication gave me the most trouble, especially handling authentication state across the app.",
          "I spent almost three days debugging an issue with real-time updates before discovering I had a simple syntax error in my query. This was frustrating but taught me the importance of careful code review and testing."
        ]
      }
    ]
  },
  
  // Day-wise Journey - Phase 3
  {
    title: "Day-wise Journey - Phase 3: Building App",
    sections: [
      {
        heading: "Days 31-40: Advanced Features",
        paragraphs: [
          "In this phase, I moved beyond the basics to implement more complex functionality."
        ],
        list: [
          "Day 31-32: Integrated camera functionality for profile pictures.",
          "Day 33-34: Implemented image caching for faster loading.",
          "Day 35-36: Added offline support using AsyncStorage for local data.",
          "Day 37-38: Created a friend system for connecting users.",
          "Day 39-40: Implemented push notifications for friend requests and game recommendations."
        ]
      },
      {
        heading: "Days 41-45: Social Features",
        paragraphs: [
          "The social aspects of GameZone were crucial for creating an engaging experience."
        ],
        list: [
          "Day 41-42: Built a global game feed showing recent additions.",
          "Day 43: Added the ability to like and comment on games.",
          "Day 44: Implemented user-to-user messaging.",
          "Day 45: Created game recommendation functionality."
        ]
      },
      {
        heading: "Emotional Journey",
        paragraphs: [
          "This phase was characterized by a mix of confidence and impostor syndrome. I was proud of how far I'd come but also constantly ran into features that seemed beyond my ability.",
          "The messaging system was particularly challenging, and I almost gave up on it. After taking a day off to clear my head, I came back with a fresh perspective and broke the problem down into smaller pieces, which made it much more manageable."
        ]
      }
    ]
  },
  
  // Day-wise Journey - Phase 4
  {
    title: "Day-wise Journey - Phase 4: Optimization & Deployment",
    sections: [
      {
        heading: "Days 46-50: Performance Optimization",
        paragraphs: [
          "As the app grew more complex, I needed to focus on keeping it fast and responsive."
        ],
        list: [
          "Day 46-47: Profiled app performance and identified bottlenecks.",
          "Day 48: Optimized list rendering with memoization and better FlatList usage.",
          "Day 49: Reduced unnecessary re-renders with React.memo and useCallback.",
          "Day 50: Implemented lazy loading for images and content."
        ]
      },
      {
        heading: "Days 51-55: Testing & Bug Fixing",
        paragraphs: [
          "No app is complete without thorough testing and debugging."
        ],
        list: [
          "Day 51-52: Manual testing on different devices and screen sizes.",
          "Day 53: Fixed UI inconsistencies between iOS and Android.",
          "Day 54: Addressed memory leaks and performance issues.",
          "Day 55: Fixed authentication edge cases and error handling."
        ]
      },
      {
        heading: "Days 56-60: Polishing & Deployment",
        paragraphs: [
          "The final stretch focused on making the app production-ready."
        ],
        list: [
          "Day 56: Added loading states and error messages for better UX.",
          "Day 57: Improved app accessibility features.",
          "Day 58: Created app icons and splash screen.",
          "Day 59: Built the production version and tested on physical devices.",
          "Day 60: Published to Expo's testing platform and shared with friends."
        ]
      },
      {
        paragraphs: [
          "The feeling of accomplishment on day 60 was incredible. Seeing friends actually using my app and giving positive feedback made all the struggles worthwhile."
        ]
      }
    ]
  },
  
  // Challenges Faced
  {
    title: "Challenges Faced",
    sections: [
      {
        paragraphs: [
          "Building an app as a beginner was far from smooth sailing. Here are some of the major challenges I encountered and how I overcame them."
        ]
      },
      {
        heading: "Technical Challenges",
        list: [
          "Navigation state persistence: I struggled with maintaining navigation state after app restarts until I learned about React Navigation's state persistence.",
          "Firebase security rules: Creating proper security rules was confusing at first. I had to iteratively test and refine them.",
          "Image handling: Optimizing images for performance while maintaining quality was tricky.",
          "State management complexity: As the app grew, managing state became increasingly difficult until I reorganized using Context API.",
          "Async operations: Handling promises and async/await patterns properly took time to master."
        ]
      },
      {
        heading: "Personal Struggles",
        paragraphs: [
          "Around day 30, I hit a major motivation slump. The initial excitement had worn off, and I was facing increasingly complex problems. I took a two-day break and then set smaller, more achievable daily goals to regain momentum.",
          "Impostor syndrome was a constant companion. Every time I looked at polished apps in the store, I felt my work was inadequate. Joining some React Native communities and sharing my progress helped me realize that everyone starts somewhere.",
          "Time management was difficult while balancing other responsibilities. I eventually settled on a consistent schedule of 2-3 hours each evening and longer sessions on weekends."
        ]
      },
      {
        heading: "How I Pushed Through",
        list: [
          "Breaking problems into smaller parts that I could tackle one at a time",
          "Taking walks when stuck to clear my head",
          "Explaining problems out loud (rubber duck debugging)",
          "Setting a time limit for struggling before seeking help",
          "Celebrating small victories to maintain motivation",
          "Keeping a developer journal to track progress and solutions"
        ]
      }
    ]
  },
  
  // My Favorite AI Tools
  {
    title: "My Favorite AI Tools",
    sections: [
      {
        paragraphs: [
          "AI tools were game-changers in my development journey, helping me learn faster and solve problems more efficiently. Here's how I leveraged different AI assistants throughout the process."
        ]
      },
      {
        heading: "ChatGPT: My Primary Coding Assistant",
        paragraphs: [
          "ChatGPT was my go-to tool for coding assistance. I used it for:"
        ],
        list: [
          "Debugging error messages and explaining why they occurred",
          "Learning new concepts with simple, concrete examples",
          "Generating boilerplate code for repetitive patterns",
          "Reviewing my code for potential improvements and best practices",
          "Explaining complex documentation in simpler terms"
        ]
      },
      {
        heading: "Claude: Documentation & Conceptual Understanding",
        paragraphs: [
          "I found Claude particularly helpful for broader conceptual understanding:"
        ],
        list: [
          "Summarizing lengthy documentation into actionable points",
          "Explaining architectural patterns and when to use them",
          "Helping plan the structure of complex features",
          "Generating clear explanations of how different technologies interact",
          "Brainstorming creative solutions to design challenges"
        ]
      },
      {
        heading: "Gemini: Alternative Approaches & Tool Discovery",
        paragraphs: [
          "Gemini excelled at helping me discover alternatives:"
        ],
        list: [
          "Finding lesser-known libraries that solved my specific problems",
          "Suggesting alternative approaches when I was stuck",
          "Comparing different methods to implement a feature",
          "Identifying potential performance optimizations",
          "Providing real-world examples of similar implementations"
        ]
      },
      {
        heading: "Effective AI Prompting Strategies",
        paragraphs: [
          "I learned that how you ask questions greatly impacts the quality of AI assistance. My most effective strategies were:",
          "Being specific about my context and what I've already tried",
          "Asking for explanations, not just solutions",
          "Breaking complex problems into smaller, focused questions",
          "Following up on answers to dig deeper into concepts",
          "Asking the AI to simulate a senior developer reviewing my approach"
        ]
      }
    ]
  },
  
  // Final Project: GameZone App
  {
    title: "Final Project: GameZone App",
    sections: [
      {
        paragraphs: [
          "After 60 days of development, here's an overview of the final GameZone app and its key features."
        ]
      },
      {
        heading: "Core Functionality",
        list: [
          "User authentication system with email/password and Google sign-in",
          "Personal game collection management (add, edit, delete games)",
          "Game categorization (Playing, Completed, Wishlist, Backlog)",
          "Game details page with metadata, notes, and play history",
          "Search and filter functionality for game collections",
          "Friend system for connecting with other gamers",
          "Activity feed showing friends' recent game additions and status updates",
          "Game recommendation system based on collection and preferences",
          "User profiles with statistics and gaming preferences",
          "Offline support for viewing and editing collections"
        ]
      },
      {
        heading: "Technical Architecture",
        paragraphs: [
          "The app follows a modular architecture with these key components:"
        ],
        list: [
          "Authentication context for managing user state across the app",
          "Firebase Firestore for data storage with optimized query patterns",
          "Custom hooks for common operations like CRUD actions and form handling",
          "Context API for state management across components",
          "Navigation system with stack, tab, and drawer navigators",
          "Reusable UI components like game cards, user avatars, and custom buttons",
          "Optimized list rendering for smooth scrolling of large collections"
        ]
      },
      {
        heading: "Visual Design",
        paragraphs: [
          "I went with a dark theme featuring accent colors that evoke a gaming atmosphere. The UI emphasizes game cover art with a card-based design that's both visually appealing and functional.",
          "I focused on creating a consistent design language throughout the app, with attention to spacing, typography, and interactive elements. The result is a polished look that feels professional despite being my first app."
        ]
      }
    ]
  },
  
  // Screenshots & Highlights
  {
    title: "Screenshots & Highlights",
    sections: [
      {
        paragraphs: [
          "While I can't include actual screenshots in this ebook format, I'll describe the key screens and their notable features."
        ]
      },
      {
        heading: "Home Screen",
        paragraphs: [
          "The home screen features a personalized dashboard with:",
          "- Currently playing games carousel at the top",
          "- Activity feed from friends in the middle section",
          "- Quick stats panel showing total games, completion rate, etc.",
          "- Recommendations section at the bottom",
          "The design uses a dark background with game covers providing vibrant color accents."
        ]
      },
      {
        heading: "Collection Screen",
        paragraphs: [
          "The collection screen organizes games with:",
          "- Tab navigation between Playing/Completed/Wishlist/All categories",
          "- Grid view of game covers with subtle information overlay",
          "- Search bar with filter options (platform, genre, year)",
          "- Smooth animations when transitioning between views",
          "- Pull-to-refresh for updating the collection"
        ]
      },
      {
        heading: "Game Details Screen",
        paragraphs: [
          "Each game has a detailed view featuring:",
          "- Full-width game banner at the top",
          "- Metadata section with platform, genre, release date",
          "- Play status with date tracking",
          "- Personal rating and notes section",
          "- Friends who also have this game",
          "- Action buttons for updating status or sharing"
        ]
      },
      {
        heading: "Profile Screen",
        paragraphs: [
          "The user profile includes:",
          "- Customizable avatar and banner",
          "- Gaming stats visualized in charts",
          "- Favorite games showcase",
          "- Recent activity timeline",
          "- Friends list with online status indicators",
          "- Settings access for app customization"
        ]
      }
    ]
  },
  
  // Tips to Stay Consistent
  {
    title: "Tips to Stay Consistent",
    sections: [
      {
        paragraphs: [
          "Consistency was the single most important factor in completing this project. Here are the strategies that helped me maintain momentum throughout the 60 days."
        ]
      },
      {
        heading: "Create a Sustainable Schedule",
        paragraphs: [
          "I found that consistency beats intensity. Instead of marathon coding sessions followed by days of inactivity, I aimed for 2-3 hours daily with longer sessions on weekends.",
          "I identified my most productive time (early mornings) and protected that time for the most challenging tasks.",
          "I treated my coding sessions like appointments that couldn't be canceled, which helped me prioritize them over less important activities."
        ]
      },
      {
        heading: "Set Meaningful Milestones",
        list: [
          "Break the project into weekly milestones that deliver visible progress",
          "Create daily tasks that are specific and achievable in a single session",
          "Focus on completing features rather than working for a set time",
          "Track progress visually to maintain motivation",
          "Celebrate completing difficult features to reinforce positive feelings"
        ]
      },
      {
        heading: "Overcome Plateaus and Frustration",
        paragraphs: [
          "Every developer faces periods of frustration. These strategies helped me push through:"
        ],
        list: [
          "Set a time limit for struggling with a problem before seeking help",
          "Keep a 'wins journal' to review when feeling discouraged",
          "Take strategic breaks when hitting walls—often solutions come during walks or showers",
          "Switch to easier tasks when stuck to maintain momentum",
          "Remember the 'why' behind the project when motivation dips"
        ]
      },
      {
        heading: "Build a Support System",
        paragraphs: [
          "Development doesn't have to be solitary. I found these social strategies invaluable:",
          "Join Discord communities for React Native beginners",
          "Share weekly progress with friends or on social media",
          "Find an accountability partner with similar goals",
          "Explain concepts you're learning to others (teaching reinforces learning)",
          "Get regular feedback from potential users to stay motivated"
        ]
      }
    ]
  },
  
  // Resources + Links
  {
    title: "Resources + Links",
    sections: [
      {
        paragraphs: [
          "These resources were instrumental in my learning journey. I've organized them by category for easy reference."
        ]
      },
      {
        heading: "Official Documentation",
        list: [
          "React Native Docs: https://reactnative.dev/docs/getting-started",
          "Expo Documentation: https://docs.expo.dev",
          "Firebase Documentation: https://firebase.google.com/docs",
          "React Navigation Docs: https://reactnavigation.org/docs/getting-started"
        ]
      },
      {
        heading: "Courses & Tutorials",
        list: [
          "React Native - The Practical Guide (Udemy)",
          "CS50's Mobile App Development with React Native (Harvard)",
          "The Complete React Native + Hooks Course (Udemy)",
          "YouTube: Programming with Mosh - React Native Tutorial",
          "YouTube: Net Ninja - React Native Firebase Series"
        ]
      },
      {
        heading: "Helpful GitHub Repositories",
        list: [
          "Awesome React Native: https://github.com/jondot/awesome-react-native",
          "React Native Elements: https://github.com/react-native-elements/react-native-elements",
          "React Native Paper: https://github.com/callstack/react-native-paper",
          "React Native Firebase: https://github.com/invertase/react-native-firebase"
        ]
      },
      {
        heading: "Communities & Forums",
        list: [
          "React Native Discord: https://discord.gg/reactiflux",
          "Reddit: r/reactnative",
          "Stack Overflow: React Native tag",
          "Expo Forums: https://forums.expo.dev"
        ]
      },
      {
        heading: "Tools & Services",
        list: [
          "Figma (for UI design): https://www.figma.com",
          "Firebase Console: https://console.firebase.google.com",
          "Expo Snack (for quick prototyping): https://snack.expo.dev",
          "VS Code Extensions: React Native Tools, ESLint, Prettier"
        ]
      }
    ]
  },
  
  // Final Thoughts
  {
    title: "Final Thoughts",
    sections: [
      {
        paragraphs: [
          "As I look back on this 60-day journey, I'm amazed at how much I've learned and grown as a developer. What started as a personal challenge became a transformative experience that has opened new doors in my career and creative life."
        ]
      },
      {
        heading: "What I Would Do Differently",
        list: [
          "Start with more planning and wireframing before coding",
          "Learn state management patterns earlier in the process",
          "Get user feedback sooner rather than waiting for a 'perfect' version",
          "Focus more on testing throughout development instead of at the end",
          "Break large features into smaller, more manageable components from the start"
        ]
      },
      {
        heading: "Most Valuable Lessons",
        paragraphs: [
          "Technical skills are important, but persistence and problem-solving mindset matter more. The ability to break down problems, research solutions, and adapt to challenges is what ultimately determines success.",
          "The developer community is incredibly supportive. Don't hesitate to ask for help when you're stuck—most developers remember being beginners and are happy to assist.",
          "Building something real is the fastest way to learn. No amount of tutorials can replace the experience of working through an actual project with real challenges and constraints."
        ]
      },
      {
        heading: "What's Next",
        paragraphs: [
          "This is just the beginning of my development journey. I plan to:",
          "- Polish GameZone and publish it to app stores",
          "- Add more advanced features like game API integration",
          "- Start work on my next app with the knowledge I've gained",
          "- Contribute to open source React Native projects",
          "- Perhaps create tutorials to help other beginners"
        ]
      },
      {
        heading: "Connect With Me",
        paragraphs: [
          "I'd love to hear about your development journey or answer questions about mine. You can find me at:",
          "- Portfolio: dax-patel.netlify.app",
          "- LinkedIn: https://www.linkedin.com/in/dax-cg/",
          "- Twitter: https://x.com/dax_CG",
          "- GitHub: https://github.com/daxp472",
          "- YouTube: https://www.youtube.com/@BuildwithDax",
          "- Email: daxpatel.cg@gmail.com",
          "",
          "I'm starting an 'App Development for Beginners' series on my YouTube channel soon. If you're interested, please subscribe to join me on this next adventure!",
          "",
          "Remember, everyone starts somewhere. The most important step is simply to begin and then keep going, one day at a time. You can do this!"
        ]
      }
    ]
  }
];