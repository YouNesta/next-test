"use client";

import { useTodoStore } from "@/features/Todo/store/useTodoStore";
import { UI_TEXT } from "@/lib/constants";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useEffect, useState } from "react";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const createTodo = useTodoStore((state) => state.createTodo);
  const createError = useTodoStore((state) => state.createError);
  const clearCreateError = useTodoStore((state) => state.clearCreateError);

  useEffect(() => {
    if (createError) {
      const timer = setTimeout(() => {
        clearCreateError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [createError, clearCreateError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    await createTodo(formData);
    if (title) {
      setTitle("");
    }
    form.reset();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            name="title"
            placeholder={UI_TEXT.ADD_TODO_PLACEHOLDER}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
          />

          <Button type="submit">{UI_TEXT.ADD_BUTTON}</Button>
        </form>

        {createError && (
          <p className="text-red-600 text-sm mt-2 font-medium">{createError}</p>
        )}
      </CardContent>
    </Card>
  );
}
