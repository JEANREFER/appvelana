// components/table-plan/TablePlanPage.tsx

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableBoard from './TableBoard';
import { useState, useEffect } from 'react';

const TablePlanPage = () => {
  const [tables, setTables] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    setTables([
      { id: '1', name: 'Table 1', guests: [null, null, null, null] },
    ]);
    setGuests([
      { id: 1, nom: 'Dupont', prénom: 'Marie', age: 30, group: 'famille' },
    ]);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Plan de Table</h1>
        <TableBoard tables={tables} setTables={setTables} guests={guests} />
      </div>
    </DndProvider>
  );
};

export default TablePlanPage;
