import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  email: string;
}

export async function POST(req: NextRequest) {
  const { title, author, category, description, location, cover } = await req.json();

  // Fetch JWT token from headers
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'Authorization token is required' }, { status: 401 });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    
    if (!decoded || !decoded.email) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db('book-exchange');

    // Create a new book entry
    const newBook = {
      title,
      author,
      category,
      description,
      location,
      cover, // Assuming the cover is a base64 string
      email: decoded.email,
      createdAt: new Date(),
    };

    // Insert the new book into the collection
    await db.collection('books').insertOne(newBook);

    // Respond with success
    return NextResponse.json({ message: 'Book added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
