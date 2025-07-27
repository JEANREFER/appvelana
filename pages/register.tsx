// ✅ Fichier : pages/register.tsx

import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "organisateur",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "organisateur") {
        router.push("/organizer/dashboard");
      } else if (data.role === "marie") {
        router.push("/weddings");
      } else if (data.role === "prestataire") {
        router.push("/vendors/profile");
      } else {
        router.push("/");
      }
    } else {
      setError(data.message || "Une erreur est survenue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold mb-4">Créer un compte</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          name="name"
          type="text"
          placeholder="Nom"
          required
          className="w-full border p-2 mb-3 rounded"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 mb-3 rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          required
          className="w-full border p-2 mb-3 rounded"
          value={form.password}
          onChange={handleChange}
        />
        <select
          name="role"
          className="w-full border p-2 mb-3 rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="organisateur">Organisateur</option>
          <option value="marie">Marié(e)</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>

        <p className="text-sm mt-4 text-center">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-600 underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
}
	