// Meals page with left-right layout like Notes
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

export default function MealsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ type: "", description: "", due_date: "", status: "À faire" });

  const fetchWedding = async () => {
    const res = await fetch(`/api/weddings/${id}`);
    if (res.ok) {
      const data = await res.json();
      setWedding(data);
    }
  };

  const fetchMeals = async () => {
    const res = await fetch(`/api/weddings/${id}/logistics/meal`);
    const data = await res.json();
    setMeals(data);
    setSelectedMeal(data[0] || null);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);
    if (id) {
      fetchWedding();
      fetchMeals();
    }
  }, [id]);

  const openModal = (meal = null) => {
    setEditing(meal);
    setForm(
      meal
        ? {
            type: meal.type,
            description: meal.description ?? "",
            due_date: meal.due_date?.substring(0, 10) || "",
            status: meal.status,
          }
        : { type: "", description: "", due_date: "", status: "À faire" }
    );
    setModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/weddings/${id}/logistics/meal/${editing.id}`
      : `/api/weddings/${id}/logistics/meal`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setModal(false);
      fetchMeals();
    } else {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (mealId) => {
    if (!confirm("Supprimer ce repas ?")) return;
    await fetch(`/api/weddings/${id}/logistics/meal/${mealId}`, { method: "DELETE" });
    fetchMeals();
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
          <h1 className="text-2xl font-bold mb-4">Repas – Mariage de {wedding.couple_name}</h1>

          <div className="flex gap-2 flex-wrap mb-6">
            <a href={`/weddings/${id}/logistics/meal`} className="px-3 py-1 bg-gray-200 text-sm rounded font-semibold">Repas</a>
            <a href={`/weddings/${id}/logistics/transport`} className="px-3 py-1 bg-gray-100 text-sm rounded">Transport</a>
            <a href={`/weddings/${id}/logistics/accommodation`} className="px-3 py-1 bg-gray-100 text-sm rounded">Hébergement</a>
            <a href={`/weddings/${id}/logistics/ceremonies`} className="px-3 py-1 bg-gray-100 text-sm rounded">Cérémonies</a>
            <a href={`/weddings/${id}/logistics/animations`} className="px-3 py-1 bg-gray-100 text-sm rounded">Animations</a>
            <a href={`/weddings/${id}/logistics/outfits`} className="px-3 py-1 bg-gray-100 text-sm rounded">Tenues</a>
            <a href={`/weddings/${id}/logistics/others`} className="px-3 py-1 bg-gray-100 text-sm rounded">Autres</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-white shadow overflow-y-auto max-h-[500px]">
              <h2 className="text-lg font-semibold mb-3">Liste des repas</h2>
              <button className="mb-4 bg-gray-600 text-white px-4 py-2 rounded" onClick={() => openModal()}>
                Ajouter un repas
              </button>
              <ul className="divide-y divide-gray-200">
                {meals.map((meal) => (
                  <li
                    key={meal.id}
                    onClick={() => setSelectedMeal(meal)}
                    className={`p-2 cursor-pointer rounded hover:bg-gray-100 ${selectedMeal?.id === meal.id ? "bg-gray-50 border border-blue-300" : ""}`}
                  >
                    <p className="text-sm font-semibold">{meal.type}</p>
                    <p className="text-sm text-gray-600 truncate">{meal.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border rounded-lg p-4 bg-white shadow">
              <h2 className="text-lg font-semibold mb-3">Détail du repas</h2>
              {selectedMeal ? (
                <>
                  <p className="text-sm text-gray-600 mb-2"><strong>Date :</strong> {selectedMeal.due_date ? new Date(selectedMeal.due_date).toLocaleDateString() : "Non définie"}</p>
                  <p className="text-base mb-2 whitespace-pre-line">{selectedMeal.description}</p>
                  <p className="text-sm mb-4"><strong>Statut :</strong> {selectedMeal.status}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(selectedMeal)}><PencilIcon className="w-5 h-5 text-blue-600 hover:text-blue-800" /></button>
                    <button onClick={() => handleDelete(selectedMeal.id)}><TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" /></button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Sélectionnez un repas à gauche pour voir son contenu.</p>
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
            <h2 className="text-lg font-bold mb-4">{editing ? "Modifier" : "Ajouter"} un repas</h2>
            <input name="type" value={form.type} onChange={handleChange} placeholder="Type" required className="w-full border p-2 mb-3 rounded" />
            <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="w-full border p-2 mb-3 rounded" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 mb-3 rounded" />
            <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 mb-4 rounded">
              <option>À faire</option>
              <option>Fait</option>
              <option>Abandonné</option>
            </select>
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