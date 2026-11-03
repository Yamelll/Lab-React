import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  current: number;
  total: number;
};

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = total === 0 ? 0 : (current / total) * 100;

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div className={styles.fill} style={{ width: `${percentage}%` }} />
    </div>
  );
};