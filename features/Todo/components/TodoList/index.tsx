"use client";

import { TodoItem } from "@/features/Todo/components/TodoList/components/TodoItem";
import { useTodoStore } from "@/features/Todo/store/useTodoStore";
import { UI_TEXT } from "@/lib/constants";
import { useMemo } from "react";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const loading = useTodoStore((state) => state.loading);

  const { completedCount, pendingCount } = useMemo(() => {
    return {
      completedCount: todos.filter((todo) => todo.completed).length,
      pendingCount: todos.filter((todo) => !todo.completed).length,
    };
  }, [todos]);

  if (loading) {
    return <div className="text-gray-700">{UI_TEXT.LOADING}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-6 mb-4">
        <p className="text-gray-700 font-medium">
          {UI_TEXT.COMPLETED}:{" "}
          <span className="font-bold text-gray-800">{completedCount}</span>
        </p>
        <p className="text-gray-700 font-medium">
          {UI_TEXT.PENDING}:{" "}
          <span className="font-bold text-gray-800">{pendingCount}</span>
        </p>
      </div>

      {todos.length === 0 ? (
        <div className="text-gray-600 text-center py-8">{UI_TEXT.NO_TODOS}</div>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todoId={todo.id} />
          ))}
        </div>
      )}
    </div>
  );
}
