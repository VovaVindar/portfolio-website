import React, { useState, useEffect, forwardRef } from "react";

const LocalTime = forwardRef(({}, ref) => {
  // Footer time
  const [time, setTime] = useState({ hours: "", minutes: "" });

  const updateTime = () => {
    const vancouverTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Vancouver",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const [hours, minutes] = vancouverTime.split(":");
    setTime({ hours, minutes });
  };

  useEffect(() => {
    updateTime(); // Set initial time immediately

    // Calculate the remaining milliseconds until the next minute
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

    const initialTimeout = setTimeout(() => {
      updateTime(); // Sync at the start of the next minute
      const intervalId = setInterval(updateTime, 60000); // Update every minute
      return () => clearInterval(intervalId); // Cleanup the interval
    }, msUntilNextMinute);

    return () => clearTimeout(initialTimeout); // Cleanup the initial timeout
  }, []);

  return (
    <span ref={ref}>
      {time.hours}
      <span>:</span>
      {time.minutes},
    </span>
  );
});

export default LocalTime;
