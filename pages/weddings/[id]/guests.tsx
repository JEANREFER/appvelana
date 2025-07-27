// 📁 pages/weddings/[id]/guests.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as XLSX from "xlsx";
import { assignGuestsRandomly } from '@/lib/table-plan/RandomAssignment';
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
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from "lucide-react";

const defaultGuest = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  response: "En attente",
  numGuests: 1,
  comment: ""
};

export default function GuestsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [guests, setGuests] = useState([]);
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultGuest);

  const fetchGuests = async () => {
    if (!id) return;
    const res = await fetch(`/api/weddings/${id}/guests`);
    const data = await res.json();
    setGuests(data);
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

    fetchGuests();
    fetchWedding();
  }, [id]);

  const openModal = (guest = null) => {
    if (guest) {
      setEditing(guest);
      setForm({
        
        firstName: guest.firstName,
        lastName: guest.lastName,
        phone: guest.phone || "",
        email: guest.email || "",
        response: guest.response || "En attente",
        numGuests: guest.numGuests || 1,
        comment: guest.comment || ""
      });
    } else {
      setEditing(null);
      setForm({ ...defaultGuest });
    }
    setModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.firstName || !form.lastName) {
    return alert("Prénom et Nom obligatoires");
  }

  const method = editing ? "PUT" : "POST";
  const url = editing
    ? `/api/weddings/${id}/guests/${editing.id}`
    : `/api/weddings/${id}/guests`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (res.ok) {
    fetchGuests();
    setModal(false);
  } else {
    alert("Erreur lors de l'enregistrement de l'invité");
  }
};


  const handleDelete = async (guestId) => {
    if (!confirm("Supprimer cet invité ?")) return;
    const res = await fetch(`/api/weddings/${id}/guests/${guestId}`, { method: "DELETE" });
    if (res.ok) fetchGuests();
    else alert("Erreur lors de la suppression.");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = async (evt) => {
  const wb = XLSX.read(evt.target.result, { type: "binary" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws);
  console.log("Invités importés depuis Excel :", data); // 👈 ajoute ça

  const res = await fetch(`/api/weddings/${id}/guests/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) fetchGuests();
  else alert("Erreur lors de l'import.");
};


    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const headers = [{
      firstName: "Jean",
      lastName: "Dupont",
      phone: "0601020304",
      email: "jean.dupont@email.com",
      response: "En attente",
      numGuests: 2,
      comment: "A placer côté famille"
    }];

    const worksheet = XLSX.utils.json_to_sheet(headers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invités");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modele_invites.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!wedding || !user) return <p className="p-6">Chargement...</p>;

  const stats = guests.reduce(
    (acc, g) => {
      acc.total += g.numGuests;
      if (g.response === "Confirmé") acc.confirmed += g.numGuests;
      else if (g.response === "Refusé") acc.declined += g.numGuests;
      else acc.pending += g.numGuests;
      return acc;
    },
    { total: 0, confirmed: 0, pending: 0, declined: 0 }
  );

  const tableCount = Math.ceil(stats.confirmed / 10);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
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
            <Link href={`/weddings/${id}/vendors`} className="text-black hover:underline block"><BriefcaseIcon className="inline-block w-5 h-5 mr-2" /> Prestataires</Link>
            <Link href={`/weddings/${id}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">
			<div className="flex justify-between mb-6">
				<h1 className="text-2xl font-bold">Invités de {wedding.couple_name}</h1>
			</div>
          <div className="flex justify-between mb-6">
            <button onClick={() => openModal()} className="bg-gray-600 text-white px-4 py-2 rounded">+ Ajouter un invité</button>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} className="border px-3 py-2" />
			<button onClick={downloadTemplate} className="bg-gray-600 text-white px-4 py-2 rounded">
			  Télécharger modèle Excel
			</button>
			<button
			    onClick={() => router.push(`/weddings/${id}/guestfamily`)}
				className="bg-gray-600 text-white px-4 py-2 rounded"
				>
				Voir les participants
			</button>

		  </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Stat label="Total invités" value={stats.total} icon={<UsersIcon className="h-5 w-5 text-gray-600" />} />
            <Stat label="Confirmés" value={stats.confirmed} icon={<CheckCircleIcon className="h-5 w-5 text-green-600" />} />
            <Stat label="En attente" value={stats.pending} icon={<ClockIcon className="h-5 w-5 text-yellow-500" />} />
            <Stat label="Refusés" value={stats.declined} icon={<XCircleIcon className="h-5 w-5 text-red-600" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9 bg-white p-4 border rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Liste des invités</h2>
              {guests.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun invité trouvé.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded shadow">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2">Prénom</th>
                        <th className="p-2">Nom</th>
                        <th className="p-2">Téléphone</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Réponse</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map((g) => (
                        <tr key={g.id} className="border-b">
                          <td className="p-2">{g.firstName}</td>
                          <td className="p-2">{g.lastName}</td>
                          <td className="p-2">{g.phone || "-"}</td>
                          <td className="p-2">{g.email || "-"}</td>
                          <td className="p-2">{g.response}</td>
                          <td className="p-2">{g.numGuests}</td>
                          <td className="p-2 text-sm flex gap-2">
                          <button onClick={() => openModal(g)} className="text-blue-600">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(g.id)} className="text-red-600">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="lg:col-span-3 bg-white p-4 border rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Répartition des tables</h2>
              <p className="text-sm text-gray-700">Nombre total de personnes confirmées : <strong>{stats.confirmed}</strong></p>
              <p className="text-sm text-gray-700 mt-2">Nombre de tables (10 pers/table) : <strong>{tableCount}</strong></p>
              <button onClick={() => router.push(`/weddings/${id}/table-plan/TablePlanPage`)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Construire le plan de table
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editing ? "Modifier l'invité" : "Ajouter un invité"}</h2>
            <input name="firstName" placeholder="Prénom" required className="border p-2 mb-2 w-full" value={form.firstName} onChange={handleChange} />
            <input name="lastName" placeholder="Nom" required className="border p-2 mb-2 w-full" value={form.lastName} onChange={handleChange} />
            <input name="phone" placeholder="Téléphone" className="border p-2 mb-2 w-full" value={form.phone} onChange={handleChange} />
            <input name="email" placeholder="Email" className="border p-2 mb-2 w-full" value={form.email} onChange={handleChange} />
            <select name="response" className="border p-2 mb-2 w-full" value={form.response} onChange={handleChange}>
              <option>En attente</option>
              <option>Confirmé</option>
              <option>Refusé</option>
            </select>
            <input type="number" name="numGuests" min="1" className="border p-2 mb-2 w-full" value={form.numGuests} onChange={handleChange} />
            <textarea name="comment" placeholder="Commentaire" className="border p-2 mb-2 w-full" value={form.comment} onChange={handleChange} />
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
