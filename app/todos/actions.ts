"use server";

import { ERROR_MESSAGES, ERROR_PREFIXES } from "@/lib/constants";
import pool from "@/lib/db";
import { Todo } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  try {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY created_at DESC"
    );

    return { success: true, data: result.rows as Todo[] };
  } catch (error) {
    console.error(ERROR_PREFIXES.FETCH_TODOS, error);
    return { error: ERROR_MESSAGES.FETCH_TODOS };
  }
}

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;

  if (!title || title.trim() === "") {
    return { error: ERROR_MESSAGES.TITLE_REQUIRED };
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *",
      [title, false]
    );

    revalidatePath("/");
    return { success: true, data: result.rows[0] as Todo };
  } catch (error) {
    console.error(ERROR_PREFIXES.CREATE_TODO, error);
    return { error: ERROR_MESSAGES.CREATE_TODO };
  }
}

export async function updateTodo(id: number, completed: boolean) {
  try {
    const result = await pool.query(
      "UPDATE todos SET completed = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [completed, id]
    );

    if (result.rows.length === 0) {
      return { error: ERROR_MESSAGES.TODO_NOT_FOUND };
    }

    revalidatePath("/");
    return { success: true, data: result.rows[0] as Todo };
  } catch (error) {
    console.error(ERROR_PREFIXES.UPDATE_TODO, error);
    return { error: ERROR_MESSAGES.UPDATE_TODO };
  }
}

export async function deleteTodo(id: number) {
  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(ERROR_PREFIXES.DELETE_TODO, error);
    return { error: ERROR_MESSAGES.DELETE_TODO };
  }
}
