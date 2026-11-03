// Devuelve un mensaje de error, o null si el título es válido
export const validateTaskTitle = (title: string): string | null => {
  const trimmed = title.trim();

  if (trimmed.length < 3) return 'El título debe tener al menos 3 caracteres';
  if (trimmed.length > 80) return 'El título no puede superar los 80 caracteres';

  return null;
};