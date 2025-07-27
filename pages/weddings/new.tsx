// pages/weddings/new.tsx

import { useRouter } from "next/router";
import { useState } from "react";

export default function NewWeddingPage() {
  const router = useRouter();

  const [coupleName, setCoupleName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("/api/weddings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        couple_name: coupleName,
        wedding_date: weddingDate,
        budget: parseInt(budget),
        created_by: user?.id,
      }),
    });

    if (res.ok) {
      const createdWedding = await res.json();
      router.push(`/organizer/dashboard`);
    } else {
      alert("Erreur lors de la création du mariage");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer un nouveau mariage</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom du couple"
          value={coupleName}
          onChange={(e) => setCoupleName(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <input
          type="date"
          value={weddingDate}
          onChange={(e) => setWeddingDate(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <input
          type="number"
          placeholder="Budget (€)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Créer
        </button>
      </form>
    </div>
  );
}
