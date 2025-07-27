import React, { useMemo, useState } from 'react';
import { Guestfamily } from '@prisma/client';
import DraggableGuest from '@/components/table-plan/DraggableGuest';

type GuestListPanelProps = {
  guests: Guestfamily[];
};

const GuestListPanel = ({ guests }: GuestListPanelProps) => {
  const [familleFilter, setFamilleFilter] = useState('');
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);
  const [centreInteret, setCentreInteret] = useState('');

  const filteredGuests = useMemo(() => {
    return guests?.filter((guest) => {
      const matchFamille =
        familleFilter === '' || guest.family.toLowerCase().includes(familleFilter.toLowerCase());
      const matchAge =
        (minAge === null || guest.age >= minAge) &&
        (maxAge === null || guest.age <= maxAge);
      const matchCentre =
        centreInteret === '' || guest.centresInteret.toLowerCase().includes(centreInteret.toLowerCase());
      return matchFamille && matchAge && matchCentre;
    });
  }, [guests, familleFilter, minAge, maxAge, centreInteret]);

  return (
    <div className="guest-list-panel">
      <h3>Liste des invités</h3>

      <div className="filters" style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Filtrer par famille"
          value={familleFilter}
          onChange={(e) => setFamilleFilter(e.target.value)}
          style={{ width: '100%', marginBottom: '6px' }}
        />
        <input
          type="number"
          placeholder="Âge min"
          value={minAge ?? ''}
          onChange={(e) => setMinAge(e.target.value ? parseInt(e.target.value) : null)}
          style={{ width: '48%', marginRight: '4%' }}
        />
        <input
          type="number"
          placeholder="Âge max"
          value={maxAge ?? ''}
          onChange={(e) => setMaxAge(e.target.value ? parseInt(e.target.value) : null)}
          style={{ width: '48%' }}
        />
        <input
          type="text"
          placeholder="Filtrer par centres d’intérêt"
          value={centreInteret}
          onChange={(e) => setCentreInteret(e.target.value)}
          style={{ width: '100%', marginTop: '6px' }}
        />
      </div>

      <ul className="guest-list" style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
        {filteredGuests?.map((guest) => (
          <DraggableGuest key={guest.id} guest={guest} />
        ))}
      </ul>
    </div>
  );
};

export default GuestListPanel;
