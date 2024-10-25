import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  email: string;
}

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Authorization token is required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (!decoded || !decoded.email) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db('book-exchange');

    const userBooks = await db.collection('books').find({ email: decoded.email }).toArray();

    return NextResponse.json(userBooks, { status: 200 });
  } catch (error) {
    console.error('Error fetching user books:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
