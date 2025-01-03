"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookList from '@/components/book-list';

interface Book {
  _id: string; 
  title: string;
  author: string;
  category: string;
  description: string;
  location: string;
  cover: string;
  email: string; 
}

const HomePage: React.FC = () => {
  const [focusedBook, setFocusedBook] = useState(2); 
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

     
    </div>
  );
};

export default HomePage;