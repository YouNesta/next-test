"use client";

import { useTodoStore } from "@/features/Todo/store/useTodoStore";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

interface TodoItemProps {
  todoId: number;
}

export function TodoItem({ todoId }: TodoItemProps) {
  const { title, completed } = useTodoStore(
    useShallow((state) => {
      const found = state.todos.find((t) => t.id === todoId);
      return found
        ? { title: found.title, completed: found.completed }
        : { title: "", completed: false };
    })
  );
  const updateTodoAsync = useTodoStore((state) => state.updateTodoAsync);
  const deleteTodoAsync = useTodoStore((state) => state.deleteTodoAsync);
  const isDeleting = useTodoStore((state) => state.deletingIds.has(todoId));

  const handleToggle = useCallback(async () => {
    await updateTodoAsync(todoId, !completed);
  }, [todoId, completed, updateTodoAsync]);

  const handleDelete = useCallback(async () => {
    await deleteTodoAsync(todoId);
  }, [todoId, deleteTodoAsync]);

  if (!title) return null;

  return (
    <Card className="hover:bg-white/30 transition-all">
      <CardContent className="p-4 flex items-center gap-3">
        <Checkbox checked={completed} onChange={handleToggle} />

        <span
          className={`flex-1 font-medium ${
            completed ? "line-through text-gray-600" : "text-gray-800"
          }`}
        >
          {title}
        </span>

        <Button
          variant="destructive"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
