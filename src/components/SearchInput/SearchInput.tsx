import type { Ref } from 'react';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
};

// En React 19, "ref" se recibe como una prop más
export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Buscar…',
  ref,
}: SearchInputProps) => {
  return (
    <input
      ref={ref}
      type="search"
      placeholder={placeholder}
      aria-label="Buscar"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};