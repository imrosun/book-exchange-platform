import { useState } from 'react';

interface FormDataType {
  title: string;
  author: string;
  category: string;
  description: string;
  location: string;
  cover: File | null; 
}

export default function AddBook() {
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
      cover: e.target.files ? e.target.files[0] : null, // Correctly assigning File | null
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

    // Handle form reset, success, or error message as necessary
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="title" placeholder="Book Title" onChange={handleChange} />
      <input type="text" name="author" placeholder="Author" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <textarea name="location" placeholder="Location" onChange={handleChange} />
      <input type="file" name="cover" onChange={handleFileChange} />
      <button type="submit">Add Book</button>
    </form>
  );
}
