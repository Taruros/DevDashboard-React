import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const hour = new Date().getHours();
  let phaseOfDay;
  if (hour >= 5 && hour < 12) phaseOfDay = "morning";
  else if (hour >= 12 && hour < 17) phaseOfDay = "afternoon";
  else if (hour >= 17 && hour < 21) phaseOfDay = "evening";
  else phaseOfDay = "night";

  const dateOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header>
      <h1>Good {phaseOfDay}</h1>

      <div className="header-utilities">
        <time
          dateTime={currentDate.toISOString().split("T")[0]}
          id="header-date"
        >
          {currentDate.toLocaleDateString("en-US", dateOptions)}
        </time>

        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
};

export default Header;
