import useAdminGuard from "@/hooks/useAdminGuard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminVendorsPage() {
  useAdminGuard();
  const router = useRouter();
  const [vendors, setVendors] = useState([]);

  const fetchPendingVendors = async () => {
    const res = await fetch("/api/admin3172/vendors");
    const data = await res.json();
    setVendors(data);
  };

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const handleValidate = async (id: number) => {
    await fetch(`/api/admin3172/vendors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ validated: true }),
    });
    fetchPendingVendors();
  };

  const handleDelete = async (id: number) => {
    const ok = confirm("Supprimer ce prestataire ?");
    if (!ok) return;
    await fetch(`/api/admin3172/vendors/${id}`, {
      method: "DELETE",
    });
    fetchPendingVendors();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-pink-600">Prestataires à valider</h1>
        <Link href="/admin3172/dashboard">
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
            ← Retour au Dashboard
          </button>
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto py-10 px-6">
        {vendors.length === 0 ? (
          <p className="text-gray-600">Aucun prestataire en attente de validation.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-pink-100 text-pink-800 text-left">
                <tr>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Ville</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Créateur</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{v.name}</td>
                    <td className="px-6 py-3">{v.city || "-"}</td>
                    <td className="px-6 py-3">{v.email}</td>
                    <td className="px-6 py-3">User #{v.userId}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => handleValidate(v.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Valider
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
