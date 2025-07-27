	import { Guestfamily } from "@prisma/client";

export type Table = {
  id: string;
  label: string;
  type: '6' | '8' | '10' | '12' | 'enfants';
  seats: (Guestfamily | null)[];
};

export function assignGuestsRandomly(guests: Guestfamily[], tables: Table[]): Table[] {
  const shuffledGuests = [...guests].sort(() => Math.random() - 0.5);
  let guestIndex = 0;

  return tables.map((table) => {
    const newSeats = table.seats.map(() => {
      if (guestIndex < shuffledGuests.length) {
        return shuffledGuests[guestIndex++];
      }
      return null;
    });

    return {
      ...table,
      seats: newSeats,
    };
  });
}
