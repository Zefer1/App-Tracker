import { useState } from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="flex flex-col gap-4 bg-white p-8 shadow-md rounded-2xl" onSubmit={HandleSubmit}>
       <h1 className="text-2xl font-bold text-center">Regista-te aqui</h1> 
      <input placeholder="Email" className="border rounded-md px-2 py-1" value = {email} onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Nome" className="border rounded-md px-2 py-1" value = {name} onChange={e => setName(e.target.value)}/>
      <input placeholder="Password" type="password" className="border rounded-md px-2 py-1" value = {password} onChange={e => setPassword(e.target.value)}/>
      <input placeholder="Confirmar Password" type="password" className="border rounded-md px-2 py-1" value = {passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
      <p className="text-red-500">{erro}</p>
      <button className="border rounded-md px-2 py-1 bg-blue-400 text-white cursor-pointer hover:bg-blue-500 hover:text-black" type="submit">Registar</button>
      <p className="text-sm text-center">
  Já tens conta?{' '}
  <Link to="/login" className="text-blue-600 hover:underline">
    Faz o login aqui!
  </Link>
</p>
    </form>
    </div>
  )
}
