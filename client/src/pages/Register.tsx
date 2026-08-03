import { useState } from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import { API_URL } from "../config/api";

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(password !== passwordConfirmation) {setErro('Password tem que ser igual à confirmação da password!');
    return;
    }

    const url = `${API_URL}/api/users`;

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
      setErro('Não foi possível ligar ao servidor. Verifica a tua ligação.');
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <form className="card" onSubmit={HandleSubmit}>
       <h1 className="text-2xl font-bold text-center">Regista-te aqui</h1>
      <input placeholder="Email" className="input-field" value = {email} onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Nome" className="input-field" value = {name} onChange={e => setName(e.target.value)}/>
      <input placeholder="Password" type="password" className="input-field" value = {password} onChange={e => setPassword(e.target.value)}/>
      <input placeholder="Confirmar Password" type="password" className="input-field" value = {passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
      <p className="text-red-500 dark:text-red-400">{erro}</p>
      <button className="btn btn-primary" type="submit">Registar</button>
      <p className="text-sm text-center">
  Já tens conta?{' '}
  <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
    Faz o login aqui!
  </Link>
</p>
    </form>
    </div>
  )
}
