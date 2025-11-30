import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signIn, signUp } from '@/lib/auth'; // hypothetical auth functions
import { LucideIcon } from 'lucide-react'; // example import for Lucide React icons

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = userSchema.parse(body);

    const { pathname } = new URL(request.url);
    let response;

    if (pathname.endsWith('/signin')) {
      response = await signIn(email, password);
    } else if (pathname.endsWith('/signup')) {
      response = await signUp(email, password);
    } else {
      return NextResponse.json({ error: 'Not Found' }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json(response, { headers: corsHeaders });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400, headers: corsHeaders });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Authentication API' }, { headers: corsHeaders });
}