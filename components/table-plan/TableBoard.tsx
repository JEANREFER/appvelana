import React from 'react';
import TableItem from './TableItem';
import { Table, Guest } from '@/types';


type TableBoardProps = {
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  guests: Guest[];
};

const TableBoard = ({ tables, setTables, guests }: TableBoardProps) => {
  const updateTable = (updatedTable: Table) => {
    setTables(prev =>
      prev.map(table => (table.id === updatedTable.id ? updatedTable : table))
    );
  };

  const deleteTable = (tableId: string) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
  };

  return (
    <div className="table-board">
      <h3 className="text-lg font-semibold mb-4">Disposition des Tables</h3>
      <div className="tables-container flex flex-wrap gap-4">
        {tables.map(table => (
          <TableItem
            key={table.id}
            table={table}
            onUpdateTable={updateTable}
            onDeleteTable={deleteTable}
          />
        ))}
      </div>
    </div>
  );
};

export default TableBoard;
