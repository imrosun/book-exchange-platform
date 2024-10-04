// import type { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '@/lib/mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const client = await clientPromise;
//       const db = client.db('bookExchange');
//       const books = await db.collection('books').find({}).toArray();

//       res.status(200).json({ books });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

// app/api/book/getBooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('book-exchange');

    // Fetch all books from the database
    const books = await db.collection('books').find().toArray();

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error retrieving books:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}