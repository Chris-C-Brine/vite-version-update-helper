import {useState, useEffect, type JSX} from 'react';

// Define the type for the component props
interface CountdownTimerProps {
  duration: number;
}

export function CountdownTimer({duration}: CountdownTimerProps): JSX.Element {
  const [secondsLeft, setSecondsLeft] = useState<number>(duration);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timerId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  // Helper function to format seconds into MM:SS format
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>{formatTime(secondsLeft)}</>
  );
}