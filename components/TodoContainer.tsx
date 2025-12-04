'use client';

import { useState } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';

export function TodoContainer() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <TodoWrapper refreshKey={refreshKey} onRefresh={handleRefresh} />
    </div>
  );
}

function TodoWrapper({ refreshKey, onRefresh }: { refreshKey: number; onRefresh: () => void }) {
  return (
    <div>
      <StatsWrapper refreshKey={refreshKey} />
      <FormWrapper onRefresh={onRefresh} />
      <ListWrapper refreshKey={refreshKey} onRefresh={onRefresh} />
    </div>
  );
}

function StatsWrapper({ refreshKey }: { refreshKey: number }) {
  return (
    <div className="mb-6">
      <TodoStats key={refreshKey} />
    </div>
  );
}

function FormWrapper({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="mb-6">
      <TodoForm onSuccess={onRefresh} />
    </div>
  );
}

function ListWrapper({ refreshKey, onRefresh }: { refreshKey: number; onRefresh: () => void }) {
  return (
    <div>
      <TodoList key={refreshKey} onRefresh={onRefresh} />
    </div>
  );
}
