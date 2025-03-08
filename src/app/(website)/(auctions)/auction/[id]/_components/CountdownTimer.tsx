import * as React from "react";
import { TimeUnit } from "./TimeUnit";


interface CountdownTimerProps {
  startingTime: string;
  endingTime: string;
}

export function CountdownTimer({ startingTime, endingTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  React.useEffect(() => {
    // Parse starting and ending times from props
    const start = new Date(startingTime).getTime();
    const end = new Date(endingTime).getTime();
    console.log(start);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = end - now; // Calculate remaining time until the ending time

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = String(Math.floor(remainingTime / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hours = String(
        Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((remainingTime % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [startingTime, endingTime]);

  return (
    <div className="flex flex-col justify-center items-center p-3 text-center bg-[#E6EEF6] rounded-lg w-full">
      <div className="text-sm leading-none text-neutral-400">
        Hurry up! Offer ends In:
      </div>
      <div className="flex items-start mt-1.5 leading-tight whitespace-nowrap">
        {Object.entries(timeLeft).map(([label, value], index) => (
          <React.Fragment key={label}>
            <TimeUnit value={value} label={label.charAt(0).toUpperCase() + label.slice(1)} />
            {index < Object.entries(timeLeft).length - 1 && (
              <div className="text-xl leading-none text-black">:</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
