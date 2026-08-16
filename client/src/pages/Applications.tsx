import { useEffect, useState } from "react"
import type { Application } from "../types/types";
import { Link } from "react-router";
import { API_URL } from "../config/api";

const statusLabels = {
  SEM_RESPOSTA: "Sem resposta",
  ENTREVISTA: "Entrevista",
  OFERTA: "Oferta",
  RECUSADO: "Recusado",
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [sortBy, setSortBy] = useState('recentes');

  useEffect(() => {
    async function fecthApplications() {
      try {
        const response = await fetch(`${API_URL}/api/applications`, {credentials: 'include'});
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
      } finally {
        setLoading(false)
      }
    }
    fecthApplications();
  },[])

  async function HandleDeleteApplication (id: string) {
    if (!window.confirm("Tens a certeza que queres apagar esta candidatura?")) return;

    const url = `${API_URL}/api/applications/${id}`
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

  const filteredApplications = statusFilter === 'TODOS'
    ? applications
    : applications.filter(app => app.status === statusFilter);

  const visibleApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'empresa') return a.company.localeCompare(b.company);
    if (sortBy === 'antigas') return new Date(a.applied_at).getTime() - new Date(b.applied_at).getTime();
    return new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime();
  });

  const listApplications = visibleApplications.map(application =>
    <li className="card" key={application.id}>
      <h2 className="text-lg font-bold">Empresa: {application.company}</h2>
      <p>Estado: {statusLabels[application.status]}</p>
      <p>Vaga: {application.position}</p>
      <p>Link: {application.link}</p>
      <p>Observações: {application.notes}</p>
      <div className="flex gap-2">
        <Link className="btn btn-primary" to={`/applications/${application.id}/edit`}>Editar</Link>
        <button className="btn btn-danger" onClick={() => {HandleDeleteApplication(application.id)}}>Apagar Candidatura</button>
      </div>
    </li>
  );

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <p className="text-red-500 dark:text-red-400">{erro}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="TODOS">Todos os estados</option>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="recentes">Mais recentes</option>
          <option value="antigas">Mais antigas</option>
          <option value="empresa">Empresa (A-Z)</option>
        </select>
      </div>
      {loading ? (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="card animate-pulse">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            </li>
          ))}
        </ul>
      ) : visibleApplications.length === 0 ? (
        <p>Nenhuma candidatura encontrada.</p>
      ) : (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">{listApplications}</ul>
      )}
    </div>
  )
}
