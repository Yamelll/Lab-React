type TaskCounterProps = {
  done: number;
  total: number;
};

export const TaskCounter = ({ done, total }: TaskCounterProps) => {
  return (
    <p>
      {done === total ? '¡Todo listo!' : `${done} de ${total} completadas`}
    </p>
  );
};