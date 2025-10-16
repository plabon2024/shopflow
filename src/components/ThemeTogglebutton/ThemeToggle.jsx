"use client";

import { useTheme } from "next-themes";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "../ui/shadcn-io/theme-toggle-button";
import { useEffect, useState } from "react";

export default function Example() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before using theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    startTransition(() => {
      setTheme(newTheme);
    });
  };

  if (!mounted) return null; // prevent hydration mismatch

  return (
    <ThemeToggleButton
      theme={theme}
      onClick={handleToggle}
      variant="circle-blur"
      start="top-left"
    />
  );
}
