// pages/vendor/register.tsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function VendorRegister() {
  const [form, setForm] = useState({ name: '', siren: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch('/api/vendor/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      router.push('/vendor/pending');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Inscription Prestataire</h1>
      <input placeholder="Nom de l'entreprise" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 mb-2"/>
      <input placeholder="SIREN" value={form.siren} onChange={e => setForm({ ...form, siren: e.target.value })} className="border p-2 mb-2"/>
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 mb-2"/>
      <input type="password" placeholder="Mot de passe" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="border p-2 mb-2"/>
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">Créer mon compte</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
