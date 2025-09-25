"use client";
import { useTheme } from "next-themes";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "../ui/shadcn-io/theme-toggle-button";

export default function Example() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    startTransition(() => {
      setTheme(newTheme);
    });
  };

  return (
<ThemeToggleButton
  theme={theme}
  onClick={handleToggle}
  variant="circle-blur"
  start="top-left"
/>
  );
}
