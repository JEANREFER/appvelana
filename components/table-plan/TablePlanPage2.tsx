import React, { useEffect, useState } from 'react';
import { Table, Guest } from '@/types';
import TableConfigPanel from './TableConfigPanel';
import TableBoard from './TableBoard';
import GuestListPanel from './GuestListPanel';
import ColorLegend from './ColorLegend';
import { assignGuestsRandomly } from '@/lib/table-plan/RandomAssignment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TablePlanPage = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [weddingName, setWeddingName] = useState('Mariage');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    fetch('/api/guests')
      .then(res => res.json())
      .then(setGuests)
      .catch(() => setGuests([]));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('plan-de-table');
    if (saved) {
      try {
        setTables(JSON.parse(saved));
      } catch {
        setTables([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plan-de-table', JSON.stringify(tables));
  }, [tables]);

  const handleAutoPlacement = () => {
    const newTables = assignGuestsRandomly(tables, guests);
    setTables(newTables);
  };

  const handleExport = () => {
    const exportData = tables.map((table) => ({
      table: table.name,
      places: table.guests.map((guest, index) => ({
        place: index + 1,
        invité: guest ? `${guest.prénom} ${guest.nom}` : 'Vide'
      }))
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plan-de-table.json';
    link.click();
  };

  const handleExportCSV = () => {
    const rows = [["Table", "Place", "Invité"]];
    tables.forEach((table) => {
      table.guests.forEach((guest, index) => {
        rows.push([
          table.name,
          (index + 1).toString(),
          guest ? `${guest.prénom} ${guest.nom}` : 'Vide'
        ]);
      });
    });

    const csvContent = rows.map(r => r.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().split("T")[0];
    const fileName = `${weddingName.replace(/\s+/g, '_')}_plan_de_table_${date}.csv`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toISOString().split("T")[0];
    const fileName = `${weddingName.replace(/\s+/g, '_')}_plan_de_table_${date}.pdf`;

    doc.setFontSize(16);
    doc.text(`Plan de table - ${weddingName}`, 14, 20);

    tables.forEach((table, index) => {
      const tableTitle = `${table.name} (${table.guests.length} places)`;
      const rows = table.guests.map((guest, i) => [
        `Place ${i + 1}`,
        guest ? `${guest.prénom} ${guest.nom}` : 'Vide'
      ]);

      autoTable(doc, {
        startY: index === 0 ? 30 : doc.lastAutoTable.finalY + 10,
        head: [[tableTitle, "Invité"]],
        body: rows,
      });
    });

    doc.save(fileName);
  };

  const handlePrint = () => {
    window.print();
  };

  const findGuestPlacement = (guestName: string) => {
    const lower = guestName.toLowerCase();
    for (const table of tables) {
      for (let i = 0; i < table.guests.length; i++) {
        const g = table.guests[i];
        if (g && (`${g.prénom} ${g.nom}`.toLowerCase().includes(lower))) {
          return `${g.prénom} ${g.nom} est à la table "${table.name}", place ${i + 1}`;
        }
      }
    }
    return 'Invité non trouvé';
  };

  const handleSearch = () => {
    const result = findGuestPlacement(searchQuery);
    setSearchResult(result);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="table-plan-page p-6">
        <h2 className="text-2xl font-bold mb-4">Plan de Table</h2>

        <input
          type="text"
          placeholder="Nom du mariage"
          value={weddingName}
          onChange={(e) => setWeddingName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <div className="flex gap-6 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <TableConfigPanel onConfigChange={setTables} />
            <div className="flex flex-col space-y-2 mt-4">
              <button onClick={handleAutoPlacement} className="bg-blue-500 text-white p-2 rounded">Placement automatique</button>
              <button onClick={handleExport} className="bg-gray-500 text-white p-2 rounded">Exporter en JSON</button>
              <button onClick={handleExportCSV} className="bg-gray-500 text-white p-2 rounded">Exporter en CSV</button>
              <button onClick={handleExportPDF} className="bg-gray-500 text-white p-2 rounded">Exporter en PDF</button>
              <button onClick={handlePrint} className="bg-green-600 text-white p-2 rounded">Imprimer la page</button>
            </div>

            <input
              type="text"
              placeholder="Rechercher un invité"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 mt-4 w-full"
            />
            <button onClick={handleSearch} className="bg-purple-600 text-white p-2 mt-2 rounded w-full">Rechercher</button>
            <p className="mt-2">{searchResult}</p>
          </div>

          <div className="flex-1 min-w-[600px]">
            <div id="printable-plan" className="bg-white shadow p-4 rounded">
              <TableBoard tables={tables} setTables={setTables} guests={guests} />
            </div>
          </div>

          <div className="flex-1 min-w-[300px]">
            <GuestListPanel guests={guests} />
            <ColorLegend tables={tables} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TablePlanPage;
