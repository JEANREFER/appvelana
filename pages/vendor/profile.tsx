import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ✅ Composants définis en dehors de VendorProfilePage
const VendorHeader = ({ vendorName, onLogout }: { vendorName: string; onLogout: () => void }) => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <div className="text-2xl font-bold">Espace Prestataire</div>
    <div className="flex items-center space-x-4">
      <span>Bienvenue {vendorName}</span>
      <button onClick={onLogout} className="bg-red-500 text-white px-4 py-1 rounded">Déconnexion</button>
    </div>
  </header>
);

const VendorSidebar = () => (
  <aside className="w-64 bg-gray-200 p-6">
    <nav className="flex flex-col space-y-2">
      <a href="/vendor/dashboard" className="hover:underline">Dashboard</a>
      <a href="/vendor/profile" className="hover:underline">Mon Profil</a>
      <a href="/vendor/activities" className="hover:underline">Activités</a>
      <a href="/vendor/discounts" className="hover:underline">Bons de Réduction</a>
      <a href="/vendor/quotes" className="hover:underline">Devis</a>
      <a href="/vendor/messages" className="hover:underline">Messagerie</a>
    </nav>
  </aside>
);

const VendorFooter = () => (
  <footer className="bg-white p-4 text-center">
    © 2025 MonApp Mariage - Espace Prestataire
  </footer>
);

export default function VendorProfilePage() {
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    type: "",
    description: "",
    price: 0,
    website: "",
    contact: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const vendorId = localStorage.getItem("vendorId");
    if (!vendorId) {
      router.push("/vendor/login");
      return;
    }

    const res = await fetch(`/api/vendor/profile?vendorId=${vendorId}`);
    if (!res.ok) {
      console.error("Erreur chargement profil");
      return;
    }
    const vendorData = await res.json();
    setVendor(vendorData);
    setForm({
      name: vendorData.name || "",
      city: vendorData.city || "",
      type: vendorData.type || "",
      description: vendorData.description || "",
      price: vendorData.price || 0,
      website: vendorData.website || "",
      contact: vendorData.contact || ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vendorId = localStorage.getItem("vendorId");
    if (!vendorId) {
      alert("Session expirée. Veuillez vous reconnecter.");
      router.push("/vendor/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("city", form.city);
    formData.append("type", form.type);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("website", form.website);
    formData.append("contact", form.contact);
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch(`/api/vendor/profile?vendorId=${vendorId}`, {
      method: "PUT",
      body: formData
    });

    if (res.ok) {
      alert("Profil mis à jour !");
      setIsEditing(false);
      fetchProfile();
    } else {
      const errorData = await res.json();
      console.error("Erreur mise à jour:", errorData);
      alert("Erreur lors de la mise à jour.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vendorId");
    router.push("/vendor/login");
  };

  if (!vendor) return <p className="p-6">Chargement du profil...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <VendorHeader vendorName={vendor.name} onLogout={handleLogout} />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mon Profil Prestataire</h1>
          </div>

          {!isEditing ? (
            <div className="bg-white p-8 rounded shadow">
              {vendor.imageUrl ? (
                <div className="relative w-full h-60 mb-6 rounded overflow-hidden bg-gray-100">
				  <img
					src={vendor.imageUrl}
					alt="Photo du prestataire"
					className="absolute inset-0 w-full h-full object-cover"
				  />
				</div>

              ) : (
                <div className="w-full h-60 bg-gray-100 mb-6 flex items-center justify-center rounded text-gray-400 italic">
                  Pas de photo disponible
                </div>
              )}

              <h2 className="text-2xl font-bold">{vendor.name}</h2>
              <p className="text-gray-600 mb-2">{vendor.type} • {vendor.city}</p>

              <div className="my-4">
                <h3 className="font-semibold">Description :</h3>
                <p className="mt-2">{vendor.description || "Non renseigné"}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div>
                  <h4 className="font-semibold">Prix indicatif :</h4>
                  <p>{vendor.price} €</p>
                </div>
                <div>
                  <h4 className="font-semibold">Contact :</h4>
                  <p>{vendor.contact || "Non renseigné"}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold">Site Web :</h4>
                  {vendor.website ? (
                    <a href={vendor.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      {vendor.website}
                    </a>
                  ) : (
                    <p>Non renseigné</p>
                  )}
                </div>
              </div>

              <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded">
                Modifier
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow space-y-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="w-full border p-3 rounded" />
              <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" className="w-full border p-3 rounded" />
              <select name="type" value={form.type} onChange={handleChange} className="w-full border p-3 rounded">
                <option value="">-- Type de prestataire --</option>
                <option value="Lieu">Lieu</option>
                <option value="Traiteur">Traiteur</option>
                <option value="Photographe">Photographe</option>
                <option value="Décoration">Décoration</option>
                <option value="Animation">Animation</option>
                <option value="Baby-sitting">Baby-sitting</option>
              </select>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={6} className="w-full border p-3 rounded" />
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Prix" className="w-full border p-3 rounded" />
              <input name="website" value={form.website} onChange={handleChange} placeholder="Site Web" className="w-full border p-3 rounded" />
              <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact (téléphone/email)" className="w-full border p-3 rounded" />

              <div>
                <label className="block mb-2 font-semibold">Photo Prestataire :</label>
                <input type="file" onChange={handleFileChange} className="w-full border p-3 rounded" />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Enregistrer</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded">Annuler</button>
              </div>
            </form>
          )}
        </main>
      </div>
      <VendorFooter />
    </div>
  );
}
