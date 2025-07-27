import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  CalendarIcon,
  BellIcon,
  SettingsIcon,
  ListTodoIcon,
  UsersIcon,
  BriefcaseIcon,
  DollarSignIcon,
  StickyNoteIcon,
  ImageIcon,
  PlusCircleIcon,
  ClockIcon,
  CheckCircleIcon,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ wedding_date: "", budget: 0 });

  // Ajouts nécessaires
  const [tasks, setTasks] = useState([]);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [inspirations, setInspirations] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      router.push("/");
      return;
    }
    setUser(localUser);

    fetch("/api/weddings")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((w) => w.created_by === localUser.id);
        setWedding(found || null);
        if (found) {
          setForm({
            wedding_date: found.wedding_date?.substring(0, 10),
            budget: found.budget,
          });

          // 🔁 Appels complémentaires
          fetch(`/api/weddings/${found.id}/tasks`)
            .then((res) => res.json())
            .then(setTasks);

          fetch(`/api/weddings/${found.id}/budget/spent`)
            .then((res) => res.json())
            .then((data) => setBudgetSpent(data.spent || 0));

          fetch(`/api/weddings/${found.id}/guests/confirmed`)
            .then((res) => res.json())
            .then((data) => setConfirmedGuests(data.count || 0));

          fetch(`/api/weddings/${found.id}/inspirations`)
            .then((res) => res.json())
            .then(setInspirations);
        }

        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const res = await fetch(`/api/weddings/${wedding.id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setWedding(updated);
      setEditMode(false);
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  if (!wedding) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Aucun mariage trouvé</h1>
        <p>Souhaitez-vous en créer un ?</p>
        <a
          href="/create-wedding"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
        >
          Créer un mariage
        </a>
      </div>
    );
  }

  const weddingDate: Date = new Date(wedding.wedding_date);
  const daysUntilWedding = Math.ceil(
  (weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const planningProgress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-700">Velana</div>
        <div className="flex items-center space-x-2">
          <Link href={`/weddings/${wedding.id}/planning`}>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
              <CalendarIcon className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/couple/urgent-tasks">
            <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
              <BellIcon className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/couple/profile">
            <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
              <SettingsIcon className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/couple/profile">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center cursor-pointer">
              <span className="text-sm font-medium">US</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Profil</h2>
          {user && (	
            <div className="text-sm space-y-2 mb-6">
              <p>
                <strong>Nom :</strong> {user.name || "Inconnu"}
              </p>
              <p>
                <strong>Email :</strong> {user.email || "Non renseigné"}
              </p>
            </div>
          )}
          <nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
            <Link href={`/weddings/${wedding.id}/tasks`} className="text-black hover:underline block">
              <ListTodoIcon className="inline-block w-5 h-5 mr-2" /> Tâches
            </Link>
            <Link href={`/weddings/${wedding.id}/guests`} className="text-black hover:underline block">
              <UsersIcon className="inline-block w-5 h-5 mr-2" /> Invités
            </Link>
            <Link href={`/weddings/${wedding.id}/vendors`} className="text-black hover:underline block">
              <BriefcaseIcon className="inline-block w-5 h-5 mr-2" /> Prestataires
            </Link>
            <Link href={`/weddings/${wedding.id}/budget`} className="text-black hover:underline block">
              <DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget
            </Link>
            <Link href={`/weddings/${wedding.id}/notes`} className="text-black hover:underline block">
              <StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes
            </Link>
            <Link href={`/weddings/${wedding.id}/logistics`} className="text-black hover:underline block">
              <ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistiques
            </Link>
          </nav>

          {/* Quick actions */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold mb-2">⚡ Actions rapides</h3>
            <nav className="space-y-2 text-sm">
              <Link href={`/weddings/${wedding.id}/tasks/new`} className="flex items-center gap-2 text-black hover:underline">
                <PlusCircleIcon className="w-4 h-4" /> Ajouter une tâche
              </Link>
              <Link href={`/weddings/${wedding.id}/guests/new`} className="flex items-center gap-2 text-black hover:underline">
                <PlusCircleIcon className="w-4 h-4" /> Ajouter un invité
              </Link>
              <Link href={`/weddings/${wedding.id}/budget/new`} className="flex items-center gap-2 text-black hover:underline">
                <PlusCircleIcon className="w-4 h-4" /> Ajouter une dépense
              </Link>
              <Link href={`/weddings/${wedding.id}/inspirations/new`} className="flex items-center gap-2 text-black hover:underline">
                <PlusCircleIcon className="w-4 h-4" /> Ajouter une inspiration
              </Link>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">	
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold">Mariage de {wedding.couple_name}</h1>
            <p className="mt-2 text-gray-700"><strong>Date :</strong> {new Date(wedding.wedding_date).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Budget :</strong> {wedding.budget} €</p>
			<button className="flex items-center gap-2 text-black hover:underline" onClick={() => setEditMode(true)}>
              Modifier
            </button>

            {editMode && (
              <div className="bg-white border rounded p-4 mt-4 shadow-md max-w-md">
                <h2 className="text-lg font-semibold mb-2">Modifier le mariage</h2>
                <input
                  type="date"
                  name="wedding_date"
                  value={form.wedding_date}
                  onChange={handleChange}
                  className="w-full border p-2 mb-3 rounded"
                />
                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full border p-2 mb-3 rounded"
                  placeholder="Budget"
                />
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdate}>
                    Enregistrer
                  </button>
                  <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* INDICATEURS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="p-4 bg-white border border-gray-200 shadow rounded-lg flex items-center gap-4">
              <div className="bg-gray-100 p-2 rounded-full"><ClockIcon className="h-5 w-5 text-gray-600" /></div>
              <div><p className="font-bold">Jours restants</p><p>{daysUntilWedding} jours</p></div>
            </div>
            <div className="p-4 bg-white border border-gray-200 shadow rounded-lg flex items-center gap-4">
              <div className="bg-gray-100 p-2 rounded-full"><CheckCircleIcon className="h-5 w-5 text-gray-600" /></div>
              <div><p className="font-bold">Tâches complètes</p><p>{completedTasks} / {totalTasks}</p></div>
            </div>
            <div className="p-4 bg-white border border-gray-200 shadow rounded-lg flex items-center gap-4">
              <div className="bg-gray-100 p-2 rounded-full"><DollarSignIcon className="h-5 w-5 text-gray-600" /></div>
              <div><p className="font-bold">Budget dépensé</p><p>{budgetSpent} €</p></div>
            </div>
            <div className="p-4 bg-white border border-gray-200 shadow rounded-lg flex items-center gap-4">
              <div className="bg-gray-100 p-2 rounded-full"><UsersIcon className="h-5 w-5 text-gray-600" /></div>
              <div><p className="font-bold">Invités confirmés</p><p>{confirmedGuests}</p></div>
            </div>
          </div>

          {/* Prochaines tâches */}
          <div className="p-4 bg-white border border-gray-200 shadow rounded-lg mb-6">
            <p className="font-bold">Prochaines Tâches</p>
            <ul className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <li key={task.id}>
                  <Link href={`/weddings/${wedding.id}/tasks`} className="text-blue-600 underline">{task.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Planning */}
          <div className="p-4 bg-white border border-gray-200 shadow rounded-lg mb-6">
            <p className="font-bold">Progression du Planning</p>
            <p>{planningProgress}% complété</p>
          </div>

          {/* Inspirations */}
          <div className="p-4 bg-white border border-gray-200 shadow rounded-lg mb-6">
            <p className="font-bold">Inspirations</p>
            <div className="grid grid-cols-3 gap-2">
              {inspirations.slice(0, 6).map((img, i) => (
                <img key={i} src={img.url} alt={`Inspiration ${i}`} className="w-full h-auto object-cover rounded-md" />
              ))}
            </div>
            <Link href={`/weddings/${wedding.id}/inspirations`} className="flex items-center gap-2 text-black hover:underline">
              Voir toutes les inspirations
            </Link>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>
    </div>
  );
}
