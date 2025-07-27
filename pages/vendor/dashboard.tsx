import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Vendor {
  id: number;
  name: string;
  pendingQuotes: number;
  newMessages: number;
}

export default function VendorDashboard() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const vendorId = localStorage.getItem('vendorId');
        if (!vendorId) {
          router.push('/vendor/login');
          return;
        }

        const res = await fetch('/api/vendor/me', {
          headers: { 'vendor-id': vendorId }
        });

        if (!res.ok) {
          throw new Error('Erreur lors de la récupération du prestataire');
        }

        const data = await res.json();

        if (!data.success) {
          router.push('/vendor/login');
        } else {
          setVendor(data.vendor);
        }
      } catch (err) {
        console.error(err);
        setError('Impossible de charger vos informations.');
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [router]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!vendor) return null;  // On ne tente pas de rendu sans données

  return (
    <div className="flex flex-col min-h-screen">
      <Header vendorName={vendor.name} onLogout={() => {
        localStorage.removeItem('vendorId');
        router.push('/vendor/login');
      }} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-3xl mb-6">Bienvenue, {vendor.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard title="Mes Activités" onClick={() => router.push('/vendor/activities')} />
            <DashboardCard title="Mes Bons de Réduction" onClick={() => router.push('/vendor/discounts')} />
            <DashboardCard title="Demandes de Devis" onClick={() => router.push('/vendor/quotes')} />
            <DashboardCard title="Messagerie" onClick={() => router.push('/vendor/messages')} />
            <DashboardCard title="Mon Profil" onClick={() => router.push('/vendor/profile')} />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl mb-2">Dernières Notifications</h2>
            <ul className="list-disc ml-5">
              <li>Vous avez {vendor.pendingQuotes} devis en attente.</li>
              <li>{vendor.newMessages} nouveaux messages non lus.</li>
            </ul>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  onClick: () => void;
};

const DashboardCard = ({ title, onClick }: DashboardCardProps) => (
  <div onClick={onClick} className="border p-4 rounded cursor-pointer bg-white shadow hover:bg-gray-100">
    <h3 className="text-xl">{title}</h3>
  </div>
);

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
