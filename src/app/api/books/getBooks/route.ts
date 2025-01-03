import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('book-exchange');

    const books = await db.collection('books').find({}).toArray();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ message: 'Failed to fetch books' }, { status: 500 });
  }
}
