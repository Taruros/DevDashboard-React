import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("prefers-color-scheme: dark").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (theme !== "dark") document.documentElement.classList.remove("dark");

  return (
    <button
      className="btn btn-theme-toggle"
      id="theme-toggle"
      onClick={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        document.documentElement.classList.toggle("dark");
      }}
    >
      Toggle theme
    </button>
  );
};

export default ThemeToggle;
