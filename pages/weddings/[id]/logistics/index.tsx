import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
} from "lucide-react";

const logisticsTypes = [
  { key: "meal", label: "Repas" },
  { key: "transport", label: "Transport" },
  { key: "accommodation", label: "Hébergement" },
  { key: "ceremonies", label: "Cérémonies" },
  { key: "animations", label: "Animations" },
  { key: "outfits", label: "Tenues" },
  { key: "others", label: "Autres" },
];

export default function LogisticsDashboard() {
  const router = useRouter();
  const { id } = router.query;
  const [overview, setOverview] = useState({});
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);
    if (!id) return;
    fetch(`/api/weddings/${id}/logistics/overview`)
      .then((res) => res.json())
      .then((data) => {
        setOverview(data);
        setWedding(data.wedding);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des données logistiques :", err);
        alert("Erreur de chargement des données logistiques.");
      });
  }, [id]);

  if (loading || !wedding || !user) return <p className="p-6">Chargement...</p>;

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
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Tableau de bord logistique de {wedding.couple_name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {logisticsTypes.map((item) => {
              const data = overview[item.key] || {};
              const total = data.total || 0;
              const àFaire = data["À faire"] || 0;
              const fait = data["Fait"] || 0;
              const abandonné = data["Abandonné"] || 0;
              const nextDate = data.nextDate
                ? new Date(data.nextDate).toLocaleDateString()
                : "Aucune";

              return (
                <div key={item.key} className="bg-white shadow p-4 rounded-xl">
                  <h2 className="text-lg font-bold mb-2">{item.label}</h2>
                  <p className="text-sm">Total : {total}</p>
                  <p className="text-sm">À faire : {àFaire}</p>
                  <p className="text-sm">Fait : {fait}</p>
                  <p className="text-sm">Abandonné : {abandonné}</p>
                  <p className="text-sm mb-2">Prochaine échéance : {nextDate}</p>
                  <button
                    onClick={() => router.push(`/weddings/${id}/logistics/${item.key}`)}
                    className="mt-2 bg-gray-600 text-white px-4 py-2 text-sm rounded"
                  >
                    Gérer {item.label}
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>
    </div>
  );
}
