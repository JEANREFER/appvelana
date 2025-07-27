import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarIcon,
  BellIcon,
  SettingsIcon,
  ListTodoIcon,
  UsersIcon,
  DollarSignIcon,
  StickyNoteIcon,
  ImageIcon
} from "lucide-react";

export default function VendorProfilePage() {
  const router = useRouter();
  const { id, vendorId } = router.query;
  const [vendor, setVendor] = useState(null);
  const [activities, setActivities] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) router.push("/");
    setUser(localUser);

    if (vendorId) {
      fetch(`/api/vendor/public/${vendorId}`)
        .then(res => res.json())
        .then(data => setVendor(data.vendor));

      fetch(`/api/vendor/public/${vendorId}/activities`)
        .then(res => res.json())
        .then(data => setActivities(data.activities));

      fetch(`/api/vendor/public/${vendorId}/discounts`)
        .then(res => res.json())
        .then(data => setDiscounts(data.discounts));
    }
  }, [vendorId]);

  if (!vendor || !user) {
    return <p className="p-6">Chargement de la fiche prestataire...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar user={user} weddingId={id} />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
          
          
		 <div className="flex flex-col md:flex-row gap-6 mb-6">
  {/* Bloc image 1/3 */}
  <div className="w-full md:w-1/3 h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
    <img
      src={vendor.imageUrl}
      alt="Photo du prestataire"
      className="h-full w-auto max-w-full object-contain"
    />
  </div>

  {/* Bloc infos 2/3 */}
  <div className="flex-1">
    
    <p className="text-sm text-gray-600 mb-2">{vendor.type} - {vendor.city}</p>

    {vendor.description && (
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-sm mt-1">{vendor.description}</p>
      </div>
    )}

    {vendor.price && (
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Tarif indicatif</h2>
        <p className="text-sm">{vendor.price} €</p>
      </div>
    )}

    {vendor.website && (
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Site web</h2>
        <a href={vendor.website} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
          {vendor.website}
        </a>
      </div>
    )}

    {vendor.contact && (
      <div>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-sm">{vendor.contact}</p>
      </div>
    )}
  </div>
</div>



          <div className="flex gap-4 mb-6">
            <button onClick={() => alert("Demande de devis")} className="bg-blue-600 text-white px-4 py-2 rounded">Demander un devis</button>
            <button onClick={() => alert("Ajouté à mes prestataires")} className="bg-green-600 text-white px-4 py-2 rounded">Ajouter à mes prestataires</button>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nos Activités</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map(act => (
                <div key={act.id} className="border rounded p-4 shadow">
                  <h3 className="text-lg font-bold">{act.title}</h3>
                  <p className="text-sm text-gray-600">{act.location}</p>
                  <p className="my-2">{act.description}</p>
                  <p className="text-sm font-semibold">À partir de : {act.price} €</p>
                  {act.imageUrls ? (
                    <img src={act.imageUrls} alt={act.title} className="w-full h-40 object-cover mt-2 rounded"/>
                  ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-sm text-gray-400 italic mt-2">Aucune image</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Bons de Réduction</h2>
            {discounts.length === 0 ? (
              <p className="text-sm text-gray-600">Aucun bon de réduction disponible actuellement.</p>
            ) : (
              <ul className="space-y-4">
                {discounts.map(bon => (
                  <li key={bon.id} className="border p-4 rounded shadow">
                    <h3 className="font-bold">{bon.title} - {bon.discount}%</h3>
                    <p>{bon.description}</p>
                    <p className="text-sm text-gray-500">Valable jusqu'au {new Date(bon.validUntil).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
    <div className="text-2xl font-bold text-blue-700">Velana</div>
    <div className="flex items-center space-x-2">
      <Link href="/couple/planning"><CalendarIcon className="h-5 w-5 text-gray-500" /></Link>
      <Link href="/couple/urgent-tasks"><BellIcon className="h-5 w-5 text-gray-500" /></Link>
      <Link href="/couple/profile"><SettingsIcon className="h-5 w-5 text-gray-500" /></Link>
      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">US</div>
    </div>
  </header>
);

const Sidebar = ({ user, weddingId }) => (
  <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
    <h2 className="text-xl font-semibold mb-1">{user?.role === "organisateur" ? "Organisateur" : "Couple"}</h2>
    <p><strong>Nom :</strong> {user.name}</p>
    <p><strong>Email :</strong> {user.email}</p>
    <p className="text-sm text-gray-500 mb-4">Rôle : {user?.role}</p>
    <nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
      <Link href={`/weddings/${weddingId}/tasks`} className="text-black hover:underline block"><ListTodoIcon className="inline-block w-5 h-5 mr-2" /> Tâches</Link>
      <Link href={`/weddings/${weddingId}/guests`} className="text-black hover:underline block"><UsersIcon className="inline-block w-5 h-5 mr-2" /> Invités</Link>
      <Link href={`/weddings/${weddingId}/budget`} className="text-black hover:underline block"><DollarSignIcon className="inline-block w-5 h-5 mr-2" /> Budget</Link>
      <Link href={`/weddings/${weddingId}/notes`} className="text-black hover:underline block"><StickyNoteIcon className="inline-block w-5 h-5 mr-2" /> Notes</Link>
      <Link href={`/weddings/${weddingId}/logistics`} className="text-black hover:underline block"><ImageIcon className="inline-block w-5 h-5 mr-2" /> Logistique</Link>
    </nav>
  </aside>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
    Besoin d'aide ? <Link href="/support" className="underline hover:text-black">Contactez le support Velana</Link>
  </footer>
);
