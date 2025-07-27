import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link"; // ✅ ajout pour le bouton retour

export default function AddNotePage() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    targetDate: "",
    content: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      content: form.content,
      targetDate: form.targetDate || null
    };

    const res = await fetch(`/api/weddings/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push(`/weddings/${id}/notes`);
    } else {
      alert("Erreur lors de l'enregistrement de la note.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ajouter une note</h1>
        {/* ✅ Bouton de retour */}
        <Link
          href={`/weddings/${id}/notes`}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          ← Retour à la liste
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <label className="block mb-2 font-medium">Date cible</label>
        <input
          type="date"
          name="targetDate"
          value={form.targetDate}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Décrire l'action à faire..."
          required
        />

        <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
