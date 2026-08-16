import { useEffect, useState } from "react"
import type { User } from "../types/types"
import { useNavigate } from "react-router";
import { API_URL } from "../config/api";

export default function Settings() {
const [user, setUser] = useState<User>();
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [passwordConfirmation, setPasswordConfirmation] = useState('');
const [deleteUserPassword, setDeleteUserPassword] = useState('');
const [erro,setErro] = useState('');
const [sucesso, setSucesso] = useState('');
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try{
        const response = await fetch(`${API_URL}/api/users/me`, {credentials: 'include'});
        if(response.ok){
          const data = await response.json()
          setUser(data);
          setName(data.name);
        } else {
          const data = await response.json()
          setErro(data.error)
        }
      } catch(error){
        console.log(error)
        setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
      } finally {
        setLoading(false)
      }
    }
    fetchUser();
  },[]);

  async function HandleSubmit (e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setErro('');
      setSucesso('');

      if(password !== passwordConfirmation) {setErro('Password tem que ser igual à confirmação da password!');
    return;
    }

    const payload: { name: string; password?: string } = { name };
      if (password !== '') {
      payload.password = password;
      }

    const url = `${API_URL}/api/users/me`;

    try {
      const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
  }, 
  body: JSON.stringify(payload), 
  credentials: "include"
});


if(response.ok) {
  setSucesso('Alterações gravadas com sucesso.')
} else {
  const data = await response.json();
  setErro(data.error)
}

    } catch (error) {
      console.log(error)
      setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
    }

  }
  
  async function HandleDelete (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const url = `${API_URL}/api/users/me`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({password: deleteUserPassword}),
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
    setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
  }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 gap-4">
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        <div className="card w-full max-w-sm animate-pulse">
          <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 gap-4">
      <h1 className="text-2xl font-bold text-center">Utilizador: {user?.name}</h1>
      <p className="text-sm text-center">{user?.email}</p>
      <p className="text-red-500 dark:text-red-400">{erro}</p>
      <p className="text-green-600 dark:text-green-400">{sucesso}</p>
      <form className="card" onSubmit={HandleSubmit}>
        <input placeholder="Name" className="input-field" value = {name} onChange={e => setName(e.target.value)}/>
        <input placeholder="Nova password" type="password" className="input-field" value = {password} onChange={e => setPassword(e.target.value)}/>
        <input placeholder="Confirmar Password" type="password" className="input-field" value = {passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
        <button className="btn btn-primary" type="submit">Guardar alterações</button>
      </form>
      <form className="card" onSubmit={HandleDelete}>
        <p>Preencha os campos para apagar a sua conta.</p>
        <input placeholder="Password" type="password" className="input-field" value = {deleteUserPassword} onChange={e => setDeleteUserPassword(e.target.value)}/>
        <button className="btn btn-danger" type="submit">Apagar conta</button>
      </form>
    </div>
  )
}
