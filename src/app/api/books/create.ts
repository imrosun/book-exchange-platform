import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { uploadToS3 } from '@/lib/aws-s3';
import formidable, { File } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      const { title, author, category, description, publishedBy } = fields;

      const coverFile = Array.isArray(files.cover) ? files.cover[0] : files.cover;

      if (!title || !author || !category || !description || !publishedBy || !coverFile) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      try {
        // Read the cover image from the file system
        const fileData = fs.readFileSync((coverFile as File).filepath);

        // Upload the cover image to S3
        const coverUrl = await uploadToS3(fileData, (coverFile as File).originalFilename!, (coverFile as File).mimetype!);

        // Create the new book document
        const newBook = {
          title,
          author,
          category,
          location,
          description,
          publishedBy,
          cover: coverUrl, // Use the URL of the image uploaded to S3
          createdAt: new Date(),
        };

        const client = await clientPromise;
        const db = client.db('bookExchange');
        const result = await db.collection('books').insertOne(newBook);

        // Instead of result.ops, use the insertedId to fetch the inserted document
        res.status(201).json({ message: 'Book created successfully', bookId: result.insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
