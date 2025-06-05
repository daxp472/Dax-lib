import React from 'react';
import { Smartphone, Code, Calendar } from 'lucide-react';

const EbookCover: React.FC = () => {
  return (
    <div className="h-full bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white flex flex-col justify-between p-12">
      <div className="text-center mb-8">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Smartphone size={80} className="text-indigo-300" />
            <Code size={40} className="absolute -right-4 -bottom-4 text-purple-300" />
          </div>
        </div>
        <p className="uppercase tracking-widest text-indigo-300 mb-2">Dax Patel</p>
      </div>
      
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          How I Built a Full App in 60 Days
        </h1>
        <h2 className="text-xl md:text-2xl text-indigo-200 italic">
          A Realistic Beginner's Journey using React Native & Expo
        </h2>
      </div>
      
      <div className="flex items-center justify-center space-x-2 text-indigo-300">
        <Calendar size={20} />
        <p className="text-sm">2025 Edition</p>
      </div>
    </div>
  );
};

export default EbookCover;