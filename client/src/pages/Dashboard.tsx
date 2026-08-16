import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

const statusLabels = {
  SEM_RESPOSTA: "Sem resposta",
  ENTREVISTA: "Entrevista",
  OFERTA: "Oferta",
  RECUSADO: "Recusado",
};

type Stats = {
  counts: Record<string, number>;
  avgResponseDays: number | null;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`${API_URL}/api/applications/stats`, {credentials: 'include'});
        if(response.ok){
          const data = await response.json();
          setStats(data);
        } else {
          const data = await response.json();
          setErro(data.error);
        }
      } catch (error) {
        console.log(error)
        setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const total = stats ? Object.values(stats.counts).reduce((sum, n) => sum + n, 0) : 0;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-red-500 dark:text-red-400">{erro}</p>
      {stats && (
        <>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mb-6">
            {Object.entries(statusLabels).map(([value, label]) => (
              <div className="card" key={value}>
                <p className="text-sm">{label}</p>
                <p className="text-2xl font-bold">{stats.counts[value] ?? 0}</p>
              </div>
            ))}
          </div>

          <div className="card mb-4">
            <p className="text-sm">Total de candidaturas</p>
            <p className="text-2xl font-bold">{total}</p>
          </div>

          <div className="card">
            <p className="text-sm">Tempo médio até resposta</p>
            <p className="text-2xl font-bold">
              {stats.avgResponseDays !== null ? `${stats.avgResponseDays} dias` : 'Sem dados ainda'}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
