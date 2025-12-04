'use client';

import { useEffect, useState } from 'react';
import { Todo } from '@/lib/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  onRefresh?: () => void;
}

export function TodoList({ onRefresh }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchTodos();
    if (onRefresh) {
      onRefresh();
    }
  };

  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setCompletedCount(todos.filter(todo => todo.completed).length);
    setPendingCount(todos.filter(todo => !todo.completed).length);
  }, [todos]);

  if (loading) {
    return <div className="text-gray-700">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-6 mb-4">
        <p className="text-gray-700 font-medium">Completed: <span className="font-bold text-gray-800">{completedCount}</span></p>
        <p className="text-gray-700 font-medium">Pending: <span className="font-bold text-gray-800">{pendingCount}</span></p>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
