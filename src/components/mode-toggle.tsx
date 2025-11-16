"use client";

import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Sun, Moon } from "lucide-react";

export function ModeToggleBootstrap() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  useEffect(() => {
    setMounted(true);

    // читаем текущую тему из HTML
    const current = document.documentElement.getAttribute("data-bs-theme") as
      | "light"
      | "dark"
      | null;

    if (current) setTheme(current);
  }, []);

  if (!mounted) return null;

  const applyTheme = (value: "light" | "dark" | "system") => {
    if (value === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      value = prefersDark ? "dark" : "light";
    }

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.setAttribute("data-bs-theme", value);
        setTheme(value);
      });
    } else {
      document.documentElement.setAttribute("data-bs-theme", value);
      setTheme(value);
    }
  };

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

        <Dropdown.Item eventKey="system">System</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
