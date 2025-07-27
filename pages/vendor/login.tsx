import { useState } from "react";
import { useRouter } from "next/router";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch('/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error('Erreur serveur, veuillez réessayer.');
      }

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('vendorId', data.vendorId);  // Sauvegarde du vendorId
        if (data.validated) {
          router.push('/vendor/dashboard');
        } else {
          router.push('/vendor/pending');
        }
      } else {
        setError(data.message || "Identifiants incorrects.");
      }
    } catch (err) {
      console.error(err);
      setError("Problème de connexion. Vérifiez votre réseau ou réessayez plus tard.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Connexion Prestataire</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2"/>
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2"/>
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Se connecter</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4">Pas encore de compte ? <a href="/vendor/register" className="text-blue-600 underline">Inscrivez-vous ici</a></p>
    </div>
  );
}
