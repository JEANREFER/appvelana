import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  CalendarIcon,
  BellIcon,
  SettingsIcon,
  ListTodoIcon,
  ArrowLeftIcon,
  UsersIcon,
  BriefcaseIcon,
  DollarSignIcon,
  StickyNoteIcon,
  ImageIcon,
  PlusCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon
} from "lucide-react";

const taskTypes = ["Salle", "Traiteur", "Photographe", "Décoration", "Voiture", "BabySitter"];
const taskStatuses = ["À faire", "Fait", "Abandonné"];

export default function TasksPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tasks, setTasks] = useState([]);
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ type: "", due_date: "", description: "", status: "À faire" });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      router.push("/");
      return;
    }
    setUser(localUser);

    if (id) {
      fetch(`/api/weddings/${id}/tasks`).then(res => res.json()).then(setTasks);
      fetch(`/api/weddings/${id}`).then(res => res.json()).then(setWedding);
    }
  }, [id]);

  const openModal = (task = null) => {
    if (task) {
      setEditing(task);
      setForm({
        type: task.type,
        due_date: task.due_date?.substring(0, 10),
        description: task.description ?? "",
        status: task.status
      });
    } else {
      setEditing(null);
      setForm({ type: "", due_date: "", description: "", status: "À faire" });
    }
    setModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/weddings/${id}/tasks/${editing.id}` : `/api/weddings/${id}/tasks`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const updatedTasks = await fetch(`/api/weddings/${id}/tasks`).then(res => res.json());
      setTasks(updatedTasks);
      setModal(false);
    }
  };

  const handleDuplicate = async (task) => {
    await fetch(`/api/weddings/${id}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...task,
        description: task.description || "",
        due_date: task.due_date?.substring(0, 10)
      })
    });
    const refreshed = await fetch(`/api/weddings/${id}/tasks`).then(res => res.json());
    setTasks(refreshed);
  };

  if (!wedding || !user) return <p className="p-6">Chargement du mariage...</p>;

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const upcomingTasks = tasks.filter(t => t.status === "À faire" && new Date(t.due_date) >= now);
  const overdueTasks = tasks.filter(t => t.status === "À faire" && new Date(t.due_date) < now);
  const completedTasks = tasks.filter(t => t.status === "Fait");

  const weddingDate = new Date(wedding.wedding_date);
  const diffTime = weddingDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeksLeft = Math.floor(daysLeft / 7);
  const monthsLeft = Math.floor(daysLeft / 30);

  const dashboardLink = user?.type === "organisateur" ? "/organizer/dashboard" : "/weddings";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-700">Velana</div>
        <div className="flex items-center space-x-2">
          <Link href='/weddings/${id}/planning'><CalendarIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/weddings/${id}/urgent-tasks"><BellIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/weddings/${id}/myprofile"><SettingsIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/profile">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">US</div>
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
			                <p>
                <strong>Role :</strong> {user.role || "Non renseigné"}
              </p>
            </div>
          )}<nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
            {user && (
  <Link
    href={user.role === "organisateur" ? "/organizer/dashboard" : "/weddings"}
    className="text-black hover:underline block"
  >
    <ArrowLeftIcon className="inline-block w-5 h-5 mr-2" />
    Tableau de bord
  </Link>
)}<Link href={`/weddings/${id}/guests`} className="text-black hover:underline block"><UsersIcon className="inline-block w-5 h-5 mr-2" /> Invités</Link>
            <Link href={`/weddings/${id}/vendors`} className="text-black hover:underline block"><BriefcaseIcon className="inline-block w-5 h-5 mr-2" /> Prestataires</Link>
            <Link href={`/weddings/${id}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
		  {/* Quick actions */}
          {/*<div className="mt-8 pt-4 border-t border-gray-200">
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
          </div>*/}
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Tâches de {wedding.couple_name}</h1>
            <button onClick={() => openModal()} className="bg-gray-600 text-white px-4 py-2 rounded">+ Ajouter une tâche</button>
          </div>

          <div className="mb-6 p-4 bg-white border border-gray-200 shadow rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold mb-1">⏳ Temps avant le mariage</h2>
              <p className="text-sm text-muted-foreground">Le grand jour approche!</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{monthsLeft}</div>
                <div className="text-xs text-muted-foreground">Mois</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{weeksLeft}</div>
                <div className="text-xs text-muted-foreground">Semaines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{daysLeft}</div>
                <div className="text-xs text-muted-foreground">Jours</div>
              </div>
            </div>
          </div>

          <Section title="⚠️ Tâches en retard" tasks={overdueTasks} onEdit={openModal} onDuplicate={handleDuplicate} />
          <Section title="📅 Tâches à venir" tasks={upcomingTasks} onEdit={openModal} onDuplicate={handleDuplicate} />
          <Section title="✅ Tâches faites" tasks={completedTasks} onEdit={openModal} onDuplicate={handleDuplicate} />

          {modal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">{editing ? "Modifier la tâche" : "Nouvelle tâche"}</h2>
                <select name="type" value={form.type} onChange={handleChange} required className="w-full border p-2 mb-3 rounded">
                  <option value="">-- Type de tâche --</option>
                  {taskTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
                </select>
                <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="w-full border p-2 mb-3 rounded" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 mb-3 rounded" />
                <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 mb-4 rounded">
                  {taskStatuses.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
                  <button type="button" onClick={() => setModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
	  

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>
    </div>
  );
}

function Section({ title, tasks, onEdit, onDuplicate }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">Aucune tâche.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white border border-gray-200 p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-1">{task.type}</h3>
              <p className="text-sm text-gray-700 mb-1">{task.description || "Aucune description."}</p>
              <p className="text-sm">Échéance : {task.due_date ? new Date(task.due_date).toLocaleDateString() : "Non définie"}</p>
              <p className="text-sm mb-2">Statut : {task.status}</p>
              <div className="flex gap-3 text-sm">
                <button onClick={() => onEdit(task)} className="text-blue-600 underline">Modifier</button>
                <button onClick={() => onDuplicate(task)} className="text-green-600 underline">Dupliquer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
