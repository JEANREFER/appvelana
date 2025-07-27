// 📁 pages/weddings/[id]/logistics/others.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PencilIcon, TrashIcon, CalendarIcon, BellIcon, SettingsIcon, ListTodoIcon, ArrowLeftIcon, UsersIcon, DollarSignIcon, StickyNoteIcon, ImageIcon } from "lucide-react";

export default function OthersPage() {
  const router = useRouter();
  const { id } = router.query;

  const [others, setOthers] = useState([]);
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    type: "",
    description: "",
    due_date: "",
    status: "À faire",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!localUser) router.push("/");
    setUser(localUser);
    if (id) {
      fetchOthers();
      fetchWedding();
    }
  }, [id]);

  const fetchOthers = async () => {
    const res = await fetch(`/api/weddings/${id}/logistics/others`);
    if (res.ok) {
      const data = await res.json();
      setOthers(Array.isArray(data) ? data : []);
    }
  };

  const fetchWedding = async () => {
    const res = await fetch(`/api/weddings/${id}`);
    if (res.ok) {
      const data = await res.json();
      setWedding(data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/weddings/${id}/logistics/others/${editing.id}`
      : `/api/weddings/${id}/logistics/others`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchOthers();
      setForm({ type: "", description: "", due_date: "", status: "À faire" });
      setEditing(null);
    }
  };

  const handleEdit = (item) => {
    setForm({
      type: item.type,
      description: item.description ?? "",
      due_date: item.due_date?.substring(0, 10) || "",
      status: item.status,
    });
    setEditing(item);
  };

  const handleDelete = async (itemId) => {
    if (!confirm("Supprimer cet élément ?")) return;
    const res = await fetch(`/api/weddings/${id}/logistics/others/${itemId}`, {
      method: "DELETE",
    });
    if (res.ok) fetchOthers();
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
          <h1 className="text-2xl font-bold mb-4">Autres – Mariage de {wedding.couple_name}</h1>
		  <div className="flex gap-2 flex-wrap mb-6">
            <a href={`/weddings/${id}/logistics/meals`} className="px-3 py-1 bg-gray-100 text-sm rounded">Repas</a>
            <a href={`/weddings/${id}/logistics/transport`} className="px-3 py-1 bg-gray-100 text-sm rounded">Transport</a>
            <a href={`/weddings/${id}/logistics/accommodation`} className="px-3 py-1 bg-gray-100 text-sm rounded">Hébergement</a>
            <a href={`/weddings/${id}/logistics/ceremonies`} className="px-3 py-1 bg-gray-100 text-sm rounded">Cérémonies</a>
            <a href={`/weddings/${id}/logistics/animations`} className="px-3 py-1 bg-gray-100 text-sm rounded">Animations</a>
            <a href={`/weddings/${id}/logistics/outfits`} className="px-3 py-1 bg-gray-100 text-sm rounded font-semibold">Tenues</a>
            <a href={`/weddings/${id}/logistics/others`} className="px-3 py-1 bg-gray-200 text-sm rounded">Autres</a>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 max-w-md">
            <input name="type" placeholder="Type" value={form.type} onChange={handleChange} className="border p-2 mb-2 w-full rounded" required />
            <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="border p-2 mb-2 w-full rounded" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 mb-2 w-full rounded" />
            <select name="status" value={form.status} onChange={handleChange} className="border p-2 mb-4 w-full rounded">
              <option value="À faire">À faire</option>
              <option value="Fait">Fait</option>
              <option value="Abandonné">Abandonné</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editing ? "Mettre à jour" : "Ajouter"}</button>
          </form>

          <table className="w-full bg-white rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Description</th>
                <th className="p-2">Date cible</th>
                <th className="p-2">Statut</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {others.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.type}</td>
                  <td className="p-2">{item.description || "—"}</td>
                  <td className="p-2">{item.due_date ? new Date(item.due_date).toLocaleDateString() : "—"}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(item)} title="Modifier">
                      <PencilIcon className="w-4 h-4 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} title="Supprimer">
                      <TrashIcon className="w-4 h-4 text-red-600 hover:text-red-800" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>
    </div>
  );
}
