import React from 'react';
import { useParams } from 'react-router-dom';
import EbookCover from '../components/EbookCover';
import EbookNavigation from '../components/EbookNavigation';
import EbookPage from '../components/EbookPage';
import { pages } from '../data/ebookPages';
import { BookOpen, Printer, Share2 } from 'lucide-react';

const BookReader = () => {
  const { bookId } = useParams();
  const [currentPage, setCurrentPage] = React.useState(0);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with title and actions */}
      <header className="w-full bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between print:hidden">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-900">How I Built a Full App in 60 Days</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleShare}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Printer className="h-5 w-5 mr-2" />
            Print PDF
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden my-4 aspect-[3/4] print:shadow-none print:aspect-auto">
          {currentPage === 0 ? (
            <EbookCover />
          ) : (
            <EbookPage content={pages[currentPage]} pageNumber={currentPage} />
          )}
        </div>
      </div>

      {/* Navigation controls */}
      <EbookNavigation
        currentPage={currentPage}
        totalPages={pages.length}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default BookReader;