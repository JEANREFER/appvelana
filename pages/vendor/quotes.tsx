import { useEffect, useState } from "react";

export default function VendorQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [responseForm, setResponseForm] = useState({ message: '', pdf: null });
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const vendorId = localStorage.getItem('vendorId');
    const res = await fetch('/api/vendor/quotes', {
      headers: { 'vendor-id': vendorId }
    });
    const data = await res.json();
    setQuotes(data.quotes);
  };

  const handleResponse = async () => {
    const vendorId = localStorage.getItem('vendorId');
    const formData = new FormData();
    formData.append('message', responseForm.message);
    formData.append('pdf', responseForm.pdf);

    await fetch(`/api/vendor/quotes/${selectedQuoteId}`, {
      method: 'POST',
      headers: { 'vendor-id': vendorId },
      body: formData
    });
    setResponseForm({ message: '', pdf: null });
    setSelectedQuoteId(null);
    fetchQuotes();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-3xl mb-4">Mes Demandes de Devis</h1>

          <h2 className="text-xl mb-2">Liste des demandes</h2>
          <ul>
            {quotes.map(quote => (
              <li key={quote.id} className="border p-2 mb-2">
                <div>
                  <strong>Demande de : {quote.userName}</strong><br/>
                  Message : {quote.message}<br/>
                  Statut : <span className={
                    quote.status === 'Pending' ? 'text-yellow-500' :
                    quote.status === 'Responded' ? 'text-green-600' : 'text-red-600'
                  }>
                    {quote.status}
                  </span>
                </div>
                {quote.status === 'Pending' && (
                  <button onClick={() => setSelectedQuoteId(quote.id)} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">
                    Répondre
                  </button>
                )}
                {quote.status === 'Responded' && quote.responsePdf && (
                  <a href={quote.responsePdf} target="_blank" className="text-blue-600 underline mt-2 inline-block">Voir le devis envoyé</a>
                )}
              </li>
            ))}
          </ul>

          {selectedQuoteId && (
            <div className="mt-6 border p-4 bg-white shadow">
              <h2 className="text-xl mb-2">Répondre à la demande</h2>
              <textarea placeholder="Votre message" value={responseForm.message} onChange={e => setResponseForm({ ...responseForm, message: e.target.value })} className="border p-2 w-full mb-2"/>
              <input type="file" accept="application/pdf" onChange={e => setResponseForm({ ...responseForm, pdf: e.target.files[0] })} className="mb-2"/>
              <div>
                <button onClick={handleResponse} className="bg-green-500 text-white px-4 py-2 mr-2">Envoyer</button>
                <button onClick={() => setSelectedQuoteId(null)} className="bg-gray-400 text-white px-4 py-2">Annuler</button>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <div className="text-2xl font-bold">Espace Prestataire</div>
    <div>
      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => {
        localStorage.removeItem('vendorId');
        window.location.href = '/vendor/login';
      }}>Déconnexion</button>
    </div>
  </header>
);
const Sidebar = () => (
  <aside className="w-64 bg-gray-200 p-4">
    <nav className="flex flex-col space-y-2">
      <a href="/vendor/dashboard" className="hover:underline">Dashboard</a>
	  <a href="/vendor/profile" className="hover:underline">Mon Profil</a>
      <a href="/vendor/activities" className="hover:underline">Mes Activités</a>
      <a href="/vendor/discounts" className="hover:underline">Bons de Réduction</a>
      <a href="/vendor/quotes" className="hover:underline">Devis</a>
      <a href="/vendor/messages" className="hover:underline">Messagerie</a>

    </nav>
  </aside>
);
const Footer = () => (
  <footer className="bg-white shadow p-4 text-center">
    © 2025 MonApp Mariage - Espace Prestataire
  </footer>
);

