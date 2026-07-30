import { Link, useNavigate, } from "react-router"
import { useState } from "react";



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
      }

  }

    return (
        <div>
            <Link to="/settings">Definições</Link>
            <Link to="/applications">Candidaturas</Link>
            <button className="border rounded px-2 py-1" onClick={HandleLogout}>Logout</button>
            <p>{erro}</p>
        </div>
    )
}