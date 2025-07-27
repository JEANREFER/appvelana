// 📁 pages/weddings/[id]/vendors.tsx
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
  ImageIcon
} from "lucide-react";

export default function VendorsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [vendors, setVendors] = useState([]);
  const [filters, setFilters] = useState("all");
  const [wedding, setWedding] = useState(null);
  const [user, setUser] = useState(null);

 const fetchVendors = async () => {
  let url = `/api/vendor/vendors`;
  if (filters !== "all") url += `?type=${filters}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.success && Array.isArray(data.vendors)) {
    setVendors(data.vendors);   // On récupère bien le tableau
  } else {
    console.error("Erreur : réponse inattendue de l'API", data);
    setVendors([]);
  }
};



  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);
    setUser(localUser);
    fetchVendors();

    if (typeof id === "string") {
      fetch(`/api/weddings/${id}`)
        .then((res) => res.json())
        .then((data) => setWedding(data));
    }
  }, [filters, id]);

  const handleRequestQuote = (vendor) => {
    alert(`Formulaire de demande de devis pour ${vendor.name}`);
  };

  const handleAddToMyVendors = async (vendor) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Veuillez vous connecter.");

    if (typeof id !== "string") {
      return alert("ID de mariage invalide.");
    }

    const res = await fetch(`/api/user-vendors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        vendorId: vendor.id,
        weddingId: parseInt(id),
        name: vendor.name,
        city: vendor.city,
        description: vendor.description,
        price: vendor.price
      })
    });

    if (res.ok) {
      alert("Ajouté à mes prestataires.");
    } else {
      const errorData = await res.json();
      console.error("Erreur:", errorData);
      alert("Erreur lors de l'ajout.");
    }
  };

  if (!wedding || !user) {
    return <p className="p-6">Chargement du mariage...</p>;
  }

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
            <Link href={`/weddings/${id}/guests`} className="text-black hover:underline block"><UsersIcon className="inline-block w-5 h-5 mr-2" /> Invités</Link>
            <Link href={`/weddings/${id}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
            <Link href={`/weddings/${id}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
            <Link href={`/weddings/${id}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-2">Prestataires de {wedding.couple_name}</h1>
          <p className="text-sm text-gray-600 mb-6">Trouver, comparer, et gérer vos prestataires de mariage</p>

          <div className="bg-white rounded-xl shadow border p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 w-full">
                {["all", "Lieu", "Traiteur", "Photographe", "Décoration", "Animation", "Baby-sitting"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters(type)}
                    className={`px-3 py-2 text-sm rounded border ${
                      filters === type
                        ? "bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {type === "all" ? "Tous" : type}
                  </button>
                ))}
              </div>
              <div className="md:ml-auto mt-4 md:mt-0">
                <button
                  onClick={() => router.push(`/weddings/${id}/my-vendors`)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Voir mes prestataires
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
            {vendors.length === 0 ? (
              <p className="text-sm text-gray-600">Aucun prestataire trouvé.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="bg-white p-4 rounded shadow">
  <Link href={`/weddings/${id}/vendors/${vendor.id}`} className="block hover:opacity-90 transition">
    <div className="mb-2 rounded w-full h-40 overflow-hidden">
      {vendor.imageUrl ? (
        <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover rounded"/>
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400 italic">
          Aucune image
        </div>
      )}
    </div>
    <h2 className="text-lg font-bold">{vendor.name}</h2>
    <p className="text-sm text-gray-600">{vendor.city}</p>
    <p className="text-sm my-1">{vendor.description}</p>
    <p className="text-sm">Tarif : {vendor.price} €</p>
  </Link>
  <div className="flex gap-2 mt-2">
    <button onClick={() => handleRequestQuote(vendor)} className="text-blue-600 underline text-sm">
      Demander un devis
    </button>
    <button onClick={() => handleAddToMyVendors(vendor)} className="text-green-600 underline text-sm">
      Ajouter à mes prestataires
    </button>
  </div>
</div>

                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
      </footer>
    </div>
  );
}
