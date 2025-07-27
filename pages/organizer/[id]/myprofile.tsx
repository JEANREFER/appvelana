// pages/organizer/[id]/myprofile.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { CalendarIcon, BellIcon, SettingsIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function MyProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    city: '',
  });

useEffect(() => {
  if (status === 'authenticated' && id) {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/organizer/${id}/profile`, {
          withCredentials: true,
        });
        // traitement ici
      } catch (error) {
        console.error('Erreur fetch profile :', error);
      }
    };

    fetchProfile();
  }
}, [status, id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/organizer/${id}/profile`, formData, {
        withCredentials: true,
      });
      router.push(`/organizer/${id}/dashboard`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-700">Velana</div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Rechercher"
              className="w-64 border px-3 py-2 rounded shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/organizer/${id}/myplanning`}>
              <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <CalendarIcon className="h-5 w-5" />
              </button>
            </Link>
            <Link href={`/organizer/${id}/myurgent-tasks`}>
              <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <BellIcon className="h-5 w-5" />
              </button>
            </Link>
            <Link href={`/organizer/${id}/myprofile`}>
              <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <SettingsIcon className="h-5 w-5" />
              </button>
            </Link>
            <Link href={`/organizer/${id}/myprofile`}>
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center cursor-pointer">
                <span className="text-sm font-medium">US</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Organisateur</h2>
          {user && (
            <div className="text-sm space-y-2 mb-6">
              <p><strong>Nom :</strong> {user.name}</p>
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Entreprise :</strong> {user.company || 'Non renseignée'}</p>
              <p><strong>Ville :</strong> {user.city || 'Non renseignée'}</p>
            </div>
          )}

          <nav className="text-sm space-y-3 pt-4 border-t border-gray-200">
            <a href={`/organizer/${id}/stats`} className="text-black hover:underline block">📊 Statistiques & Suivi</a>
            <a href={`/organizer/${id}/urgent-planning`} className="text-black hover:underline block">🗓️ Planning</a>
            <a href={`/organizer/${id}/urgent-tasks`} className="text-black hover:underline block">⚠️ Tâches urgentes</a>
          </nav>
        </aside>

        <main className="flex-1 p-8 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-6">Mon Profil</h1>

          <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Nom complet</label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input type="email" name="email" value={formData.email} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium">Entreprise</label>
              <Input type="text" name="company" value={formData.company} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium">Ville</label>
              <Input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <Button type="submit">Enregistrer</Button>
          </form>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        Besoin d'aide ? <a href="/support" className="underline hover:text-black">Contactez le support Velana</a>
      </footer>
    </div>
  );
}
