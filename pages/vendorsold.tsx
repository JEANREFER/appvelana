// pages/vendors.tsx
import { useEffect, useState } from "react";

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then((data) => setVendors(data));
  }, []);

  const addToMyVendors = async (vendorId) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return alert("Connexion requise");
    const user = JSON.parse(userStr);

    const res = await fetch("/api/my-vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendorId, userId: user.id })
    });
    if (res.ok) alert("Ajouté à vos prestataires");
    else alert("Erreur lors de l'ajout");
  };

  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setForm({ name: "", email: "", message: "" });
    setModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/vendors/request-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, vendorId: selectedVendor.id })
    });
    if (res.ok) {
      alert("Demande envoyée");
      setModal(false);
    } else {
      alert("Erreur d'envoi");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prestataires recommandés</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((v) => (
          <div key={v.id} className="bg-white border rounded p-4 shadow">
            {v.imageUrl && (
              <img src={v.imageUrl} alt={v.name} className="w-full h-48 object-cover rounded mb-2" />
            )}
            <h2 className="text-lg font-bold">{v.name}</h2>
            <p className="text-sm text-gray-600">{v.city}</p>
            <p className="text-sm mb-2">{v.description}</p>
            <p className="text-sm font-semibold">Tarif : {v.price} €</p>
            <div className="flex justify-between mt-3">
              <button onClick={() => addToMyVendors(v.id)} className="bg-green-600 text-white px-3 py-1 rounded">
                Ajouter à mes prestataires
              </button>
              <button onClick={() => openModal(v)} className="bg-blue-600 text-white px-3 py-1 rounded">
                Demander un devis
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded p-6 shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Demander un devis à {selectedVendor.name}</h2>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              required
              className="w-full border p-2 mb-3 rounded"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              required
              className="w-full border p-2 mb-3 rounded"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full border p-2 mb-3 rounded"
              value={form.message}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Envoyer</button>
              <button type="button" onClick={() => setModal(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
