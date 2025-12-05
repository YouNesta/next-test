import { createTodo, getTodos } from "@/app/todos/actions";
import { handleApiError, handleApiResult } from "@/lib/api-utils";
import { ERROR_MESSAGES, OPERATIONS } from "@/lib/constants";

export async function GET() {
  try {
    const result = await getTodos();
    return handleApiResult(result);
  } catch (error) {
    return handleApiError(
      error,
      OPERATIONS.FETCHING_TODOS,
      ERROR_MESSAGES.FETCH_TODOS
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await createTodo(formData);
    return handleApiResult(result, 201);
  } catch (error) {
    return handleApiError(
      error,
      OPERATIONS.CREATING_TODO,
      ERROR_MESSAGES.CREATE_TODO
    );
  }
}
