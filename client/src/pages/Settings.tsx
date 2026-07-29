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
  
  async function HandleLogout () {
      const url = 'http://localhost:3000/api/auth/logout';

      try {
        const response = await fetch(url, {
          method: 'POST',
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
    <div>
      <p>{erro}</p>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <form onSubmit={HandleSubmit}>
        <input placeholder="Name" className="border rounded px-2 py-1" value = {name} onChange={e => setName(e.target.value)}/>
        <input placeholder="Password" type="password" className="border rounded px-2 py-1" value = {password} onChange={e => setPassword(e.target.value)}/>
        <input placeholder="Confirmar Password" type="password" className="border rounded px-2 py-1" value = {passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
        <button className="border rounded px-2 py-1" type="submit">Guardar alterações</button>
      </form>
      <form onSubmit={HandleDelete}>
        <p>Preencha os campos para apagar a sua conta.</p>
        <input placeholder="Password" type="password" className="border rounded px-2 py-1" value = {deleteUserPassword} onChange={e => setDeleteUserPassword(e.target.value)}/>
        <button className="border rounded px-2 py-1" type="submit">Apagar conta</button>
      </form>
      <button className="border rounded px-2 py-1" onClick={HandleLogout}>Logout</button>
    </div>
  )
}
