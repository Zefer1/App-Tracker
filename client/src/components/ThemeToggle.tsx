import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="btn btn-primary"
      onClick={toggleTheme}
    >
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
}
