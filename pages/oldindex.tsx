import { useEffect, useState } from "react";

export default function Dashboard() {
  const [wedding, setWedding] = useState(null);

  useEffect(() => {
    fetch("/api/weddings")
      .then(res => res.json())
      .then(data => setWedding(data[0])) // on prend le 1er pour l’exemple
      .catch(err => console.error(err));
  }, []);

  if (!wedding) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mariage de {wedding.couple_name}</h1>
      <p><strong>Date :</strong> {new Date(wedding.wedding_date).toLocaleDateString()}</p>
      <p><strong>Budget :</strong> {wedding.budget} €</p>

      <div className="flex gap-4 mt-6">
        <a href={`/weddings/${wedding.id}/tasks`} className="px-4 py-2 bg-blue-600 text-white rounded">Tâches</a>
        <a href={`/weddings/${wedding.id}/guests`} className="px-4 py-2 bg-green-600 text-white rounded">Invités</a>
        <a href={`/weddings/${wedding.id}/vendors`} className="px-4 py-2 bg-purple-600 text-white rounded">Prestataires</a>
        <a href={`/weddings/${wedding.id}/budget`} className="px-4 py-2 bg-yellow-500 text-white rounded">Budget</a>
        <a href={`/weddings/${wedding.id}/notes`} className="px-4 py-2 bg-gray-600 text-white rounded">Notes</a>
      </div>
    </div>
  );
}
