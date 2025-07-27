import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateWeddingPage() {
  const [form, setForm] = useState({
    couple_name: "",
    wedding_date: "",
    budget: 15000
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id || !user.role) {
      return alert("Utilisateur non identifié ou incomplet");
    }

    const res = await fetch("/api/weddings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, created_by: user.id, role: user.role }),
    });

    if (res.ok) {
      if (user.role === "organisateur") {
        router.push("/organizer/dashboard");
      } else {
        router.push("/weddings");
      }
    } else {
      const data = await res.json();
      setError(data.message || "Erreur lors de la création du mariage");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer un mariage</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="couple_name"
          placeholder="Nom du couple"
          required
          className="w-full border p-2 rounded"
          value={form.couple_name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="wedding_date"
          required
          className="w-full border p-2 rounded"
          value={form.wedding_date}
          onChange={handleChange}
        />
        <input
          type="number"
          name="budget"
          className="w-full border p-2 rounded"
          value={form.budget}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Créer
        </button>
      </form>
    </div>
  );
}
