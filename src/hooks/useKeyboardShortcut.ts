import { useEffect } from 'react';

const TYPING_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

export const useKeyboardShortcut = (
  key: string,
  onPress: (event: KeyboardEvent) => void,
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Si la persona está escribiendo en un campo, el atajo no debe activarse
      const isTyping =
        event.target instanceof HTMLElement &&
        TYPING_TAGS.includes(event.target.tagName);

      if (event.key === key && !isTyping) {
        onPress(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, onPress]);
};