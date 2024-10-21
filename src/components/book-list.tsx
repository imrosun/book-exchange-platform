"use client";
import { useEffect, useState } from 'react';

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  location: string;
  cover: string; // URL or base64 encoded image string
  email: string; // The email of the user who added the book
  createdAt?: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusedBook, setFocusedBook] = useState(3);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books/getBooks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;


  const recentBooks = books
    .sort((a, b) => (new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()))
    .slice(0, 5);

  return (
    <div className="h-[50vh] flex items-center justify-center perspective-1000">
      {recentBooks.map((book, index) => (
        <div
          key={book._id}
        // className="relative group perspective-3d"
        >
          <div className="text-center h-[50vh] flex items-center justify-center perspective-1000">
            {/* {books.map((book, index) => ( */}
            <div
              key={book._id}
              className={`absolute z-2 transition-all duration-300 ease-in-out ${index === focusedBook
                  ? 'z-10 scale-125'
                  : index < focusedBook
                    ? '-translate-x-32 -rotate-y-30 scale-75'
                    : 'translate-x-32 rotate-y-30 scale-75'
                }`}
              onMouseEnter={() => setFocusedBook(index)}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-48 h-64 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
              {index === focusedBook && (
                <h2 className="text-sm font-bold mt-4 text-center">{book.title}</h2>
              )}

            </div>
            {/* ))} */}
          </div>

        </div>
      ))}
    </div>
  );
}
