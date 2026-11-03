import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { validateTaskTitle } from './validateTaskTitle';

export const useTaskForm = (onSubmit: (title: string) => void) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const foundError = validateTaskTitle(title);
    setError(foundError);
    if (foundError !== null) return;

    onSubmit(title.trim());
    setTitle('');
  };

  return { title, error, handleChange, handleSubmit };
};