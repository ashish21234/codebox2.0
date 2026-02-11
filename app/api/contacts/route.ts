import { db } from '@/config/db';
import { contacts } from '@/config/schema';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Backend validation (never skip this)
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await db.insert(contacts).values({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      { success: true, message: 'Message saved successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
