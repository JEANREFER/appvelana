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

interface Accommodation {
  id: number;
  type: string;
  description?: string;
  due_date?: string;
  status: string;
}

export default function AccommodationPage() {
  const router = useRouter();
  const { id } = router.query;

  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [wedding, setWedding] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Accommodation | null>(null);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    type: "",
    description: "",
    due_date: "",
    status: "À faire",
  });

  const fetchAccommodations = async () => {
    try {
      const res = await fetch(`/api/weddings/${id}/logistics/accommodation`);
      const data = await res.json();
      console.log("ACCOMMODATIONS:", data);
      if (Array.isArray(data)) {
        setAccommodations(data);
      } else if (Array.isArray(data.accommodations)) {
        setAccommodations(data.accommodations);
      } else {
        console.error("Format de données inattendu", data);
      }
    } catch (error) {
      console.error("Erreur lors du fetch:", error);
    }
  };

  const fetchWedding = async () => {
    const res = await fetch(`/api/weddings/${id}`);
    const data = await res.json();
    setWedding(data);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!localUser) router.push("/");
    setUser(localUser);
    if (id) {
      fetchAccommodations();
      fetchWedding();
    }
  }, [id]);

  const openModal = (item: Accommodation | null = null) => {
    setEditing(item);
    setForm(
      item
        ? {
            type: item.type,
            description: item.description ?? "",
            due_date: item.due_date?.substring(0, 10) || "",
            status: item.status,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/weddings/${id}/logistics/accommodation?accommodationId=${editing.id}`
      : `/api/weddings/${id}/logistics/accommodation`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setModal(false);
      fetchAccommodations();
    } else {
      alert("Erreur lors de la sauvegarde.");
    }
  };

  const handleDelete = async (accommodationId: number) => {
    if (!confirm("Supprimer cet hébergement ?")) return;
    await fetch(`/api/weddings/${id}/logistics/accommodation?accommodationId=${accommodationId}`, { method: "DELETE" });
    fetchAccommodations();
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
          <h1 className="text-2xl font-bold mb-4">Hébergements – Mariage de {wedding.couple_name}</h1>
          <div className="flex gap-2 flex-wrap mb-6">
            <a href={`/weddings/${id}/logistics/meal`} className="px-3 py-1 bg-gray-100 text-sm rounded">Repas</a>
            <a href={`/weddings/${id}/logistics/transport`} className="px-3 py-1 bg-gray-100 text-sm rounded">Transport</a>
            <a href={`/weddings/${id}/logistics/accommodation`} className="px-3 py-1 bg-gray-200 text-sm rounded">Hébergement</a>
            <a href={`/weddings/${id}/logistics/ceremonies`} className="px-3 py-1 bg-gray-100 text-sm rounded font-semibold">Cérémonies</a>
            <a href={`/weddings/${id}/logistics/animations`} className="px-3 py-1 bg-gray-100 text-sm rounded">Animations</a>
            <a href={`/weddings/${id}/logistics/outfits`} className="px-3 py-1 bg-gray-100 text-sm rounded">Tenues</a>
            <a href={`/weddings/${id}/logistics/others`} className="px-3 py-1 bg-gray-100 text-sm rounded">Autres</a>
          </div>
		  <button onClick={() => openModal()} className="mb-4 bg-gray-600 text-white px-4 py-2 rounded">
            Ajouter un hébergement
          </button>

          {accommodations.length === 0 ? (
            <p className="text-gray-500">Aucun hébergement pour l'instant.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accommodations.map((item) => (
                <div key={item.id} className="bg-white border rounded-lg shadow p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.type}</h3>
                  <p className="text-sm text-gray-600 mb-1">{item.description || "Aucune description."}</p>
                  <p className="text-sm text-gray-500 mb-1">Date cible : {item.due_date ? new Date(item.due_date).toLocaleDateString() : "Non définie"}</p>
                  <p className="text-sm text-gray-500 mb-3">Statut : {item.status}</p>
                  <div className="flex gap-4">
                    <button onClick={() => openModal(item)} className="text-blue-600" title="Modifier">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600" title="Supprimer">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? "Modifier" : "Nouvel hébergement"}</h2>
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
