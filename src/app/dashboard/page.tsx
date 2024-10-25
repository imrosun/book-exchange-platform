"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddBook from '@/components/add-book';
import Modal from '@/components/modal-book';
import UserBooks from '@/components/user-book-list';
import { useAuth } from '@/app/context/AuthContext'; 
import { useRouter } from 'next/navigation';

interface Book {
  id?: number;
  title: string;
  author?: string;
  category?: string;
  description?: string;
  location?: string;
  cover: string;
}

const Dashboard: React.FC = () => {
  const { isLoggedIn, loading } = useAuth(); 
  const router = useRouter(); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/'); 
    }
  }, [isLoggedIn, loading, router]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className='flex justify-center relative'>
        <h3 className='flex justify-center'>My Books</h3>

        {books.map((book, index) => (
          <div key={book.id} className="relative mt-20">
            <img
              src={book.cover}
              alt={book.title}
              className="w-48 h-64 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        ))}

        <UserBooks />

      </div>

      <div className='flex justify-center p-6 '>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition">
          Add Book
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddBook onClose={closeModal} />
        </Modal>

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