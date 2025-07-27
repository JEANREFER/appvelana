// types.ts
export interface Guest {
  id: number;
  prénom: string;
  nom: string;
  age: number;
  family: string;
  centresInteret: string;
  guestid: number;
  weddingId: number;
  group: string;
}

export interface Table {
  id: string;
  name: string;
  type: '6' | '8' | '10' | '12' | 'enfants';
  guests: (Guest | null)[];
}
