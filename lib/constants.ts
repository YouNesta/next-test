export const ERROR_MESSAGES = {
  FETCH_TODOS: "Failed to fetch todos",
  CREATE_TODO: "Failed to create todo",
  UPDATE_TODO: "Failed to update todo",
  DELETE_TODO: "Failed to delete todo",
  TODO_NOT_FOUND: "Todo not found",
  TITLE_REQUIRED: "Title is required",
  COMPLETED_FIELD_REQUIRED: "completed field is required and must be a boolean",
} as const;

export const OPERATIONS = {
  FETCHING_TODOS: "fetching todos",
  CREATING_TODO: "creating todo",
  UPDATING_TODO: "updating todo",
  DELETING_TODO: "deleting todo",
} as const;

export const ERROR_PREFIXES = {
  FETCH_TODOS: "Error fetching todos:",
  CREATE_TODO: "Error creating todo:",
  UPDATE_TODO: "Error updating todo:",
  DELETE_TODO: "Error deleting todo:",
} as const;

export const UI_TEXT = {
  LOADING: "Loading...",
  COMPLETED: "Completed",
  PENDING: "Pending",
  TOTAL: "Total",
  NO_TODOS: "No todos yet. Add one above!",
  ADD_TODO_PLACEHOLDER: "Add a new todo...",
  ADD_BUTTON: "Add",
} as const;

