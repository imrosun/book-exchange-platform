import { useState } from 'react';
import { toast } from "@/components/hooks/use-toast"; // Assuming this is your toast component

interface FormDataType {
  title: string;
  author: string;
  category: string;
  description: string;
  location: string;
  cover: string; // base64 encoded string for the image
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
    cover: '', // Initialize as an empty string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          cover: reader.result as string, // Convert to base64
        }));
      };
      reader.readAsDataURL(file); // Read file as Data URL
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || ''; // Fetch token from cookies

    if (!token) {
      toast({ title: 'Error', description: 'You are not authorized.', 
        // status: 'error'
       });
      return;
    }

    try {
      const response = await fetch('/api/books/createBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Book added successfully",
          description: "Your book has been added to the collection.",
        });
        setFormData({
          title: '',
          author: '',
          category: '',
          description: '',
          location: '',
          cover: '',
        });
        onClose(); // Close the modal after success
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || 'Failed to add book',
          // status: 'error',
        });
      }
    } catch (err) {
      console.error("Error adding book:", err);
      toast({
        title: "Error",
        description: 'Failed to add book. Please try again.',
        // status: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">Add New Book</h2>
      
      <input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Book Title"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        placeholder="Author"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        placeholder="Category"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Description"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        rows={3}
        required
      />
      <textarea
        name="location"
        value={formData.location}
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
