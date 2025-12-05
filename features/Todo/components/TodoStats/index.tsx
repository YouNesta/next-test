"use client";

import { useTodoStore } from "@/features/Todo/store/useTodoStore";
import { UI_TEXT } from "@/lib/constants";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useMemo } from "react";

export function TodoStats() {
  const todos = useTodoStore((state) => state.todos);

  const stats = useMemo(() => {
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      pending: todos.filter((t) => !t.completed).length,
    };
  }, [todos]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-gray-600 text-sm font-medium mt-1">
              {UI_TEXT.TOTAL}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {stats.completed}
            </p>
            <p className="text-gray-600 text-sm font-medium mt-1">
              {UI_TEXT.COMPLETED}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
            <p className="text-gray-600 text-sm font-medium mt-1">
              {UI_TEXT.PENDING}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
