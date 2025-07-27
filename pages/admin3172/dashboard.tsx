// pages/admin3172/dashboard.tsx
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/admin3172/");
      if (!res.ok) router.push("/admin3172/login");
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    document.cookie = "admin-token=; Max-Age=0; path=/";
    router.push("/admin3172/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-pink-600">Espace administrateur</h1>
        <button
          onClick={handleLogout}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          Déconnexion
        </button>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-semibold mb-6">Tableau de bord</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link href="/admin3172/vendors">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-l-4 border-pink-500">
              <h3 className="text-lg font-bold mb-2">✅ Valider les prestataires</h3>
              <p className="text-gray-600">Voir et approuver les prestataires en attente.</p>
            </div>
          </Link>

          <Link href="/admin3172/users">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-l-4 border-blue-500">
              <h3 className="text-lg font-bold mb-2">👥 Gérer les utilisateurs</h3>
              <p className="text-gray-600">Changer les rôles, bloquer ou débloquer les comptes.</p>
            </div>
          </Link>

          {/* Ajouter ici d'autres cartes pour d'autres actions admin */}
        </div>
      </main>
    </div>
  );
}
