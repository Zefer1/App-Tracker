import { useParams } from "react-router";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { API_URL } from "../config/api";


export default function EditApplication() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('SEM_RESPOSTA');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fecthApplications() {
      try {
        const response = await fetch(`${API_URL}/api/applications/${id}`, {credentials: 'include'});
        if(response.ok){
        const data = await response.json()
        setCompany(data.company);
        setPosition(data.position);
        setStatus(data.status);
        setLink(data.link ?? '');
        setNotes(data.notes ?? '');
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
  },[id]);

  async function HandleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!company || !position) {setErro('Tem que preencher os campos obrigatórios!');
      return;
    }

    const url = `${API_URL}/api/applications/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({company, position, status, link, notes}),
      credentials: "include",
    });

    if(response.ok) {
      navigate('/applications')
    } else {
      const data = await response.json();
      setErro(data.error)
    }

  } catch (error) {
    console.log(error)
    setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
  }

  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <p>A carregar...</p>
      </div>
    )
  }

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <form className="card" onSubmit={HandleSubmit}>
      <h1 className="text-2xl font-bold text-center">Altera a tua candidatura atual aqui.</h1>
        <input placeholder="Company" className="input-field" value = {company} onChange={e => setCompany(e.target.value)}/>
        <input placeholder="Position" className="input-field" value = {position} onChange={e => setPosition(e.target.value)}/>
        <input placeholder="Link" className="input-field" value = {link} onChange={e => setLink(e.target.value)}/>
        <input placeholder="Notes" className="input-field" value = {notes} onChange={e => setNotes(e.target.value)}/>
        <label>Escolhe um estado</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="input-field">
          <option  value="SEM_RESPOSTA">Sem resposta</option>
          <option  value="ENTREVISTA">Entrevista</option>
          <option  value="OFERTA">Oferta</option>
          <option  value="RECUSADO">Recusado</option>
        </select>
        {erro && <p className="text-red-500 dark:text-red-400">{erro}</p>}
        <button className="btn btn-primary" type="submit">Guardar alterações</button>
      </form>
   </div>
  )
}
