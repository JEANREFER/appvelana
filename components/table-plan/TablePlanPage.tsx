import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { assignGuestsRandomly } from '@/lib/table-plan/RandomAssignment';
import TableBoard from './TableBoard';
import TableConfigPanel from './TableConfigPanel';
import GuestListPanel from './GuestListPanel';
import ColorLegend from './ColorLegend';
import { Guest, Table } from '@/types'; // ✅ import unique et correct
import Link from 'next/link';

import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CalendarIcon,
  DollarSignIcon,
  ImageIcon,
  UsersIcon,
  ListTodoIcon,
  StickyNoteIcon,
  BellIcon,
  SettingsIcon
} from 'lucide-react';

const TablePlanPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [weddingName, setWeddingName] = useState('Mariage');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || 'null');
    if (!localUser) router.push("/");
    setUser(localUser);

    if (id) {
      fetch(`/api/weddings/${id}/guestfamily`).then(res => res.json()).then(setGuests);
      const saved = localStorage.getItem(`plan-de-table-${id}`);
      if (saved) setTables(JSON.parse(saved));
    }
  }, [id]);

  useEffect(() => {
    if (id) localStorage.setItem(`plan-de-table-${id}`, JSON.stringify(tables));
  }, [tables, id]);

  const handleAutoPlacement = () => {
    const newTables = assignGuestsRandomly(tables, guests);
    setTables(newTables);
  };

  const handleResetTables = () => {
    if (confirm('Voulez-vous vraiment réinitialiser toutes les tables ?')) {
      setTables([]);
      if (id) localStorage.removeItem(`plan-de-table-${id}`);
    }
  };

  const handleSearch = () => {
    const lower = searchQuery.toLowerCase();
    for (const table of tables) {
      for (let i = 0; i < table.guests.length; i++) {
        const g = table.guests[i];
        if (g && (`${g.prénom} ${g.nom}`.toLowerCase().includes(lower))) {
          setSearchResult(`${g.prénom} ${g.nom} est à la ${table.name}, place ${i + 1}`);
          return;
        }
      }
    }
    setSearchResult('Invité non trouvé');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toISOString().split("T")[0];
    const fileName = `${weddingName.replace(/\s+/g, '_')}_plan_de_table_${date}.pdf`;

    doc.setFontSize(16);
    doc.text(`Plan de table - ${weddingName}`, 14, 20);

    tables.forEach((table, index) => {
      const tableTitle = `${table.name} (${table.guests.length} places)`;
      const rows = table.guests.map((seat, i) => [
        `Place ${i + 1}`,
        seat ? `${seat.prénom} ${seat.nom}` : 'Vide'
      ]);

      autoTable(doc, {
        startY: index === 0 ? 30 : doc.lastAutoTable.finalY + 10,
        head: [[tableTitle, "Invité"]],
        body: rows,
      });
    });

    doc.save(fileName);
  };

  const handleExportCSV = () => {
    const rows = [["Table", "Place", "Invité"]];
    tables.forEach((table) => {
      table.guests.forEach((seat, index) => {
        rows.push([
          table.name,
          (index + 1).toString(),
          seat ? `${seat.prénom} ${seat.nom}` : 'Vide'
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

  const handleExportPNG = async () => {
    const element = document.getElementById('table-plan-layout');
    if (!element) return;

    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const date = new Date().toISOString().split("T")[0];
    link.href = dataURL;
    link.download = `${weddingName.replace(/\s+/g, '_')}_plan_de_table_${date}.png`;
    link.click();
  };

  const refreshGuests = () => {
    if (id) {
      fetch(`/api/weddings/${id}/guestfamily`)
        .then(res => res.json())
        .then(setGuests);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* ...interface identique, pas modifiée car correcte... */}
    </DndProvider>
  );
};

export default TablePlanPage;
