import { prisma } from "@/lib/prisma";

export type Guestfamily = {
  id: number;
  nom: string;
  prénom: string;
  age: number;
  family: string;
  centresInteret: string;
  guestid: number;
  weddingId: number;
  group: string;
};

export type Table = {
  id: string;
  label: string;
  type: '6' | '8' | '10' | '12' | 'enfants';
  seats: (Guestfamily | null)[];
};
