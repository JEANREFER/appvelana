// pages/vendor/requests.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  responseMessage?: string;
  responseFile?: string;
}

export default function VendorRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseFile, setResponseFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) return router.push("/login");

      const user = JSON.parse(userStr);
      if (user.role !== "prestataire") return router.push("/");

      const res = await fetch(`/api/vendor/requests?userId=${user.id}`);
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const openModal = (req: QuoteRequest) => {
    setSelected(req);
    setResponseMessage(req.responseMessage || "");
    setModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    const formData = new FormData();
    formData.append("id", String(selected.id));
    formData.append("responseMessage", responseMessage);
    if (responseFile) formData.append("file", responseFile);

    const res = await fetch("/api/vendor/respond", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      alert("Réponse envoyée");
      setModal(false);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const refreshed = await fetch(`/api/vendor/requests?userId=${user.id}`);
      const data = await refreshed.json();
      setRequests(data);
    } else {
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Demandes de devis reçues</h1>
      {requests.length === 0 ? (
        <p>Aucune demande reçue.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req.id} className="bg-white border rounded shadow p-4">
              <p><strong>Nom :</strong> {req.name}</p>
              <p><strong>Email :</strong> {req.email}</p>
              <p><strong>Message :</strong> {req.message}</p>
              <p className="text-sm text-gray-500 mt-2">Reçu le {new Date(req.createdAt).toLocaleDateString()}</p>

              {req.responseMessage && (
                <div className="mt-2 text-green-700">
                  <p><strong>Réponse :</strong> {req.responseMessage}</p>
                  {req.responseFile && (
                    <a
                      href={req.responseFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Voir le fichier
                    </a>
                  )}
                </div>
              )}

              <button
                onClick={() => openModal(req)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Répondre
              </button>
            </li>
          ))}
        </ul>
      )}

      {modal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4">Répondre à la demande</h2>
            <textarea
              placeholder="Votre message"
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResponseFile(e.target.files?.[0] || null)}
              className="w-full border p-2 mb-3 rounded"
            />
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Envoyer</button>
              <button type="button" onClick={() => setModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
