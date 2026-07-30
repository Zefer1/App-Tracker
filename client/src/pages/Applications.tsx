import { useEffect, useState } from "react"
import type { Application } from "../types/types";
import { Link } from "react-router";

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fecthApplications() {
      try {
        const response = await fetch('http://localhost:3000/api/applications', {credentials: 'include'}); 
        if(response.ok){
        const data = await response.json()
        setApplications(data)
        } else {
          const data = await response.json()
          setErro(data.error)
        }
      } catch (error) {
        console.log(error)
        setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
      }
    }
    fecthApplications();
  },[])

  async function HandleDeleteApplication (id: string) {
    const url = `http://localhost:3000/api/applications/${id}`
    try {
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include"});
        if(response.ok){
          setApplications(applications.filter(app => app.id !== id));
        } else {
          const data = await response.json()
          setErro(data.error)
        }
    } catch (error) {
      console.log(error)
      setErro('Não foi possivel conectar ao servidor.')
    }
  }

  const listApplications = applications.map(application => 
    <li key={application.id}>
      <Link to={`/applications/${application.id}/edit`}>Editar</Link>
      <button onClick={() => {HandleDeleteApplication(application.id)}}>Apagar Candidatura</button>
      <h2>{application.company}</h2>
      <p>{application.status}</p>
      <p>{application.position}</p>
    </li>
  );

  return (
    
    <div>
      <p>{erro}</p>
      <ul>{listApplications}</ul>
    </div>
  )
}
