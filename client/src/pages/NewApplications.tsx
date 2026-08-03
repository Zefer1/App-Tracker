import { useState } from "react"
import { useNavigate } from "react-router";
import { API_URL } from "../config/api";


export default function NewApplication() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('SEM_RESPOSTA');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  async function HandleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!company || !position) {setErro('Tem que preencher os campos obrigatórios!');
      return;
    }

    const url = `${API_URL}/api/applications`;

  try {
    const response = await fetch(url, {
      method: 'POST',
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


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form className="card" onSubmit={HandleSubmit}>
        <h1 className="text-2xl font-bold text-center">Regista uma nova candidatura aqui.</h1>
        <input  placeholder="Empresa" className="input-field" value = {company} onChange={e => setCompany(e.target.value)}/>
        <input  placeholder="Vaga" className="input-field" value = {position} onChange={e => setPosition(e.target.value)}/>
        <input  placeholder="Link" className="input-field" value = {link} onChange={e => setLink(e.target.value)}/>
        <input  placeholder="Observações" className="input-field" value = {notes} onChange={e => setNotes(e.target.value)}/>
        <label>Escolhe o estado atual da candidatura.</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="input-field">
          <option value="SEM_RESPOSTA">Sem resposta</option>
          <option value="ENTREVISTA">Entrevista</option>
          <option value="OFERTA">Oferta</option>
          <option value="RECUSADO">Recusado</option>
        </select>
        {erro && <p className="text-red-500 dark:text-red-400">{erro}</p>}
        <button className="btn btn-primary" type="submit">Criar candidatura</button>
      </form>
    </div>
  )
}
