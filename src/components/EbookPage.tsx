import React from 'react';

interface EbookPageProps {
  content: {
    title: string;
    sections: {
      heading?: string;
      paragraphs?: string[];
      list?: string[];
      image?: string;
    }[];
  };
  pageNumber: number;
}

const EbookPage: React.FC<EbookPageProps> = ({ content, pageNumber }) => {
  return (
    <div className="h-full p-8 md:p-12 overflow-y-auto flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 pb-2 border-b-2 border-indigo-200">
        {content.title}
      </h1>
      
      <div className="flex-grow">
        {content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            {section.heading && (
              <h2 className="text-xl font-semibold mb-3 text-indigo-800">
                {section.heading}
              </h2>
            )}
            
            {section.paragraphs?.map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            {section.list && (
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {section.list.map((item, lIndex) => (
                  <li key={lIndex} className="text-gray-700">{item}</li>
                ))}
              </ul>
            )}
            
            {section.image && (
              <div className="my-4 flex justify-center">
                <img 
                  src={section.image} 
                  alt="Section illustration" 
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-400 text-right mt-4">
        Page {pageNumber}
      </div>
    </div>
  );
};

export default EbookPage;