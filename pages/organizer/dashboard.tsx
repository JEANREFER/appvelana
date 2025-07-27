import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CalendarIcon, BellIcon, SettingsIcon } from "lucide-react";

export default function OrganizerDashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [weddings, setWeddings] = useState([]);
  const [filteredWeddings, setFilteredWeddings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      router.push("/");
      return;
    }
    setUser(localUser);

    fetch("/api/weddings/")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        const weddingsArray = Array.isArray(data) ? data : data.weddings || [];
        const filtered = weddingsArray.filter(
          (wedding) => wedding.created_by === localUser.id
        );
        setWeddings(filtered);
        setFilteredWeddings(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fetch:", err);
        setError("Erreur lors du chargement des mariages.");
        setLoading(false);
      });
  }, []);

  const handleAddWedding = () => {
    router.push("/weddings/new");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = weddings.filter((wedding) => {
      if (filterBy === "name") {
        return wedding.couple_name.toLowerCase().includes(term);
      } else if (filterBy === "date") {
        return new Date(wedding.wedding_date).toLocaleDateString().includes(term);
      } else if (filterBy === "budget") {
        return wedding.budget.toString().includes(term);
      }
      return true;
    });

    setFilteredWeddings(filtered);
  };

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-700">Velana</div>
        <div className="flex items-center gap-6">
          {/* Filtres */}
          <div className="flex gap-4 items-center">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="bg-white border border-gray-300 px-3 py-2 rounded shadow-sm text-sm"
            >
              <option value="name">Nom des mariés</option>
              <option value="date">Date de mariage</option>
              <option value="budget">Budget</option>
            </select>
            <input
              type="text"
              placeholder={`Rechercher par ${filterBy}`}
              value={searchTerm}
              onChange={handleSearch}
              className="w-64 border px-3 py-2 rounded shadow-sm"
            />
          </div>

          {/* Icônes */}
          <div className="flex items-center space-x-2">
            <Link href="/organizer/${id}/myplanning">
              <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <CalendarIcon className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/organizer/${id}/myurgent-tasks">
              <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <BellIcon className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/organizer/${id}/myprofile">
              <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <SettingsIcon className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/organizer/${id}/myprofile">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center cursor-pointer">
                <span className="text-sm font-medium">US</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Organisateur</h2>
          {user && (
            <div className="text-sm space-y-2 mb-6">
              <p><strong>Nom :</strong> {user.name || "Inconnu"}</p>
              <p><strong>Email :</strong> {user.email || "Non renseigné"}</p>
              <p><strong>Téléphone :</strong> {user.phone || "Non renseigné"}</p>
              <p><strong>Adresse :</strong> {user.address || "Non renseignée"}</p>
            </div>
          )}

          <nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
            <a href="/organizer/stats" className="text-black hover:underline block">📊 Statistiques & Suivi</a>
            <a href="/organizer/urgent-planning" className="text-black hover:underline block">🗓️ Planning</a>
            <a href="/organizer/urgent-tasks" className="text-black hover:underline block">⚠️ Tâches urgentes</a>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <button
              onClick={handleAddWedding}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              + Ajouter un mariage
            </button>
          </div>

          {filteredWeddings.length === 0 ? (
            <p>Aucun mariage trouvé.</p>
          ) : (
            <div className="max-h-[1600px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWeddings.map((wedding) => (
                  <div
                    key={wedding.id}
                    className="bg-white border border-gray-200 shadow rounded-lg p-6 hover:shadow-md transition duration-300"
                  >
                    <h2 className="text-xl font-semibold mb-2">{wedding.couple_name}</h2>
                    <p className="text-gray-700 mb-1">
                      Date : {new Date(wedding.wedding_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4">Budget : {wedding.budget} €</p>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          router.push(`/weddings/${wedding.id}/mydashboard`)
                        }
                        className="text-gray-600 hover:text-gray-800 underline"
                      >
                        Voir la page du mariage
                      </button>
                      <span className="text-sm text-gray-400">ID : {wedding.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <a href="/support" className="underline hover:text-black">Contactez le support Velana</a>
      </footer>
    </div>
  );
}
