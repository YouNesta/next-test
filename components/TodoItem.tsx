'use client';

import { useState } from 'react';
import { Todo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { updateTodo, deleteTodo } from '@/app/actions';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    await updateTodo(todo.id, !todo.completed);
    onUpdate();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTodo(todo.id);
    onUpdate();
  };

  return (
    <Card className="hover:bg-white/30 transition-all">
      <CardContent className="p-4 flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onChange={() => handleToggle()}
        />

        <span className={`flex-1 font-medium ${todo.completed ? 'line-through text-gray-600' : 'text-gray-800'}`}>
          {todo.title}
        </span>

        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleDelete()}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
