// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';  // Ensure you install this package

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('book-exchange');

    // Check if user exists
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT (Optional but recommended for authentication)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: 'Login successful',
      token,  // Return the token for client-side storage (e.g., localStorage or cookies)
    }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
