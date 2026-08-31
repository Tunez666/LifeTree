import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    );
  };

  return (
    <button
      id="theme-toggle"
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;