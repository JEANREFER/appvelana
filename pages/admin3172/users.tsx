import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAdminGuard from "@/hooks/useAdminGuard";

export default function AdminUsersPage() {
  useAdminGuard();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    const res = await fetch("/api/admin3172/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id: number, newRole: string) => {
    await fetch(`/api/admin3172/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    fetchUsers();
  };

  const toggleBlock = async (id: number, isBlocked: boolean) => {
    await fetch(`/api/admin3172/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBlocked: !isBlocked }),
    });
    fetchUsers();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-pink-600">Gestion des utilisateurs</h1>
        <Link href="/admin3172/dashboard">
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
            ← Retour au Dashboard
          </button>
        </Link>
      </header>

      {/* Contrôles */}
      <main className="max-w-6xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/2"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/4"
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Admin</option>
            <option value="organisateur">Organisateur</option>
            <option value="marie">Marié(e)</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-pink-100 text-pink-800 text-left">
              <tr>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Rôle</th>
                <th className="px-6 py-3">Mariages</th>
                <th className="px-6 py-3">Dernier accès</th>
                <th className="px-6 py-3">Bloqué</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="organisateur">Organisateur</option>
                      <option value="marie">Marié(e)</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 text-center">{user.weddings || 0}</td>
                  <td className="px-6 py-3">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "-"}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {user.isBlocked ? "✅" : "❌"}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => toggleBlock(user.id, user.isBlocked)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      {user.isBlocked ? "Débloquer" : "Bloquer"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-4">Aucun utilisateur trouvé.</p>
          )}
        </div>
      </main>

      {/* Bouton retour fixe en bas à droite */}
      <div className="fixed bottom-4 right-4">
        <Link href="/admin3172/dashboard">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 transition">
            ← Retour Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
	