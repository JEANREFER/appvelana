// pages/my-vendors.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MyVendorsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
    description: "",
    price: 0,
    deposit: 0,
    paid: false,
    note: 0,
  });
  const [modal, setModal] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const fetchVendors = async () => {
    if (!id || !user.id) return;
    const res = await fetch(`/api/user-vendors?userId=${user.id}&weddingId=${id}`);
    const data = await res.json();
    console.log("Prestataires récupérés:", data);
    setVendors(data); // ❗ on affiche tous pour debug, remettre un filtre plus tard si besoin
  };

  useEffect(() => {
    if (id && user.id) fetchVendors();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user-vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        weddingId: parseInt(Array.isArray(id) ? id[0] : id),
        userId: user.id,
        custom: true,
      }),
    });

    if (res.ok) {
      fetchVendors();
      setModal(false);
    } else {
      const err = await res.json();
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes prestataires</h1>

      <button
        onClick={() => setModal(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ajouter un prestataire personnalisé
      </button>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Ville</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Acompte</th>
            <th className="p-2">Payé</th>
            <th className="p-2">Note</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id} className="border-b">
              <td className="p-2">{v.name}</td>
              <td className="p-2">{v.city || "-"}</td>
              <td className="p-2">{v.price || 0} €</td>
              <td className="p-2">{v.deposit || 0} €</td>
              <td className="p-2">{v.paid ? "✅" : "❌"}</td>
              <td className="p-2">{v.note || "-"}</td>
              <td className="p-2">{v.description || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-lg font-bold mb-4">Ajouter un prestataire personnalisé</h2>

            <input
              name="name"
              required
              placeholder="Nom du prestataire"
              className="w-full border p-2 mb-3 rounded"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="Ville"
              className="w-full border p-2 mb-3 rounded"
              value={form.city}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full border p-2 mb-3 rounded"
              value={form.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Prix (€)"
              className="w-full border p-2 mb-3 rounded"
              value={form.price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="deposit"
              placeholder="Acompte (€)"
              className="w-full border p-2 mb-3 rounded"
              value={form.deposit}
              onChange={handleChange}
            />
            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                name="paid"
                checked={form.paid}
                onChange={handleChange}
                className="mr-2"
              />
              Paiement complet effectué
            </label>
            <input
              type="number"
              name="note"
              min="0"
              max="5"
              placeholder="Note (0-5)"
              className="w-full border p-2 mb-4 rounded"
              value={form.note}
              onChange={handleChange}
            />

            <div className="flex justify-between">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
