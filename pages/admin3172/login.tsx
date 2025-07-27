// pages/admin3172/login.tsx
	// pages/login.tsx
	import { useState } from "react";
	import { useRouter } from "next/router";


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

		  const data = await res.json();

		  if (res.ok) {
			localStorage.setItem("user", JSON.stringify(data));
			if (data.role === "organisateur") router.push("/organizer/dashboard");
			else if (data.role === "marie") router.push("/weddings");
			else if (data.role === "prestataire") router.push("/vendors/profile");
			else if (data.role === "invite") router.push("/admin3172/dashboard");
			else router.push("/");
		  } else {
			setError(data.message || "Une erreur est survenue");
		  }
		} catch (err) {
		  console.error(err);
		  setError("Impossible de se connecter. Veuillez réessayer plus tard.");
		}
	  };

	  return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4">
		  <div className="w-full max-w-md border border-black/10 rounded-3xl p-8 shadow-md animate-fade-in bg-white">
			<div className="flex justify-center mb-6">
			
			</div>
			<h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Connexion</h1>
			{error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}
			<form onSubmit={handleLogin} className="space-y-4">
			  <input
				type="email"
				placeholder="Email"
				className="w-full border border-black/20 p-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			  />
			  <input
				type="password"
				placeholder="Mot de passe"
				className="w-full border border-black/20 p-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
				className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition"
			  >
				Se connecter
			  </button>
			</form>
			<div className="mt-6 text-center">
			  <p className="text-sm text-gray-600">
				Pas encore de compte ?
				<a href="/register" className="text-gray-800 ml-1 hover:underline font-medium">
				  Créer un compte
				</a>
			  </p>
			</div>
			<div className="mt-4">
			  <button className="w-full flex items-center justify-center gap-3 border border-black/20 py-2 rounded-xl hover:bg-gray-100 transition">
				
				<span className="text-sm text-gray-700 font-medium">Se connecter avec Google</span>
			  </button>
			</div>
		  </div>
		</div>
	  );
	}
