// ✅ pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Logo from "../components/Logo";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); // ✅ nécessaire ici

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
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("Impossible de se connecter. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Logo />
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Connexion</h1>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-gray-500 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-2xl transition font-semibold"
          >
            Se connecter
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?
            <a href="/register" className="text-pink-500 ml-1 hover:underline font-medium">
              Créer un compte
            </a>
          </p>
        </div>
        <div className="mt-4">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition">
            <FcGoogle size={22} />
            <span className="text-sm text-gray-600 font-medium">Se connecter avec Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
