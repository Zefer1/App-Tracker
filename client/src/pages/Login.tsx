import { useState } from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router";

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
        <h1 className="text-2xl font-bold text-center">Entrar</h1>
      <input placeholder="Email" className="input-field" value = {email} onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Password" type="password" className="input-field" value = {password} onChange={e => setPassword(e.target.value)}/>
       <p className="text-red-500 dark:text-red-400">{erro}</p>
      <button className="btn btn-primary" type="submit">Login</button>
      <p className="text-sm text-center">
  Ainda não tens conta?{' '}
  <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
    Regista-te aqui
  </Link>
</p>
    </form>
    </div>
  )
}
