export const formatProgressTime = (
  seconds: number | null | undefined,
): string => {
  if (seconds === null || seconds === undefined) {
    return '00:00';
  }

  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${mins}:${secs}`;
};
