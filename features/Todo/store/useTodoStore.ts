"use client";

import { ERROR_MESSAGES, ERROR_PREFIXES } from "@/lib/constants";
import { Todo } from "@/lib/types";
import { create } from "zustand";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  createError: string;
  isCreating: boolean;
  updateErrors: Record<number, string>;
  deleteErrors: Record<number, string>;
  updatingIds: Set<number>;
  deletingIds: Set<number>;

  // Actions
  setTodos: (todos: Todo[]) => void;
  setLoading: (loading: boolean) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  removeTodo: (id: number) => void;
  setCreateError: (error: string) => void;
  clearCreateError: () => void;
  setIsCreating: (isCreating: boolean) => void;
  setUpdateError: (id: number, error: string) => void;
  clearUpdateError: (id: number) => void;
  setDeleteError: (id: number, error: string) => void;
  clearDeleteError: (id: number) => void;
  setUpdating: (id: number, isUpdating: boolean) => void;
  setDeleting: (id: number, isDeleting: boolean) => void;

  // Async actions
  fetchTodos: () => Promise<void>;
  createTodo: (
    formData: FormData
  ) => Promise<{ success: boolean; error?: string; data?: Todo }>;
  updateTodoAsync: (
    id: number,
    completed: boolean
  ) => Promise<{ success: boolean; error?: string; data?: Todo }>;
  deleteTodoAsync: (
    id: number
  ) => Promise<{ success: boolean; error?: string }>;
}

type ApiResponse<T = Todo> = {
  success: boolean;
  error?: string;
  data?: T;
};

const toggleSetItem = <T>(set: Set<T>, item: T, include: boolean): Set<T> => {
  const newSet = new Set(set);
  include ? newSet.add(item) : newSet.delete(item);
  return newSet;
};

const setErrorInRecord = <K extends string | number>(
  record: Record<K, string>,
  key: K,
  error: string
): Record<K, string> => ({ ...record, [key]: error });

const removeErrorFromRecord = <K extends string | number>(
  record: Record<K, string>,
  key: K
): Record<K, string> => {
  const { [key]: _, ...rest } = record;
  return rest as Record<K, string>;
};

const extractError = (err: unknown, defaultMessage: string): string =>
  err instanceof Error ? err.message : defaultMessage;

const handleApiResponse = async <T>(
  response: Response,
  defaultError: string
): Promise<{ error?: string; data?: T }> => {
  const result = await response.json();
  if (result.error || !response.ok) {
    return { error: result.error || defaultError };
  }
  return { data: result };
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: true,
  createError: "",
  isCreating: false,
  updateErrors: {},
  deleteErrors: {},
  updatingIds: new Set<number>(),
  deletingIds: new Set<number>(),

  setTodos: (todos) => set({ todos }),
  setLoading: (loading) => set({ loading }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  setCreateError: (error) => set({ createError: error }),
  clearCreateError: () => set({ createError: "" }),
  setIsCreating: (isCreating) => set({ isCreating }),
  setUpdateError: (id, error) =>
    set((state) => ({
      updateErrors: setErrorInRecord(state.updateErrors, id, error),
    })),
  clearUpdateError: (id) =>
    set((state) => ({
      updateErrors: removeErrorFromRecord(state.updateErrors, id),
    })),
  setDeleteError: (id, error) =>
    set((state) => ({
      deleteErrors: setErrorInRecord(state.deleteErrors, id, error),
    })),
  clearDeleteError: (id) =>
    set((state) => ({
      deleteErrors: removeErrorFromRecord(state.deleteErrors, id),
    })),
  setUpdating: (id, isUpdating) =>
    set((state) => ({
      updatingIds: toggleSetItem(state.updatingIds, id, isUpdating),
    })),
  setDeleting: (id, isDeleting) =>
    set((state) => ({
      deletingIds: toggleSetItem(state.deletingIds, id, isDeleting),
    })),

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: ERROR_MESSAGES.FETCH_TODOS }));
        console.error(ERROR_PREFIXES.FETCH_TODOS, error);
        set({ loading: false });
        return;
      }
      const data = await response.json();
      const todos = Array.isArray(data) ? data : [];
      set({ todos, loading: false });
    } catch (error) {
      console.error(ERROR_PREFIXES.FETCH_TODOS, error);
      set({ loading: false });
    }
  },

  createTodo: async (formData): Promise<ApiResponse> => {
    set({ isCreating: true, createError: "" });
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: formData,
      });

      const { error, data } = await handleApiResponse<Todo>(
        response,
        ERROR_MESSAGES.CREATE_TODO
      );

      if (error) {
        set({ createError: error, isCreating: false });
        return { success: false, error };
      }

      get().addTodo(data!);
      set({ isCreating: false, createError: "" });
      return { success: true, data };
    } catch (err) {
      const errorMessage = extractError(err, ERROR_MESSAGES.CREATE_TODO);
      set({ createError: errorMessage, isCreating: false });
      return { success: false, error: errorMessage };
    }
  },

  updateTodoAsync: async (id, completed): Promise<ApiResponse> => {
    get().setUpdating(id, true);
    get().clearUpdateError(id);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      const { error, data } = await handleApiResponse<Todo>(
        response,
        ERROR_MESSAGES.UPDATE_TODO
      );

      if (error) {
        get().setUpdateError(id, error);
        get().setUpdating(id, false);
        return { success: false, error };
      }

      get().updateTodo(id, {
        completed,
        updated_at: new Date(data!.updated_at),
      });
      get().setUpdating(id, false);
      return { success: true, data };
    } catch (err) {
      const errorMessage = extractError(err, ERROR_MESSAGES.UPDATE_TODO);
      get().setUpdateError(id, errorMessage);
      get().setUpdating(id, false);
      return { success: false, error: errorMessage };
    }
  },

  deleteTodoAsync: async (id): Promise<ApiResponse> => {
    get().setDeleting(id, true);
    get().clearDeleteError(id);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      const { error } = await handleApiResponse(
        response,
        ERROR_MESSAGES.DELETE_TODO
      );

      if (error) {
        get().setDeleteError(id, error);
        get().setDeleting(id, false);
        return { success: false, error };
      }

      get().removeTodo(id);
      get().setDeleting(id, false);
      return { success: true };
    } catch (err) {
      const errorMessage = extractError(err, ERROR_MESSAGES.DELETE_TODO);
      get().setDeleteError(id, errorMessage);
      get().setDeleting(id, false);
      return { success: false, error: errorMessage };
    }
  },
}));
