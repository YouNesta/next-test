'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim() === '') {
    return { error: 'Title is required' };
  }

  try {
    await pool.query(
      'INSERT INTO todos (title, completed) VALUES ($1, $2)',
      [title, false]
    );

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating todo:', error);
    return { error: 'Failed to create todo' };
  }
}

export async function updateTodo(id: number, completed: boolean) {
  try {
    await pool.query(
      'UPDATE todos SET completed = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [completed, id]
    );

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating todo:', error);
    return { error: 'Failed to update todo' };
  }
}

export async function deleteTodo(id: number) {
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { error: 'Failed to delete todo' };
  }
}
