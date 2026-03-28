import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setTimeout(() => setIsTransitioning(false), 400);
  }, []);

  return { theme, toggleTheme, isTransitioning };
}