import React, { useState } from 'react';
import { Table } from '@/types';

type TableConfigPanelProps = {
  onConfigChange: (tables: Table[]) => void;
};

const TableConfigPanel = ({ onConfigChange }: TableConfigPanelProps) => {
  const [config, setConfig] = useState<{ type: Table['type']; count: number }[]>([
    { type: '6', count: 0 },
    { type: '8', count: 0 },
    { type: '10', count: 0 },
    { type: '12', count: 0 },
    { type: 'enfants', count: 0 },
  ]);

  const updateCount = (type: Table['type'], count: number) => {
    setConfig(prev =>
      prev.map(item => (item.type === type ? { ...item, count } : item))
    );
  };

  const generateTables = () => {
    const tables: Table[] = [];
    let idCounter = 1;

    config.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        const size = type === 'enfants' ? 6 : parseInt(type, 10);
        tables.push({
          id: `table-${idCounter}`,
          name: `Table ${idCounter}`,
          type,
          guests: Array(size).fill(null),
        });
        idCounter++;
      }
    });

    onConfigChange(tables);
  };

  return (
    <div className="table-config-panel w-full">
      <h3 className="text-lg font-semibold mb-4">Configuration des tables</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {config.map(({ type, count }) => (
          <div key={type} className="flex items-center justify-between gap-2">
            <label className="flex-1">Tables de {type} personnes :</label>
            <input
              type="number"
              value={count}
              min={0}
              className="w-20 border rounded p-2"
              onChange={(e) => updateCount(type, parseInt(e.target.value || '0', 10))}
            />
          </div>
        ))}
      </div>
      <button
        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={generateTables}
      >
        Créer les tables
      </button>
    </div>
  );
};

export default TableConfigPanel;
