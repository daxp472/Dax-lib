import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EbookNavigationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const EbookNavigation: React.FC<EbookNavigationProps> = ({ 
  currentPage, 
  totalPages,
  onNextPage,
  onPrevPage
}) => {
  return (
    <div className="w-full bg-white border-t border-gray-200 py-4 px-6 flex items-center justify-between print:hidden">
      <button 
        onClick={onPrevPage}
        disabled={currentPage === 0}
        className={`flex items-center ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-800'}`}
      >
        <ChevronLeft className="mr-1" size={20} />
        Previous
      </button>
      
      <div className="text-sm text-gray-500">
        Page {currentPage + 1} of {totalPages}
      </div>
      
      <button 
        onClick={onNextPage}
        disabled={currentPage === totalPages - 1}
        className={`flex items-center ${currentPage === totalPages - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-800'}`}
      >
        Next
        <ChevronRight className="ml-1" size={20} />
      </button>
    </div>
  );
};

export default EbookNavigation;