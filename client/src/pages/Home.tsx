import { Link } from "react-router";
import ThemeToggle from "../components/ThemeToggle";

const features = [
  {
    icon: "📋",
    title: "Acompanha cada candidatura",
    text: "Vê de relance em que estado está cada candidatura, da submissão à resposta final.",
  },
  {
    icon: "✏️",
    title: "Gestão simples",
    text: "Cria, edita e remove candidaturas em segundos, sem complicações.",
  },
  {
    icon: "🔒",
    title: "Autenticação segura",
    text: "Os teus dados protegidos com autenticação baseada em JWT.",
  },
  {
    icon: "📱",
    title: "Interface responsiva",
    text: "Usa a aplicação confortavelmente no telemóvel, tablet ou computador.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <nav className="flex items-center justify-between px-6 py-4">
        <span className="text-xl font-bold">App Tracker</span>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Registar
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <section className="flex flex-col items-center text-center gap-6 px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold max-w-2xl">
          Organiza as tuas candidaturas a emprego num só lugar
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Regista, acompanha e atualiza o estado de cada candidatura sem
          perder o fio à meada.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/register" className="btn btn-primary">
            Regista-te agora
          </Link>
          <Link to="/login" className="btn btn-primary">
            Já tenho conta
          </Link>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="card items-center text-center">
              <span className="text-3xl">{feature.icon}</span>
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center text-center gap-4 px-6 py-16">
        <h2 className="text-2xl font-semibold">
          Pronto para simplificar a tua procura de emprego?
        </h2>
        <Link to="/register" className="btn btn-primary">
          Criar conta 
        </Link>
      </section>
    </div>
  );
}
