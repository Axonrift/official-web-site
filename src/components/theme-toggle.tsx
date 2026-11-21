"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import {
  applyTheme,
  documentTheme,
  themeStorageKey,
  type Theme,
} from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = documentTheme();
    applyTheme(initial);
    setTheme(initial);

    function syncPreference(event: StorageEvent) {
      if (event.key !== themeStorageKey && event.key !== null) return;
      const next = event.newValue === "light" ? "light" : "dark";
      applyTheme(next);
      setTheme(next);
    }
    window.addEventListener("storage", syncPreference);
    return () => window.removeEventListener("storage", syncPreference);
  }, []);

  function toggle() {
    const next = documentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* Switching still works when storage is blocked. */
    }
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label="Light mode"
      aria-pressed={theme === "light"}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-sun">
        <Icon name="sun" />
      </span>
      <span className="theme-moon">
        <Icon name="moon" />
      </span>
    </button>
  );
}
