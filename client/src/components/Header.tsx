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
        <div className="flex w-full justify-between bg-gray-300">
          <div className="flex p-4 gap-4">
            <Link className="btn btn-primary" to="/settings">Definições</Link>
            <Link className="btn btn-primary" to="/applications">Candidaturas</Link>
            <Link className="btn btn-primary" to="/applications/new">Nova candidatura</Link>
          </div>
          <div className="p-4">
            <button className="btn btn-primary" onClick={HandleLogout}>Logout</button>
            <p>{erro}</p>
          </div>
        </div>
    )
}