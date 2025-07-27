// ✅ Nouvelle version de /my-vendors avec le même design que /vendors
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
  TrashIcon,
  PencilIcon
} from "lucide-react";

export default function MyVendorsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [vendors, setVendors] = useState([]);
  const [user, setUser] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    city: "",
    description: "",
    price: 0,
    deposit: 0,
    paid: false,
    note: 0
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`/api/weddings/${id}`).then(res => res.json()).then(setWedding);
    }
  }, [id]);

  useEffect(() => {
    if (id && user) {
      fetch(`/api/user-vendors?weddingId=${id}`)
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(v => v.userId === user.id || v.isApproved);
          setVendors(filtered);
        });
    }
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !user) return setError("Utilisateur ou mariage introuvable.");

    const res = await fetch("/api/user-vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, weddingId: parseInt(Array.isArray(id) ? id[0] : id), userId: user.id, custom: true })
    });

    if (res.ok) {
      setError("");
      setModal(false);
      setForm({ name: "", city: "", description: "", price: 0, deposit: 0, paid: false, note: 0 });
      const data = await fetch(`/api/user-vendors?weddingId=${id}`).then(r => r.json());
      const filtered = data.filter(v => v.userId === user.id || v.isApproved);
      setVendors(filtered);
    } else {
      const msg = await res.text();
      setError("Erreur : " + msg);
    }
  };

  const handleDelete = async (vendorId) => {
    const res = await fetch(`/api/user-vendors/${vendorId}`, {
      method: "DELETE"
    });
    if (res.ok) {
      setVendors(prev => prev.filter(v => v.id !== vendorId));
    }
  };

  const handleEdit = (vendor) => {
    setForm(vendor);
    setModal(true);
  };

  if (!wedding || !user) return <p className="p-6">Chargement du mariage...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold text-gray-700">Velana</div>
        <div className="flex items-center space-x-2">
          <Link href="/couple/planning"><CalendarIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/urgent-tasks"><BellIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/profile"><SettingsIcon className="h-5 w-5 text-gray-500" /></Link>
          <div className="w-8 h-8 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center">US</div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-1">{user?.role === "organisateur" ? "Profil66" : "Couple"}</h2>
          <p><strong>Nom :</strong> {user.name || "Inconnu"}</p>
          <p><strong>Email :</strong> {user.email || "Non renseigné"}</p>
          <p className="text-sm text-gray-500 mb-4">Rôle : {user?.role}</p>
          <nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
            <Link href={user?.role === "organisateur" ? "/organizer/dashboard" : "/weddings"} className="text-black hover:underline block">
              <ArrowLeftIcon className="inline-block w-5 h-5 mr-2" /> Tableau de bord
            </Link>
            <Link href={`/weddings/${id}/tasks`} className="text-black hover:underline block"><ListTodoIcon className="inline-block w-5 h-5 mr-2" /> Tâches</Link>
            <Link href={`/weddings/${id}/guests`} className="text-black hover:underline block"><UsersIcon className="inline-block w-5 h-5 mr-2" /> Invités</Link>
            <Link href={`/weddings/${id}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-2">Mes prestataires</h1>
          <p className="text-sm text-gray-600 mb-6">Vos prestataires ajoutés manuellement ou enregistrés depuis la liste</p>

          <div className="flex justify-between mb-4">
            <button onClick={() => setModal(true)} className="bg-gray-600 text-white px-4 py-2 rounded">Ajouter autre prestataire</button>
            <button onClick={() => router.push(`/weddings/${id}/vendors`)} className="bg-gray-600 text-white px-4 py-2 rounded">Retour à la liste</button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow p-4">
            {vendors.length === 0 ? (
              <p className="text-sm text-gray-600">Aucun prestataire affiché.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Nom</th>
                    <th className="p-2 text-left">Ville</th>
                    <th className="p-2 text-left">Prix</th>
                    <th className="p-2 text-left">Acompte</th>
                    <th className="p-2 text-left">Payé</th>
                    <th className="p-2 text-left">Note</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map(v => (
                    <tr key={v.id} className="border-t">
                      <td className="p-2">{v.name}</td>
                      <td className="p-2">{v.city || "-"}</td>
                      <td className="p-2">{v.price || 0} €</td>
                      <td className="p-2">{v.deposit || 0} €</td>
                      <td className="p-2">{v.paid ? "✅" : "❌"}</td>
                      <td className="p-2">{v.note || "-"}</td>
                      <td className="p-2">{v.description || ""}</td>
                      <td className="p-2 flex space-x-2">
                        <button onClick={() => handleEdit(v)} className="text-blue-500 hover:text-blue-700">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow w-full max-w-md"
          >
            <h2 className="text-lg font-bold mb-4">Ajouter un prestataire</h2>
            {error && <p className="text-red-600 mb-3">{error}</p>}
            <input name="name" required placeholder="Nom" className="w-full border p-2 mb-3 rounded" value={form.name} onChange={handleChange} />
            <input name="city" placeholder="Ville" className="w-full border p-2 mb-3 rounded" value={form.city} onChange={handleChange} />
            <textarea name="description" placeholder="Description" className="w-full border p-2 mb-3 rounded" value={form.description} onChange={handleChange} />
            <input type="number" name="price" placeholder="Prix (€)" className="w-full border p-2 mb-3 rounded" value={form.price} onChange={handleChange} />
            <input type="number" name="deposit" placeholder="Acompte (€)" className="w-full border p-2 mb-3 rounded" value={form.deposit} onChange={handleChange} />
            <label className="flex items-center mb-3">
              <input type="checkbox" name="paid" checked={form.paid} onChange={handleChange} className="mr-2" /> Paiement effectué
            </label>
            <input type="number" name="note" min="0" max="5" placeholder="Note (0-5)" className="w-full border p-2 mb-4 rounded" value={form.note} onChange={handleChange} />
            <div className="flex justify-between">
              <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded">Enregistrer</button>
              <button type="button" onClick={() => { setModal(false); setError(""); }} className="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
