// ✅ Fichier : components/AddMarieForm.tsx

import { useState } from "react";

export default function AddMarieForm({ weddingId }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/users/by-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setMessage("Utilisateur non trouvé ou non marié(e).");
        return;
      }

      const user = await res.json();

      const linkRes = await fetch(`/api/weddings/${weddingId}/add-marie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (linkRes.ok) {
        setMessage("Utilisateur ajouté au mariage !");
        setEmail("");
      } else {
        const err = await linkRes.json();
        setMessage(err.message || "Erreur lors de l'ajout.");
      }
    } catch (error) {
      console.error("Erreur ajout marié:", error);
      setMessage("Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">Email du/de la marié(e)</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="exemple@email.com"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ajouter au mariage
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
