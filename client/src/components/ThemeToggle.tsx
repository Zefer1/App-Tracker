import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="btn btn-primary fixed top-4 right-4"
      onClick={toggleTheme}
    >
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
}
