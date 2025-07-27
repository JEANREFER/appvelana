import React, { useState } from 'react';
import { Table, Guest } from '@/types'; // ✅ Utilisation des types globaux
import SeatItem from './SeatItem';


type TableItemProps = {
  table: Table;
  onUpdateTable: (updatedTable: Table) => void;
  onDeleteTable: (tableId: string) => void;
};

const TableItem = ({ table, onUpdateTable, onDeleteTable }: TableItemProps) => {
  const [tableName, setTableName] = useState(table.name);

  const handleRename = (newName: string) => {
    setTableName(newName);
    onUpdateTable({ ...table, name: newName });
  };

  const handleDrop = (seatIndex: number, guest: Guest) => {
    const updatedGuests = [...table.guests];
    updatedGuests[seatIndex] = guest;

    onUpdateTable({
      ...table,
      guests: updatedGuests,
    });
  };

  const handleRemove = (seatIndex: number) => {
    const updatedGuests = [...table.guests];
    updatedGuests[seatIndex] = null;

    onUpdateTable({
      ...table,
      guests: updatedGuests,
    });
  };

  return (
    <div
      className="table-item"
      style={{
        border: '2px solid #999',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
        minWidth: '200px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          value={tableName}
          onChange={(e) => handleRename(e.target.value)}
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            border: 'none',
            background: 'transparent',
            borderBottom: '1px dashed #aaa',
            width: 'auto',
          }}
          placeholder="Nom de la table"
        />
        <button
          onClick={() => {
            const confirmDelete = window.confirm(`Supprimer ${table.name} ?`);
            if (confirmDelete) onDeleteTable(table.id);
          }}
          style={{
            background: 'transparent',
            color: 'red',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
          title="Supprimer la table"
        >
          ×
        </button>
      </div>

      <div
        className="seats-container"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(table.guests.length))}, 1fr)`,
          gap: '6px',
          marginTop: '10px',
        }}
      >
        {table.guests.map((guest, index) => (
          <SeatItem
            key={index}
            guest={guest}
            onDrop={(g) => handleDrop(index, g)}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TableItem;
