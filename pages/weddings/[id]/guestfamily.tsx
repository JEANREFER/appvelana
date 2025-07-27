// 📁 pages/weddings/[id]/guestfamily.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  CalendarIcon, BellIcon, SettingsIcon, ListTodoIcon,
  ArrowLeftIcon, UsersIcon, BriefcaseIcon, DollarSignIcon,
  StickyNoteIcon, ImageIcon, PencilIcon, TrashIcon
} from "lucide-react";

const defaultParticipant = {
  prénom: "",
  nom: "",
  age: 0,
  family: "",
  centresInteret: "",
  group: "Famille"
};

export default function GuestFamilyPage() {
  const router = useRouter();
  const { id } = router.query;

  const [participants, setParticipants] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultParticipant);
  const [user, setUser] = useState(null);
  const [wedding, setWedding] = useState(null);

  const fetchParticipants = async () => {
    if (!id) return;
    const res = await fetch(`/api/weddings/${id}/guestfamily`);
    const data = await res.json();
    setParticipants(data);
  };

  const fetchWedding = async () => {
    if (!id) return;
    const res = await fetch(`/api/weddings/${id}`);
    const data = await res.json();
    setWedding(data);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);

    fetchParticipants();
    fetchWedding();
  }, [id]);

  const openModal = (p = null) => {
    if (p) {
      setEditing(p);
      setForm(p);
    } else {
      setEditing(null);
      setForm(defaultParticipant);
    }
    setModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.prénom || !form.nom) return alert("Prénom et nom obligatoires");

    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/weddings/${id}/guestfamily/${editing.id}`
      : `/api/weddings/${id}/guestfamily`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  ...form,
  weddingId: parseInt(Array.isArray(id) ? id[0] : id)
})

    });

    if (res.ok) {
      fetchParticipants();
      setModal(false);
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (participantId) => {
    if (!confirm("Supprimer ce participant ?")) return;
    const res = await fetch(`/api/weddings/${id}/guestfamily/${participantId}`, { method: "DELETE" });
    if (res.ok) fetchParticipants();
    else alert("Erreur lors de la suppression.");
  };

  if (!user || !wedding) return <p className="p-6">Chargement...</p>;

  const childrenUnder17 = participants.filter(p => p.age < 17).length;
  const tableCount = Math.ceil(participants.length / 10);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-700">Velana</div>
        <div className="flex items-center space-x-2">
          <Link href="/couple/planning"><CalendarIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/urgent-tasks"><BellIcon className="h-5 w-5 text-gray-500" /></Link>
          <Link href="/couple/profile"><SettingsIcon className="h-5 w-5 text-gray-500" /></Link>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">US</div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-1">{user?.role === "organisateur" ? "Profil66" : "Couple"}</h2>
          <p><strong>Nom :</strong> {user.name || "Inconnu"}</p>
          <p><strong>Email :</strong> {user.email || "Non renseigné"}</p>
          <p className="text-sm text-gray-500 mb-4">Rôle : {user?.role}</p>
          <nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
            <Link href={`/weddings/${id}/guests`} className="text-black hover:underline block"><ArrowLeftIcon className="inline-block w-5 h-5 mr-2" /> Retour aux invités</Link>
            <Link href={`/weddings/${id}/tasks`} className="text-black hover:underline block"><ListTodoIcon className="inline-block w-5 h-5 mr-2" /> Tâches</Link>
            <Link href={`/weddings/${id}/vendors`} className="text-black hover:underline block"><BriefcaseIcon className="inline-block w-5 h-5 mr-2" /> Prestataires</Link>
            <Link href={`/weddings/${id}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Liste des participants au mariage de {wedding.couple_name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Stat label="Total participants" value={participants.length} icon={<UsersIcon className="h-5 w-5 text-blue-600" />} />
            <Stat label="Participants à placer" value={participants.length} icon={<ListTodoIcon className="h-5 w-5 text-green-600" />} />
            <Stat label="Enfants (<17 ans)" value={childrenUnder17} icon={<CalendarIcon className="h-5 w-5 text-yellow-500" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <table className="w-full bg-white rounded shadow">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Prénom</th>
                    <th className="p-2">Nom</th>
                    <th className="p-2">Âge</th>
                    <th className="p-2">Famille</th>
                    <th className="p-2">Centres d'intérêt</th>
                    <th className="p-2">Groupe</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="p-2">{p.prénom}</td>
                      <td className="p-2">{p.nom}</td>
                      <td className="p-2">{p.age}</td>
                      <td className="p-2">{p.family}</td>
                      <td className="p-2">{p.centresInteret}</td>
                      <td className="p-2">{p.group}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={() => openModal(p)} className="text-blue-600"><PencilIcon className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-600"><TrashIcon className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-3 bg-white p-4 border rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Répartition des tables</h2>
              <p className="text-sm text-gray-700">Nombre total de personnes confirmées : <strong>{participants.length}</strong></p>
              <p className="text-sm text-gray-700 mt-2">Nombre de tables (10 pers/table) : <strong>{tableCount}</strong></p>
              <button onClick={() => router.push(`/weddings/${id}/table-plan/TablePlanPage`)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Construire le plan de table
              </button>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editing ? "Modifier" : "Ajouter"} un participant</h2>
            <input name="prénom" placeholder="Prénom" className="border p-2 mb-2 w-full" value={form.prénom} onChange={handleChange} required />
            <input name="nom" placeholder="Nom" className="border p-2 mb-2 w-full" value={form.nom} onChange={handleChange} required />
            <input name="age" type="number" placeholder="Âge" className="border p-2 mb-2 w-full" value={form.age} onChange={handleChange} />
            <input name="family" placeholder="Famille" className="border p-2 mb-2 w-full" value={form.family} onChange={handleChange} />
            <input name="centresInteret" placeholder="Centres d’intérêt" className="border p-2 mb-2 w-full" value={form.centresInteret} onChange={handleChange} />
            <select name="group" className="border p-2 mb-2 w-full" value={form.group} onChange={handleChange}>
              <option value="Famille époux">Famille époux</option>
              <option value="Famille épouse">Famille épouse</option>
              <option value="Collègues">Collègues</option>
              <option value="Amis">Amis</option>
            </select>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
              <button type="button" onClick={() => setModal(false)} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="p-4 bg-white border border-gray-200 shadow rounded-lg text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon}
        <p className="font-bold text-lg">{label}</p>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
