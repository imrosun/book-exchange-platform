import { useState } from 'react';

interface FormDataType {
  title: string;
  author: string;
  category: string;
  description: string;
  location: string;
  cover: File | null; 
}

interface AddBookProps {
  onClose: () => void;
}

export default function AddBook({ onClose }: AddBookProps) {
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    author: '',
    category: '',
    description: '',
    location: '',
    cover: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      cover: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    if (formData.cover) {
      formDataToSend.append('cover', formData.cover);
    }

    await fetch('/api/books/create', {
      method: 'POST',
      body: formDataToSend,
    });

    // Handle success or error message as necessary
    onClose(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <h2 className="text-xl font-semibold text-center mb-4">Add New Book</h2>
    <input
      type="text"
      name="title"
      placeholder="Book Title"
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      required
    />
    <input
      type="text"
      name="author"
      placeholder="Author"
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      required
    />
    <input
      type="text"
      name="category"
      placeholder="Category"
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      required
    />
    <textarea
      name="description"
      placeholder="Description"
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      rows={3}
      required
    />
    <textarea
      name="location"
      placeholder="Location"
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      rows={2}
    />
    <input
      type="file"
      name="cover"
      onChange={handleFileChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
    />
    <button 
      type="submit" 
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Add Book
    </button>
  </form>
  );
}