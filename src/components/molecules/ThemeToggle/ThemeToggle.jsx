import "./ThemeToggle.scss";
import { useEffect, useState } from "react";
import { THEMES, THEME_LIST, coerceTheme } from "../../../constants/theme";

export const ThemeToggle = () => {
  const isOsThemePrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const initialTheme = coerceTheme(
    localStorage.getItem("theme"),
    isOsThemePrefersDark ? THEMES.DARK : THEMES.LIGHT
  );

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle">
      {THEME_LIST.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
          className={`theme-btn ${theme === t ? "is-active" : ""}`}
          data-theme={t}
        />
      ))}
      <p className="floating-name">{theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
    </div>
  );
};
