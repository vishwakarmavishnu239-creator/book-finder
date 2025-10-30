import React, { useState } from 'react';
import { Search, BookOpen, User, Calendar, Star, Loader2, AlertCircle, X } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      let url = '';
      switch (searchType) {
        case 'title':
          url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery)}&limit=20`;
          break;
        case 'author':
          url = `https://openlibrary.org/search.json?author=${encodeURIComponent(searchQuery)}&limit=20`;
          break;
        case 'subject':
          url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(searchQuery)}&limit=20`;
          break;
        default:
          url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=20`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch books');
      
      const data = await response.json();
      setBooks(data.docs || []);
      
      if (data.docs.length === 0) {
        setError('No books found. Try a different search term.');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection and try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  const getCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return null;
  };

  const BookCard = ({ book }) => (
    <div 
      onClick={() => setSelectedBook(book)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1"
    >
      <div className="flex flex-col h-full">
        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
          {getCoverUrl(book) ? (
            <img 
              src={getCoverUrl(book)} 
              alt={book.title}
              className="h-full w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="text-4xl text-blue-400">📚</div>';
              }}
            />
          ) : (
            <div className="text-5xl text-blue-400">📚</div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {book.title}
          </h3>
          
          {book.author_name && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <User size={14} className="mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{book.author_name.slice(0, 2).join(', ')}</span>
            </div>
          )}
          
          {book.first_publish_year && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar size={14} className="mr-1 flex-shrink-0" />
              <span>{book.first_publish_year}</span>
            </div>
          )}
          
          {book.ratings_average && (
            <div className="flex items-center text-sm text-yellow-600 mt-auto">
              <Star size={14} className="mr-1 fill-current" />
              <span>{book.ratings_average.toFixed(1)} / 5</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const BookDetailModal = ({ book, onClose }) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Book Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-48 flex-shrink-0">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 flex items-center justify-center h-64">
                {getCoverUrl(book) ? (
                  <img 
                    src={getCoverUrl(book)} 
                    alt={book.title}
                    className="h-full w-auto object-contain rounded shadow-lg"
                  />
                ) : (
                  <div className="text-6xl">📚</div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{book.title}</h3>
              
              {book.author_name && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Author(s)</p>
                  <p className="text-gray-700">{book.author_name.join(', ')}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {book.first_publish_year && (
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">First Published</p>
                    <p className="text-gray-700">{book.first_publish_year}</p>
                  </div>
                )}
                
                {book.number_of_pages_median && (
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Pages</p>
                    <p className="text-gray-700">{book.number_of_pages_median}</p>
                  </div>
                )}
                
                {book.language && (
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Languages</p>
                    <p className="text-gray-700">{book.language.slice(0, 3).join(', ').toUpperCase()}</p>
                  </div>
                )}
                
                {book.ratings_average && (
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Rating</p>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-current mr-1" />
                      <span className="text-gray-700">{book.ratings_average.toFixed(2)} / 5</span>
                    </div>
                  </div>
                )}
              </div>
              
              {book.publisher && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Publishers</p>
                  <p className="text-gray-700">{book.publisher.slice(0, 3).join(', ')}</p>
                </div>
              )}
              
              {book.isbn && book.isbn[0] && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-500 mb-1">ISBN</p>
                  <p className="text-gray-700 font-mono text-sm">{book.isbn[0]}</p>
                </div>
              )}
            </div>
          </div>
          
          {book.subject && book.subject.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">Subjects</p>
              <div className="flex flex-wrap gap-2">
                {book.subject.slice(0, 10).map((subject, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {book.key && (
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
            >
              View on Open Library →
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen size={48} className="text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Book Finder
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Discover your next great read from millions of books</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 max-w-3xl mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search By
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'title', label: '📖 Title' },
                { value: 'author', label: '✍️ Author' },
                { value: 'subject', label: '🏷️ Subject' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSearchType(value)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    searchType === value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Search by ${searchType}...`}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            <button
              onClick={searchBooks}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={48} className="animate-spin text-blue-600" />
          </div>
        )}

        {!loading && hasSearched && books.length > 0 && (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-600 text-lg">
                Found <span className="font-bold text-blue-600">{books.length}</span> books
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <BookCard key={book.key || index} book={book} />
              ))}
            </div>
          </>
        )}

        {!loading && !hasSearched && (
          <div className="text-center py-20">
            <BookOpen size={80} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl">Start searching to discover amazing books!</p>
            <p className="text-gray-400 mt-2">Try searching for "Harry Potter", "Stephen King", or "Science Fiction"</p>
          </div>
        )}

        {!loading && hasSearched && books.length === 0 && !error && (
          <div className="text-center py-20">
            <AlertCircle size={80} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl">No books found</p>
            <p className="text-gray-400 mt-2">Try a different search term or search type</p>
          </div>
        )}

        {/* Book Detail Modal */}
        {selectedBook && (
          <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </div>
    </div>
  );
}

export default App;