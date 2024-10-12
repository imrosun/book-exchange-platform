"use client"
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
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []); // Empty dependency array to run once on component mount

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book._id} className="border rounded-lg p-4 shadow-md">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover mb-4"
          />
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-sm text-gray-700">By {book.author}</p>
          <p className="text-sm text-gray-500">Category: {book.category}</p>
          <p className="text-sm text-gray-500">Location: {book.location}</p>
          <p className="mt-2 text-gray-800">{book.description}</p>
        </div>
      ))}
    </div>
  );
}
