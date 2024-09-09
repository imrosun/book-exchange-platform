// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('book-exchange');

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Insert into database
    await db.collection('users').insertOne(newUser);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
