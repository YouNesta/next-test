import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Todo } from '@/lib/types';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );

    return NextResponse.json(result.rows as Todo[]);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}
