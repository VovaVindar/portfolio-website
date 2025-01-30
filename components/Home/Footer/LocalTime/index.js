import { useState, useEffect, forwardRef } from "react";

const LocalTime = forwardRef((props, ref) => {
  const [time, setTime] = useState({ hours: "--", minutes: "--" });

  useEffect(() => {
    const updateTime = () => {
      try {
        const vancouverTime = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Vancouver",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const [hours, minutes] = vancouverTime
          .split(":")
          .map((part) => part.trim());
        setTime({ hours, minutes });
      } catch (error) {
        console.warn("Error updating time:", error);
        setTime({ hours: "--", minutes: "--" });
      }
    };

    // Initial update
    updateTime();

    // Calculate delay until next minute
    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Initialize interval at the start of next minute
    const initialTimeout = setTimeout(() => {
      updateTime();
      const intervalId = setInterval(updateTime, 60000);
      return () => clearInterval(intervalId);
    }, msUntilNextMinute);

    // Cleanup timeout on unmount
    return () => clearTimeout(initialTimeout);
  }, []); // Empty dependency array since updateTime is now inside

  return (
    <span
      ref={ref}
      role="timer" // Indicates this is a time display
    >
      {time.hours}
      <span aria-hidden="true">:</span>
      {/* Hide colon from screen readers */}
      {time.minutes}
      <span aria-hidden="true">,</span>
      {/* Hide comma from screen readers */}
    </span>
  );
});

LocalTime.displayName = "LocalTime";

export default LocalTime;
