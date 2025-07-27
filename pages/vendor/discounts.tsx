import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Vendor {
  id: number;
  name: string;
  pendingQuotes: number;
  newMessages: number;
}

export default function VendorDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', discount: '', validUntil: '' });
  const [vendorName, setVendorName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('vendorName') || 'Prestataire';
    setVendorName(name);
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    const vendorId = localStorage.getItem('vendorId');
    const res = await fetch('/api/vendor/discounts', {
      headers: { 'vendor-id': vendorId }
    });
    const data = await res.json();
    setDiscounts(data.discounts);
  };

  const handleAdd = async () => {
    const vendorId = localStorage.getItem('vendorId');
    await fetch('/api/vendor/discounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'vendor-id': vendorId },
      body: JSON.stringify(form)
    });
    setForm({ title: '', description: '', discount: '', validUntil: '' });
    fetchDiscounts();
  };

  const handleDelete = async (id) => {
    const vendorId = localStorage.getItem('vendorId');
    await fetch(`/api/vendor/discounts/${id}`, {
      method: 'DELETE',
      headers: { 'vendor-id': vendorId }
    });
    fetchDiscounts();
  };

  const toggleActive = async (id) => {
    const vendorId = localStorage.getItem('vendorId');
    await fetch(`/api/vendor/discounts/${id}`, {
      method: 'PUT',
      headers: { 'vendor-id': vendorId }
    });
    fetchDiscounts();
  };

  const handleLogout = () => {
    localStorage.removeItem('vendorId');
    localStorage.removeItem('vendorName');
    router.push('/vendor/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header vendorName={vendorName} onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-3xl mb-4">Mes Bons de Réduction</h1>

          <div className="mb-6">
            <h2 className="text-xl mb-2">Ajouter un bon</h2>
            <input placeholder="Titre" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2 mr-2" />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="border p-2 mr-2" />
            <input type="number" placeholder="% Réduction" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} className="border p-2 mr-2" />
            <input type="date" value={form.validUntil} onChange={e => setForm({ ...form, validUntil: e.target.value })} className="border p-2 mr-2" />
            <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">Ajouter</button>
          </div>

          <h2 className="text-xl mb-2">Liste des bons</h2>
          <ul>
            {discounts.map(bon => (
              <li key={bon.id} className="border p-2 mb-2 flex justify-between">
                <div>
                  <strong>{bon.title}</strong> - {bon.discount}% valable jusqu'au {new Date(bon.validUntil).toLocaleDateString()}<br />
                  <small>{bon.description}</small><br />
                  <span className={bon.isActive ? "text-green-600" : "text-red-600"}>
                    {bon.isActive ? "Actif" : "Inactif"}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => toggleActive(bon.id)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    {bon.isActive ? "Désactiver" : "Activer"}
                  </button>
                  <button onClick={() => handleDelete(bon.id)} className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
      <Footer />
    </div>
  );
}

const Header = ({ vendorName, onLogout }: { vendorName: string, onLogout: () => void }) => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <div className="text-2xl font-bold">Espace Prestataire</div>
    <div>
      <span className="mr-4">Connecté : {vendorName}</span>
      <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1 rounded">Déconnexion</button>
    </div>
  </header>
);

const Sidebar = () => (
  <aside className="w-64 bg-gray-200 p-4">
    <nav className="flex flex-col space-y-2">
      <a href="/vendor/dashboard" className="hover:underline">Dashboard</a>
      <a href="/vendor/profile" className="hover:underline">Mon Profil</a>
      <a href="/vendor/activities" className="hover:underline">Mes Activités</a>
      <a href="/vendor/discounts" className="hover:underline">Bons de Réduction</a>
      <a href="/vendor/quotes" className="hover:underline">Devis</a>
      <a href="/vendor/messages" className="hover:underline">Messagerie</a>
    </nav>
  </aside>
);

const Footer = () => (
  <footer className="bg-white shadow p-4 text-center">
    © 2025 MonApp Mariage - Espace Prestataire
  </footer>
);
