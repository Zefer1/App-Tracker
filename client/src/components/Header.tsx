import { Link, useNavigate, } from "react-router"
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";



export default function Header() {
    const [erro, setErro] = useState('');

    const navigate = useNavigate();
    
     async function HandleLogout () {
      const url = 'http://localhost:3000/api/auth/logout';

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
        <div className="flex w-full justify-between bg-gray-300 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex p-4 gap-4">
            <Link className="btn btn-primary" to="/settings">Definições</Link>
            <Link className="btn btn-primary" to="/applications">Candidaturas</Link>
            <Link className="btn btn-primary" to="/applications/new">Nova candidatura</Link>
          </div>
          <div className="flex p-4 gap-4">
            <ThemeToggle />
            <button className="btn btn-primary" onClick={HandleLogout}>Logout</button>
            <p className="text-red-500 dark:text-red-400">{erro}</p>
          </div>
        </div>
    )
}