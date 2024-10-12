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

export default function UserBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1] || ''; // Fetch token from cookies

        if (!token) {
          setError('Authorization token is missing');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/books/getUserBook', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user books');
        }

        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user books:', err);
        setError('Failed to load books. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, []);

  if (loading) return <p>Loading your books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.length === 0 ? (
        <p className="text-center col-span-full">You haven't added any books yet.</p>
      ) : (
        books.map((book) => (
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
        ))
      )}
    </div>
  );
}
