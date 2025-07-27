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
  PencilIcon,
  TrashIcon,
  DollarSignIcon,
  StickyNoteIcon,
  ImageIcon,
  EuroIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function BudgetPage() {
  const router = useRouter();
  const { id } = router.query;
  const [budget, setBudget] = useState(0);
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ description: "", amount: 0, type: "depense" });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);

  const fetchBudget = async () => {
    const res = await fetch(`/api/weddings/${id}`);
    if (res.ok) {
      const data = await res.json();
      setBudget(data.budget);
      setWedding(data);
    }
  };

  const fetchEntries = async () => {
    const res = await fetch(`/api/weddings/${id}/budget`);
    if (res.ok) {
      const data = await res.json();
      setEntries(data);
    }
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);
    if (id) {
      fetchBudget();
      fetchEntries();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "amount" ? parseFloat(value || "0") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/budget/${editing.id}`
      : `/api/weddings/${id}/budget`;

    const payload = {
  ...form,
  amount: form.amount,
  type: form.type,
  weddingId: parseInt(Array.isArray(id) ? id[0] : id),
};


    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchEntries();
      setForm({ description: "", amount: 0, type: "depense" });
      setEditing(null);
      setShowForm(false);
    } else {
      console.error("❌ Erreur lors de l'enregistrement.");
    }
  };

  const handleEdit = (entry) => {
    setForm({
      description: entry.description,
      amount: entry.amount,
      type: entry.type,
    });
    setEditing(entry);
    setShowForm(true);
  };

  const handleDelete = async (entryId) => {
    const confirmDelete = confirm("Supprimer cette ligne budgétaire ?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/budget/${entryId}`, { method: "DELETE" });
    if (res.ok) fetchEntries();
  };

  const depenses = entries.filter((e) => e.type === "depense");
  const totalDepenses = depenses.reduce((acc, e) => acc + e.amount, 0);
  const rest = budget - totalDepenses;
  const maxDepense = depenses.reduce((max, e) => (e.amount > max.amount ? e : max), depenses[0] || { amount: 0 });
  const minDepense = depenses.reduce((min, e) => (e.amount < min.amount ? e : min), depenses[0] || { amount: 0 });
  const chartData = Object.values(
    depenses.reduce((acc, curr) => {
      acc[curr.description] = acc[curr.description] || { name: curr.description, value: 0 };
      acc[curr.description].value += curr.amount;
      return acc;
    }, {})
  );

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4", "#8bc34a"];

  if (!wedding || !user) return <p className="p-6">Chargement...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-3xl font-bold text-gray-700">Velana</div>
        <div className="flex items-center space-x-2">
          <Link href="/couple/planning"><CalendarIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/urgent-tasks"><BellIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/profile"><SettingsIcon className="h-5 w-5 text-gray-500" /></Link>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">US</div>
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
            <Link href={`/weddings/${id}/vendors`} className="text-black hover:underline block"><BriefcaseIcon className="inline-block w-5 h-5 mr-2" /> Prestataires</Link>
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-2">Budget de {wedding.couple_name}</h1>
          <p className="text-sm text-gray-600 mb-6">Suivez vos revenus et vos dépenses pour maîtriser le budget de votre mariage</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border rounded-xl shadow p-4">
              <div className="flex items-center mb-2">
                <EuroIcon className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Budget global</h2>
              </div>
              <p className="text-xl font-bold">{budget} €</p>
              <p className="text-sm text-gray-600">Dépensé : {totalDepenses} €</p>
              <p className="text-sm text-gray-600">Reste : {rest} €</p>
            </div>
            <div className="bg-white border rounded-xl shadow p-4">
              <div className="flex items-center mb-2">
                <TrendingUpIcon className="w-5 h-5 text-red-600 mr-2" />
                <h2 className="text-lg font-semibold">Plus grosse dépense</h2>
              </div>
              <p>{maxDepense?.description || "-"}</p>
              <p className="font-bold text-red-600">{maxDepense?.amount || 0} €</p>
            </div>
            <div className="bg-white border rounded-xl shadow p-4">
              <div className="flex items-center mb-2">
                <TrendingDownIcon className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold">Plus petite dépense</h2>
              </div>
              <p>{minDepense?.description || "-"}</p>
              <p className="font-bold text-green-600">{minDepense?.amount || 0} €</p>
            </div>
          </div>

          <section className="bg-white rounded-xl shadow border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Répartition des dépenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </section>

          <section className="bg-white rounded-xl shadow border p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Détail du budget</h2>
              <button
                onClick={() => {
                  setEditing(null);
                  setForm({ description: "", amount: 0, type: "depense" });
                  setShowForm(true);
                }}
                className="flex items-center bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
              >
                <PlusIcon className="w-4 h-4 mr-1" /> Ajouter une dépense
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Montant</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-b">
                    <td className="p-2">{e.description}</td>
                    <td className="p-2">{e.amount} €</td>
                    <td className="p-2">{e.type}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(e)}><PencilIcon className="w-4 h-4 text-blue-600 hover:text-blue-800" /></button>
                      <button onClick={() => handleDelete(e.id)}><TrashIcon className="w-4 h-4 text-red-600 hover:text-red-800" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {showForm && (
  <section className="bg-white rounded-xl shadow border p-4 mb-6">
    <h2 className="text-xl font-semibold mb-4">{editing ? "Modifier" : "Ajouter"} une ligne budgétaire</h2>
 <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
  <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
    <option value="depense">Dépense</option>
    <option value="revenu">Revenu</option>
  </select>

  <input
    name="description"
    placeholder="Description"
    value={form.description}
    onChange={handleChange}
    className="border p-2 rounded basis-1/3" // large
    required
  />

  <input
    type="number"
    name="amount"
    placeholder="Montant"
    value={form.amount}
    onChange={handleChange}
    className="border p-2 rounded w-28" // étroit
    required
  />

  <button
    type="submit"
    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
  >
    {editing ? "Mettre à jour" : "Ajouter"}
  </button>
</form>

  </section>
)}

        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>
    </div>
  );
}
