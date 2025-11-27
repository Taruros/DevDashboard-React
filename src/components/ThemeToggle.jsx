import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      if (theme === "light") document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    try {
      document.documentElement.classList.toggle("dark");
    } catch {
      // ignore
    }
  };

  return (
    <button
      className="btn btn-theme-toggle"
      id="theme-toggle"
      onClick={toggleTheme}
    >
      Toggle theme
    </button>
  );
};

export default ThemeToggle;
