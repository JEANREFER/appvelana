// 📁 pages/weddings/[id]/notes/[noteId].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditNotePage() {
  const router = useRouter();
  const { id, noteId } = router.query;

  const [form, setForm] = useState({ targetDate: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && noteId) {
      fetch(`/api/weddings/${id}/notes/${noteId}`)
        .then(res => res.json())
        .then(data => {
          setForm({
            targetDate: data.targetDate?.substring(0, 10) || "",
            content: data.content || ""
          });
          setLoading(false);
        });
    }
  }, [id, noteId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/weddings/${id}/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push(`/weddings/${id}/notes`);
    } else {
      alert("Erreur lors de la mise à jour de la note.");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier la note</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <label className="block mb-2 font-medium">Date cible</label>
        <input
          type="date"
          name="targetDate"
          value={form.targetDate}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
