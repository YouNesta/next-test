"use client";

import { TodoList } from "@/features/Todo/components/TodoList";
import { useTodoStore } from "@/features/Todo/store/useTodoStore";
import { useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoStats } from "./components/TodoStats";

export function TodoContainer() {
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <TodoStats />
      <TodoForm />
      <TodoList />
    </div>
  );
}
