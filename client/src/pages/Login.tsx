import { useState } from "react"
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = 'http://localhost:3000/api/auth/login';

    try {
      const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
  }, 
  body: JSON.stringify({ email, password }), 
  credentials: "include",
});

if(response.ok) {
  navigate('/applications')
} else {
  setErro('Password ou email invalido.')
}

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <form onSubmit={HandleSubmit}>
      <input placeholder="Email" className="border rounded px-2 py-1" value = {email} onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Password" type="password" className="border rounded px-2 py-1" value = {password} onChange={e => setPassword(e.target.value)}/>
      {erro && <p>{erro}</p>}
      <button className="border rounded px-2 py-1" type="submit">Login</button>
    </form>
    </div>
  )
}
