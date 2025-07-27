import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PencilIcon, TrashIcon, CalendarIcon, BellIcon, SettingsIcon, ListTodoIcon, ArrowLeftIcon, UsersIcon, DollarSignIcon, StickyNoteIcon, ImageIcon } from "lucide-react";

export default function TransportPage() {
  const router = useRouter();
  const { id } = router.query;

  const [transports, setTransports] = useState([]);
  const [wedding, setWedding] = useState(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    type: "",
    description: "",
    due_date: "",
    status: "À faire",
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!localUser) router.push("/");
    setUser(localUser);
    if (id) {
      fetchWedding();
      fetchTransports();
    }
  }, [id]);

  const fetchWedding = async () => {
    const res = await fetch(`/api/weddings/${id}`);
    const data = await res.json();
    setWedding(data);
  };

  const fetchTransports = async () => {
    const res = await fetch(`/api/weddings/${id}/logistics/transport`);
    const data = await res.json();
    setTransports(Array.isArray(data) ? data : data.transports || []);
  };

  const openModal = (transport = null) => {
    setEditing(transport);
    setForm(
      transport
        ? {
            type: transport.type,
            description: transport.description ?? "",
            due_date: transport.due_date?.substring(0, 10) || "",
            status: transport.status,
          }
        : {
            type: "",
            description: "",
            due_date: "",
            status: "À faire",
          }
    );
    setModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/weddings/${id}/logistics/transport?transportId=${editing.id}`
      : `/api/weddings/${id}/logistics/transport`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setModal(false);
      fetchTransports();
    } else {
      alert("Erreur lors de la sauvegarde.");
    }
  };

  const handleDelete = async (transportId) => {
    if (!confirm("Supprimer ce transport ?")) return;
    await fetch(`/api/weddings/${id}/logistics/transport?transportId=${transportId}`, { method: "DELETE" });
    fetchTransports();
  };

  if (!wedding || !user) return <p className="p-6">Chargement...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-3xl font-bold text-gray-700">Velana</div>
        <div className="flex items-center space-x-2">
          <Link href="/couple/planning"><CalendarIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/urgent-tasks"><BellIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/profile"><SettingsIcon className="h-5 w-5 text-gray-500" /></Link>
          <div className="w-8 h-8 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center">US</div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-1">{user?.role === "organisateur" ? "Organisateur" : "Couple"}</h2>
          <p><strong>Nom :</strong> {user.name || "Inconnu"}</p>
          <p><strong>Email :</strong> {user.email || "Non renseigné"}</p>
          <p className="text-sm text-gray-500 mb-4">Rôle : {user?.role}</p>
          <nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
            <Link href={user?.role === "organisateur" ? "/organizer/dashboard" : "/weddings"} className="text-black hover:underline block"><ArrowLeftIcon className="inline-block w-5 h-5 mr-2" /> Tableau de bord</Link>
            <Link href={`/weddings/${id}/tasks`} className="text-black hover:underline block"><ListTodoIcon className="inline-block w-5 h-5 mr-2" /> Tâches</Link>
            <Link href={`/weddings/${id}/guests`} className="text-black hover:underline block"><UsersIcon className="inline-block w-5 h-5 mr-2" /> Invités</Link>
            <Link href={`/weddings/${id}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Transports – Mariage de {wedding.couple_name}</h1>
			<div className="flex gap-2 flex-wrap mb-6">
            <a href={`/weddings/${id}/logistics/meal`} className="px-3 py-1 bg-gray-100 text-sm rounded">Repas</a>
            <a href={`/weddings/${id}/logistics/transport`} className="px-3 py-1 bg-gray-200 text-sm rounded">Transport</a>
            <a href={`/weddings/${id}/logistics/accommodation`} className="px-3 py-1 bg-gray-100 text-sm rounded">Hébergement</a>
            <a href={`/weddings/${id}/logistics/ceremonies`} className="px-3 py-1 bg-gray-100 text-sm rounded">Cérémonies</a>
            <a href={`/weddings/${id}/logistics/animations`} className="px-3 py-1 bg-gray-100 text-sm rounded font-semibold">Animations</a>
            <a href={`/weddings/${id}/logistics/outfits`} className="px-3 py-1 bg-gray-100 text-sm rounded">Tenues</a>
            <a href={`/weddings/${id}/logistics/others`} className="px-3 py-1 bg-gray-100 text-sm rounded">Autres</a>
          </div>
          <button onClick={() => openModal()} className="mb-4 bg-gray-600 text-white px-4 py-2 rounded">
            Ajouter un transport
          </button>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.isArray(transports) && transports.map((t) => (
              <li key={t.id} className="bg-white border p-4 rounded shadow">
                <h2 className="font-semibold">{t.type}</h2>
                <p className="text-sm text-gray-600">{t.description || "Aucune description."}</p>
                <p className="text-sm">Date cible : {t.due_date ? new Date(t.due_date).toLocaleDateString() : "Non définie"}</p>
                <p className="text-sm">Statut : {t.status}</p>
                <div className="flex gap-4 mt-2">
                  <button onClick={() => openModal(t)} className="text-blue-600" title="Modifier">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-600" title="Supprimer">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? "Modifier" : "Nouveau"} transport</h2>
            
			<input name="type" value={form.type} onChange={handleChange} placeholder="Type" required className="w-full border p-2 mb-3 rounded" />
            <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="w-full border p-2 mb-3 rounded" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 mb-3 rounded" />
            <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 mb-4 rounded">
              <option>À faire</option>
              <option>Fait</option>
              <option>Abandonné</option>
            </select>
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
              <button type="button" onClick={() => setModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}