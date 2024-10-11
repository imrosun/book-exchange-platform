"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookList from '@/components/book-list';

// Mock data for books
const books = [
  { id: 1, title: 'Book 1', cover: '/api/placeholder/200/300' },
  { id: 2, title: 'Book 2', cover: '/api/placeholder/200/300' },
  { id: 3, title: 'Book 3', cover: '/api/placeholder/200/300' },
  { id: 4, title: 'Book 4', cover: '/api/placeholder/200/300' },
  { id: 5, title: 'Book 5', cover: '/api/placeholder/200/300' },
];

interface Book {
  _id: string; // Define the expected structure of a book
  title: string;
  author: string;
  category: string;
  description: string;
  location: string;
  cover: string;
  email: string; // Include any other fields you expect
}

const HomePage: React.FC = () => {
  const [focusedBook, setFocusedBook] = useState(2); // Index of the center book
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/book/getBooks');
      
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error("Failed to fetch books");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen z-10 bg-gray-100 dark:bg-gray-900 pt-24">
      {/* 3D Book Display */}
      <div className=" h-[50vh] mt-10 flex items-center justify-center perspective-1000">
        
      <BookList />

      <ul>
        {books.map((book) => (
       
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {/* Display other book details */}
          </li>
        ))}
      </ul>
      </div>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Search for books..."
            className="flex-grow"
          />
          <Button>Search</Button>
        </div>
      </div>

      {/* Book List */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-6">
        {/* {books.map((book) => (
          <div key={book.id} className="flex flex-col items-center">
            <img
              src={book.cover}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
            <p className="mt-2 text-center font-medium">{book.title}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default HomePage;