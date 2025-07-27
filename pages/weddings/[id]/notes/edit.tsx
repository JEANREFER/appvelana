// pages/weddings/[id]/notes/edit.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NoteEditPage() {
  const router = useRouter();
  const { id, noteId } = router.query;

  const [form, setForm] = useState({ targetDate: "", content: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (noteId) {
      fetch(`/api/weddings/${id}/notes/${noteId}`)
        .then(res => res.json())
        .then(data => {
          setForm({
            targetDate: data.targetDate?.substring(0, 10) || "",
            content: data.content || ""
          });
          setEditing(true);
        });
    }
  }, [id, noteId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/weddings/${id}/notes/${noteId}`
      : `/api/weddings/${id}/notes`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, weddingId: parseInt(Array.isArray(id) ? id[0] : id) })
    });

    if (res.ok) {
      router.push(`/weddings/${id}/notes`);
    } else {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{editing ? "Modifier" : "Nouvelle"} note</h1>
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
          placeholder="Saisissez la note"
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
