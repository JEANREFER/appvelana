import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VendorActivities() {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '', location: '' });
  const [editingActivity, setEditingActivity] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', price: '', location: '' });
  const [vendorName, setVendorName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const vendorId = localStorage.getItem('vendorId');
    const vendorName = localStorage.getItem('vendorName') || 'Prestataire';
    setVendorName(vendorName);
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const vendorId = localStorage.getItem('vendorId');
    const res = await fetch('/api/vendor/activities', {
      headers: { 'vendor-id': vendorId }
    });
    const data = await res.json();
    setActivities(data.activities);
  };

  const handleAdd = async () => {
    const vendorId = localStorage.getItem('vendorId');
    await fetch('/api/vendor/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'vendor-id': vendorId },
      body: JSON.stringify(form)
    });
    setForm({ title: '', description: '', price: '', location: '' });
    fetchActivities();
  };

  const handleDelete = async (id) => {
    const vendorId = localStorage.getItem('vendorId');
    await fetch(`/api/vendor/activities/${id}`, {
      method: 'DELETE',
      headers: { 'vendor-id': vendorId }
    });
    fetchActivities();
  };

  const handleUpdate = async () => {
    const vendorId = localStorage.getItem('vendorId');
    await fetch(`/api/vendor/activities/${editingActivity}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'vendor-id': vendorId },
      body: JSON.stringify(editForm)
    });
    setEditingActivity(null);
    fetchActivities();
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
          <h1 className="text-3xl mb-4">Mes Activités</h1>

          {/* Formulaire d'ajout */}
          <div className="mb-6">
            <h2 className="text-xl mb-2">Ajouter une activité</h2>
            <input placeholder="Titre" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2 mr-2" />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="border p-2 mr-2" />
            <input type="number" placeholder="Prix" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2 mr-2" />
            <input placeholder="Zone d'intervention" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="border p-2 mr-2" />
            <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">Ajouter</button>
          </div>

          {/* Formulaire d'édition */}
          {editingActivity && (
            <div className="mb-6 border p-4 bg-white shadow">
              <h2 className="text-xl mb-2">Modifier l'activité</h2>
              <input placeholder="Titre" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="border p-2 mr-2" />
              <input placeholder="Description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="border p-2 mr-2" />
              <input type="number" placeholder="Prix" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} className="border p-2 mr-2" />
              <input placeholder="Zone d'intervention" value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} className="border p-2 mr-2" />
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2">Mettre à jour</button>
            </div>
          )}

          {/* Liste des activités */}
          <div>
            <h2 className="text-xl mb-2">Liste des activités</h2>
            {activities.map((activity) => (
              <div key={activity.id} className="border p-4 mb-2 bg-white shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{activity.title}</h3>
                  <p>{activity.description}</p>
                  <p>Prix : {activity.price} €</p>
                  <p>Zone : {activity.location}</p>
                </div>
                <div>
                  <button onClick={() => {
                    setEditingActivity(activity.id);
                    setEditForm({
                      title: activity.title,
                      description: activity.description,
                      price: activity.price,
                      location: activity.location
                    });
                  }} className="bg-yellow-500 text-white px-3 py-1 mr-2">Modifier</button>
                  <button onClick={() => handleDelete(activity.id)} className="bg-red-500 text-white px-3 py-1">Supprimer</button>
                </div>
              </div>
            ))}
          </div>

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
