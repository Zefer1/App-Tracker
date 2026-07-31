import { useEffect, useState } from "react"
import type { User } from "../types/types"
import { useNavigate } from "react-router";

export default function Settings() {
const [user, setUser] = useState<User>();
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [passwordConfirmation, setPasswordConfirmation] = useState('');
const [deleteUserPassword, setDeleteUserPassword] = useState('');
const [erro,setErro] = useState('');

const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try{
        const response = await fetch('http://localhost:3000/api/users/me', {credentials: 'include'});
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
        setErro('Algo correu mal. Verifique a conexão á internet e tente de novo');
      }
    }
    fetchUser();
  },[]);

  async function HandleSubmit (e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if(password !== passwordConfirmation) {setErro('Password tem que ser igual á confirmação da password'); 
    return;
    } 

    const payload: { name: string; password?: string } = { name };
      if (password !== '') {
      payload.password = password;
      }

    const url = 'http://localhost:3000/api/users/me';

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
  alert('Alterações gravadas com sucesso.')
} else {
  const data = await response.json();
  setErro(data.error)
}

    } catch (error) {
      console.log(error)
    }

  }
  
  async function HandleDelete (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const url = 'http://localhost:3000/api/users/me';

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
  }
  } 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <h1 className="text-2xl font-bold text-center">Utilizador: {user?.name}</h1>
      <p className="text-sm text-center">{user?.email}</p>
      <p className="text-red-500">{erro}</p>
      <form className="flex flex-col gap-4 bg-white p-8 shadow-md rounded-2xl" onSubmit={HandleSubmit}>
        <input placeholder="Name" className="border rounded-md px-2 py-1" value = {name} onChange={e => setName(e.target.value)}/>
        <input placeholder="Nova password" type="password" className="border rounded-md px-2 py-1" value = {password} onChange={e => setPassword(e.target.value)}/>
        <input placeholder="Confirmar Password" type="password" className="border rounded-md px-2 py-1" value = {passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
        <button className="border rounded-md px-2 py-1 bg-blue-400 text-white cursor-pointer hover:bg-blue-500 hover:text-black" type="submit">Guardar alterações</button>
      </form>
      <form className="flex flex-col gap-4 bg-white p-8 shadow-md rounded-2xl" onSubmit={HandleDelete}>
        <p>Preencha os campos para apagar a sua conta.</p>
        <input placeholder="Password" type="password" className="border rounded-md px-2 py-1" value = {deleteUserPassword} onChange={e => setDeleteUserPassword(e.target.value)}/>
        <button className="border rounded-md px-2 py-1 bg-red-400 text-white cursor-pointer hover:bg-red-500 hover:text-black" type="submit">Apagar conta</button>
      </form>
    </div>
  )
}
