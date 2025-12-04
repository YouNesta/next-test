'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createTodo } from '@/app/actions';

interface TodoFormProps {
  onSuccess: () => void;
}

export function TodoForm({ onSuccess }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await createTodo(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setTitle('');
      e.currentTarget.reset();
      onSuccess();
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            name="title"
            placeholder="Add a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
          />

          <Button type="submit">Add</Button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
