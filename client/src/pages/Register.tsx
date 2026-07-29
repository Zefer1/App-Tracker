import { useState } from "react"
import { useNavigate } from "react-router";

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(password !== passwordConfirmation) {setErro('Password tem que ser igual á confirmação da password'); 
    return;
    } 

    const url = 'http://localhost:3000/api/users';

    try {
      const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
  }, 
  body: JSON.stringify({ email, password, name, passwordConfirmation }), 
  credentials: "include"
});


if(response.ok) {
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
      <form onSubmit={HandleSubmit}>
      <input placeholder="Email" className="border rounded px-2 py-1" value = {email} onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Name" className="border rounded px-2 py-1" value = {name} onChange={e => setName(e.target.value)}/>
      <input placeholder="Password" type="password" className="border rounded px-2 py-1" value = {password} onChange={e => setPassword(e.target.value)}/>
      <input placeholder="Confirmar Password" type="password" className="border rounded px-2 py-1" value = {passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
      {erro && <p>{erro}</p>}
      <button className="border rounded px-2 py-1" type="submit">Registar</button>
    </form>
    </div>
  )
}
