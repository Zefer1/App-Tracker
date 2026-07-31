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
  setErro('Password ou email invalido.')
}

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="flex flex-col gap-4 bg-white p-8 shadow-md rounded-2xl" onSubmit={HandleSubmit}>
        <h1 className="text-2xl font-bold text-center">Entrar</h1>
      <input placeholder="Email" className="border rounded-md px-2 py-1" value = {email} onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Password" type="password" className="border rounded-md px-2 py-1" value = {password} onChange={e => setPassword(e.target.value)}/>
       <p className="text-red-500">{erro}</p>
      <button className="border rounded-md px-2 py-1 cursor-pointer hover:bg-blue-500 hover:text-black bg-blue-400 text-white" type="submit">Login</button>
      <p className="text-sm text-center">
  Ainda não tens conta?{' '}
  <Link to="/register" className="text-blue-600 hover:underline">
    Regista-te aqui
  </Link>
</p>
    </form>
    </div>
  )
}
