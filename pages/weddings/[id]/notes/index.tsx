import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  CalendarIcon,
  BellIcon,
  SettingsIcon,
  ListTodoIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
  UsersIcon,
  DollarSignIcon,
  StickyNoteIcon,
  ImageIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

export default function NotesListPage() {
  const router = useRouter();
  const { id } = router.query;

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/weddings/${id}/notes`);
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
        setSelectedNote(data[0] || null);
      } else {
        console.error("Erreur lors du chargement des notes.");
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
    }
  };

  const fetchWedding = async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/weddings/${id}`);
      if (res.ok) {
        const data = await res.json();
        setWedding(data);
      } else {
        console.error("Erreur lors du chargement du mariage.");
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
    }
  };

  const handleDelete = async (noteId) => {
    const confirmDelete = confirm("Supprimer cette note ?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchNotes();
    } else {
      console.error("Erreur lors de la suppression de la note.");
    }
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);
    if (id) {
      fetchWedding();
      fetchNotes();
    }
  }, [id]);

  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase())
  );

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
            <Link href={`/weddings/${id}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
            <Link href={`/weddings/${id}/vendors`} className="text-black hover:underline block"><BriefcaseIcon className="inline-block w-5 h-5 mr-2" /> Prestataires</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Notes de {wedding.couple_name}</h1>

          <div className="mb-4">
            <Link
              href={`/weddings/${id}/notes/new`}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Ajouter une note
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-white shadow overflow-y-auto max-h-[500px]">
              <h2 className="text-lg font-semibold mb-3">Liste des notes</h2>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Rechercher une note..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
                  >
                    Effacer
                  </button>
                )}
              </div>
              <ul className="divide-y divide-gray-200">
                {filteredNotes.length === 0 ? (
                  <li className="text-center py-10 text-gray-500 animate-pulse">
                    Aucune note trouvée
                  </li>
                ) : (
                  filteredNotes.map((note) => (
                    <li
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className={`p-2 cursor-pointer rounded hover:bg-gray-100 ${
                        selectedNote?.id === note.id ? "bg-blue-50 border border-blue-300" : ""
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {new Date(note.targetDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {highlightText(note.content, search)}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="border rounded-lg p-4 bg-white shadow">
              <h2 className="text-lg font-semibold mb-3">Détail de la note</h2>
              {selectedNote ? (
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Date cible :</strong>{" "}
                    {selectedNote.targetDate
                      ? new Date(selectedNote.targetDate).toLocaleDateString()
                      : "Non définie"}
                  </p>
                  <p className="text-base mb-4 whitespace-pre-line">{highlightText(selectedNote.content, search)}</p>
                  <div className="flex gap-2">
                    <Link href={`/weddings/${id}/notes/${selectedNote.id}`}>
                      <PencilIcon className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                    </Link>
                    <button onClick={() => handleDelete(selectedNote.id)}>
                      <TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Sélectionnez une note à gauche pour voir son contenu.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>
    </div>
  );
}