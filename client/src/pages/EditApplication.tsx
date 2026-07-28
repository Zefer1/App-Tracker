import { useParams } from "react-router";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router";


export default function EditApplication() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('SEM_RESPOSTA');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fecthApplications() {
      try {
        const response = await fetch(`http://localhost:3000/api/applications/${id}`, {credentials: 'include'}); 
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
      }
    }
    fecthApplications();
  },[id])

  async function HandleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!company || !position) {setErro('Tem que preencher os campos obrigatórios!');
      return;
    }

    const url = `http://localhost:3000/api/applications/${id}`;

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
        <button className="border rounded px-2 py-1" type="submit">Guardar alterações</button>
      </form>
   </div>
  )
}
