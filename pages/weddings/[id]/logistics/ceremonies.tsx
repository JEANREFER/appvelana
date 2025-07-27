// 📁 pages/weddings/[id]/ceremonies.tsx
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
  DollarSignIcon,
  StickyNoteIcon,
  ImageIcon,
  PencilIcon,
  TrashIcon
} from "lucide-react";

export default function CeremoniesPage() {
  const router = useRouter();
  const { id } = router.query;
  const [ceremonies, setCeremonies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", date: "", location: "" });
  const [editing, setEditing] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);
    if (id) {
      fetchWedding();
      fetchCeremonies();
    }
  }, [id]);

  const fetchWedding = async () => {
    const res = await fetch(`/api/weddings/${id}`);
    if (res.ok) {
      const data = await res.json();
      setWedding(data);
    }
  };

  const fetchCeremonies = async () => {
    const res = await fetch(`/api/weddings/${id}/logistics/ceremony`);
    if (res.ok) {
      const data = await res.json();
      setCeremonies(data);
      setSelected(data[0] || null);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/weddings/${id}/logistics/ceremony/${editing.id}`
      : `/api/weddings/${id}/logistics/ceremony`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, weddingId: parseInt(Array.isArray(id) ? id[0] : id) }),
    });

    if (res.ok) {
      fetchCeremonies();
      setForm({ name: "", date: "", location: "" });
      setEditing(null);
      setModal(false);
    }
  };

  const handleEdit = (ceremony) => {
    setForm({
      name: ceremony.name,
      date: ceremony.date?.substring(0, 10) || "",
      location: ceremony.location,
    });
    setEditing(ceremony);
    setModal(true);
  };

  const handleDelete = async (ceremonyId) => {
    if (!confirm("Supprimer cette cérémonie ?")) return;
    const res = await fetch(`/api/weddings/${id}/logistics/ceremony/${ceremonyId}`, { method: "DELETE" });
    if (res.ok) fetchCeremonies();
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
          <h1 className="text-2xl font-bold mb-4">Cérémonies – Mariage de {wedding.couple_name}</h1>

          <div className="flex gap-2 flex-wrap mb-6">
            <a href={`/weddings/${id}/logistics/meal`} className="px-3 py-1 bg-gray-100 text-sm rounded">Repas</a>
            <a href={`/weddings/${id}/logistics/transport`} className="px-3 py-1 bg-gray-100 text-sm rounded">Transport</a>
            <a href={`/weddings/${id}/logistics/accommodation`} className="px-3 py-1 bg-gray-100 text-sm rounded">Hébergement</a>
            <a href={`/weddings/${id}/logistics/ceremonies`} className="px-3 py-1 bg-gray-200 text-sm rounded font-semibold">Cérémonies</a>
            <a href={`/weddings/${id}/logistics/animations`} className="px-3 py-1 bg-gray-100 text-sm rounded">Animations</a>
            <a href={`/weddings/${id}/logistics/outfits`} className="px-3 py-1 bg-gray-100 text-sm rounded">Tenues</a>
            <a href={`/weddings/${id}/logistics/others`} className="px-3 py-1 bg-gray-100 text-sm rounded">Autres</a>
          </div>

          <button className="mb-4 bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setModal(true)}>
            Ajouter une cérémonie
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-white shadow overflow-y-auto max-h-[500px]">
              <h2 className="text-lg font-semibold mb-3">Liste des cérémonies</h2>
              <ul className="divide-y divide-gray-200">
                {ceremonies.map((ceremony) => (
                  <li
                    key={ceremony.id}
                    onClick={() => setSelected(ceremony)}
                    className={`p-2 cursor-pointer rounded hover:bg-gray-100 ${selected?.id === ceremony.id ? "bg-gray-50 border border-blue-300" : ""}`}
                  >
                    <p className="text-sm font-semibold">{ceremony.name}</p>
                    <p className="text-sm text-gray-600 truncate">{ceremony.location}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border rounded-lg p-4 bg-white shadow">
              <h2 className="text-lg font-semibold mb-3">Détail de la cérémonie</h2>
              {selected ? (
                <>
                  <p className="text-sm text-gray-600 mb-2"><strong>Date :</strong> {selected.date ? new Date(selected.date).toLocaleDateString() : "Non définie"}</p>
                  <p className="text-base mb-2 whitespace-pre-line"><strong>Lieu :</strong> {selected.location}</p>
                  <p className="text-base mb-4 whitespace-pre-line"><strong>Nom :</strong> {selected.name}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(selected)}><PencilIcon className="w-5 h-5 text-blue-600 hover:text-blue-800" /></button>
                    <button onClick={() => handleDelete(selected.id)}><TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" /></button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Sélectionnez une cérémonie à gauche pour voir ses détails.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? "Modifier" : "Ajouter"} une cérémonie</h2>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" required className="w-full border p-2 mb-3 rounded" />
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border p-2 mb-3 rounded" />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Lieu" className="w-full border p-2 mb-3 rounded" />
            <div className="flex justify-between">
              <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded">Enregistrer</button>
              <button type="button" onClick={() => setModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}