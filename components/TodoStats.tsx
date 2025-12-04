'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Todo } from '@/lib/types';

export function TodoStats() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then((todos: Todo[]) => {
        const newStats = stats;
        newStats.total = todos.length;
        newStats.completed = todos.filter(t => t.completed).length;
        newStats.pending = todos.filter(t => !t.completed).length;
        setStats(newStats);
      });
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-gray-600 text-sm font-medium mt-1">Total</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{stats.completed}</p>
            <p className="text-gray-600 text-sm font-medium mt-1">Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
            <p className="text-gray-600 text-sm font-medium mt-1">Pending</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
