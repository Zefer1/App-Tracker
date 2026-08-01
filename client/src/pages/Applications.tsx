import { useEffect, useState } from "react"
import type { Application } from "../types/types";
import { Link } from "react-router";

const statusLabels = {
  SEM_RESPOSTA: "Sem resposta",
  ENTREVISTA: "Entrevista",
  OFERTA: "Oferta",
  RECUSADO: "Recusado",
};

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
      setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
    }
  }

  const listApplications = applications.map(application =>
    <li className="card" key={application.id}>
      <h2 className="text-lg font-bold">{application.company}</h2>
      <p>{statusLabels[application.status]}</p>
      <p>{application.position}</p>
      <div className="flex gap-2">
        <Link className="btn btn-primary" to={`/applications/${application.id}/edit`}>Editar</Link>
        <button className="btn btn-danger" onClick={() => {HandleDeleteApplication(application.id)}}>Apagar Candidatura</button>
      </div>
    </li>
  );

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <p className="text-red-500 dark:text-red-400">{erro}</p>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">{listApplications}</ul>
    </div>
  )
}
