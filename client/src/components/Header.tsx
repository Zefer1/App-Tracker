import { Link, useNavigate, } from "react-router"
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { API_URL } from "../config/api";



export default function Header() {
    const [erro, setErro] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

     async function HandleLogout () {
      const url = `${API_URL}/api/auth/logout`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: "include"

        });
        if(response.ok){
  navigate('/login')
} else {
  const data = await response.json();
  setErro(data.error)
}
      } catch (error) {
        console.log(error)
        setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
      }

  }

    return (
        <div className="w-full bg-gray-300 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex items-center justify-between p-4">
            <button
              className="btn btn-primary sm:hidden"
              onClick={() => setMenuOpen(open => !open)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
            >
              Menu
            </button>

            <div className="hidden sm:flex gap-4">
              <Link className="btn btn-primary" to="/settings">Definições</Link>
              <Link className="btn btn-primary" to="/applications">Candidaturas</Link>
              <Link className="btn btn-primary" to="/applications/new">Nova candidatura</Link>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <ThemeToggle />
              <button className="btn btn-primary" onClick={HandleLogout}>Logout</button>
              <p className="text-red-500 dark:text-red-400">{erro}</p>
            </div>
          </div>

          {menuOpen && (
            <div className="flex flex-col gap-2 p-4 pt-0 sm:hidden">
              <Link className="btn btn-primary" to="/settings" onClick={() => setMenuOpen(false)}>Definições</Link>
              <Link className="btn btn-primary" to="/applications" onClick={() => setMenuOpen(false)}>Candidaturas</Link>
              <Link className="btn btn-primary" to="/applications/new" onClick={() => setMenuOpen(false)}>Nova candidatura</Link>
              <ThemeToggle />
              <button className="btn btn-primary" onClick={HandleLogout}>Logout</button>
              {erro && <p className="text-red-500 dark:text-red-400">{erro}</p>}
            </div>
          )}
        </div>
    )
}