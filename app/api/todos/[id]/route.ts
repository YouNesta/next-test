import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { handleApiError, handleApiResult } from "@/lib/api-utils";
import { ERROR_MESSAGES, OPERATIONS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const { completed } = body;

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMPLETED_FIELD_REQUIRED },
        { status: 400 }
      );
    }

    const result = await updateTodo(id, completed);
    return handleApiResult(result);
  } catch (error) {
    return handleApiError(
      error,
      OPERATIONS.UPDATING_TODO,
      ERROR_MESSAGES.UPDATE_TODO
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteTodo(parseInt(id));
    return handleApiResult(result);
  } catch (error) {
    return handleApiError(
      error,
      OPERATIONS.DELETING_TODO,
      ERROR_MESSAGES.DELETE_TODO
    );
  }
}
