"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const THEME_KEY = "theme";

export function ModeToggleBootstrap() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  // declare function before useEffect
  const applyTheme = (value: "light" | "dark" | "system") => {
    let applied = value;

    if (value === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      applied = prefersDark ? "dark" : "light";
    }

    localStorage.setItem(THEME_KEY, value);

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.setAttribute("data-bs-theme", applied);
        setTheme(value);
      });
    } else {
      document.documentElement.setAttribute("data-bs-theme", applied);
      setTheme(value);
    }
  };

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem(THEME_KEY) as
      | "light"
      | "dark"
      | "system"
      | null;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const current = document.documentElement.getAttribute("data-bs-theme") as
        | "light"
        | "dark"
        | null;
      if (current) setTheme(current);
    }
  }, []);

  if (!mounted) return null;

  return (
    <Dropdown onSelect={(key) => applyTheme(key as any)}>
      <Dropdown.Toggle variant="outline-secondary">
        <Sun className="opacity-100 dark-opacity-0" size={16} />
        <Moon className="opacity-0 dark-opacity-100" size={16} />
        Theme
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="light" active={theme === "light"}>
          Light
        </Dropdown.Item>

        <Dropdown.Item eventKey="dark" active={theme === "dark"}>
          Dark
        </Dropdown.Item>

        <Dropdown.Item eventKey="system" active={theme === "system"}>
          System
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
