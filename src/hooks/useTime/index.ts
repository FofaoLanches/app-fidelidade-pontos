"use client";
import { differenceInMilliseconds, intervalToDuration, isBefore } from "date-fns";
import { useEffect, useState } from "react";

export const useTime = () => {
  const now = new Date();
  const endOfTimestamp = now.getTime() + 47000;
  const endOfTime = new Date(endOfTimestamp);

  const [countdown, setCountdown] = useState<number | undefined>(47);
  const [countdownEnded, setCountdownEnded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [endDate, _] = useState(() => {
    return new Date(Date.now() + differenceInMilliseconds(endOfTime, now));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({ start: now, end: endDate });

      if (isBefore(endDate, now)) {
        setCountdownEnded(true);
        clearInterval(interval);
      } else {
        setCountdown(duration.seconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return {
    countdown,
    countdownEnded,
  };
};
