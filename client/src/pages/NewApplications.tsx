import { useState } from "react"
import { useNavigate } from "react-router";


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

    const url = 'http://localhost:3000/api/applications';

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
  }

  }


  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <input placeholder="Company" className="border rounded px-2 py-1" value = {company} onChange={e => setCompany(e.target.value)}/>
        <input placeholder="Position" className="border rounded px-2 py-1" value = {position} onChange={e => setPosition(e.target.value)}/>
        <input placeholder="Link" className="border rounded px-2 py-1" value = {link} onChange={e => setLink(e.target.value)}/>
        <input placeholder="Notes" className="border rounded px-2 py-1" value = {notes} onChange={e => setNotes(e.target.value)}/>
        <label>Escolhe um estado</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-2 py-1">
          <option value="SEM_RESPOSTA">Sem resposta</option>
          <option value="ENTREVISTA">Entrevista</option>
          <option value="OFERTA">Oferta</option>
          <option value="RECUSADO">Recusado</option>
        </select>
        {erro && <p>{erro}</p>}
        <button className="border rounded px-2 py-1" type="submit">Criar candidatura</button>
      </form>
    </div>
  )
}
