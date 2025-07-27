import { Guest, Table } from '@/types';

// Répartition aléatoire des invités dans les tables disponibles
export function assignGuestsRandomly(guests: Guest[], tables: Table[]): Table[] {
  const shuffled = [...guests].sort(() => Math.random() - 0.5);
  let guestIndex = 0;

  const newTables = tables.map(table => {
    const totalSeats = table.guests.length;
    const filledSeats: (Guest | null)[] = [];

    for (let i = 0; i < totalSeats; i++) {
      if (guestIndex < shuffled.length) {
        filledSeats.push(shuffled[guestIndex]);
        guestIndex++;
      } else {
        filledSeats.push(null);
      }
    }

    return {
      ...table,
      guests: filledSeats,
    };
  });

  return newTables;
}
