"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddBook from '@/components/add-book';
import Modal from '@/components/modal-book';

// Mock data for books
const books = [
  { id: 1, title: 'Book 1', cover: '/api/placeholder/200/300' },
  { id: 2, title: 'Book 2', cover: '/api/placeholder/200/300' },
  { id: 3, title: 'Book 3', cover: '/api/placeholder/200/300' },
  { id: 4, title: 'Book 4', cover: '/api/placeholder/200/300' },
  { id: 5, title: 'Book 5', cover: '/api/placeholder/200/300' },
];

const Dashboard: React.FC = () => {
  const [focusedBook, setFocusedBook] = useState(2); // Index of the center book

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen z-10 bg-gray-100 dark:bg-gray-900 pt-24">
      <div className='flex justify-center'>
        <h3 className='flex justify-center'>My Books</h3>
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`relative mt-20 transition-all duration-300 ease-in-out ${
              index === focusedBook
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
          </div>
        ))}
        
      </div>

      <div className='flex justify-center p-6'>
      <button 
        onClick={openModal} 
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition">
          Add Book
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddBook onClose={closeModal} />
      </Modal>

      </div>



      {/* 3D Book Display */}
      {/* <div className=" h-[50vh] flex items-center justify-center perspective-1000">
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`absolute z-2 transition-all duration-300 ease-in-out ${
              index === focusedBook
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
          </div>
        ))}
      </div> */}

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
        {books.map((book) => (
          <div key={book.id} className="flex flex-col items-center">
            <img
              src={book.cover}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
            <p className="mt-2 text-center font-medium">{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;