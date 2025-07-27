import React from 'react';

const groupColors: Record<string, string> = {
  famille: '#ffdfba',
  amis: '#bae1ff',
  collègues: '#c8f7c5',
  enfants: '#ffe0e0',
  autre: '#f0f0f0',
};

const ColorLegend = ({ tables }) => {
  if (!tables) return null;

  const allGuests = tables.flatMap((table) => table.seats || []);
  const families = Array.from(
  new Set(allGuests.filter(g => g).map(g => g.group || 'Autre'))
);


  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Légende par groupe</h3>
      <div className="flex gap-4 flex-wrap">
        {(families as string[]).map((fam, index) => (
		  <div key={index} className="flex items-center gap-2">
			<div className="w-4 h-4 rounded-full bg-gray-300"></div>
			<span>{fam}</span>
		  </div>
		))}
      </div>
    </div>
  );
};


export default ColorLegend;
