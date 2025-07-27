import React, { useRef } from 'react';
import { Guestfamily } from '@prisma/client';
import { useDrop } from 'react-dnd';

type SeatItemProps = {
  guest: Guestfamily | null;
  onDrop: (guest: Guestfamily) => void;
  onRemove?: () => void;
};

const getColorByGroup = (group: string) => {
  const colors: Record<string, string> = {
    famille: '#ffdfba',
    amis: '#bae1ff',
    collègues: '#c8f7c5',
    enfants: '#ffe0e0',
  };
  return colors[group.toLowerCase()] || '#f0f0f0';
};

const SeatItem = ({ guest, onDrop, onRemove }: SeatItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'GUEST',
    drop: (item: { guest: Guestfamily }) => onDrop(item.guest),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className="seat-item"
      style={{
        backgroundColor: guest
          ? getColorByGroup(guest.group || '')
          : isOver
          ? '#d1e7dd'
          : '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '6px',
        minHeight: '40px',
        position: 'relative',
        textAlign: 'center',
        fontSize: '0.9rem',
      }}
    >
      {guest ? (
        <>
          <span>{guest.prénom} {guest.nom}</span>
          {onRemove && (
            <button
              onClick={onRemove}
              style={{
                position: 'absolute',
                top: 2,
                right: 4,
                fontSize: '0.8rem',
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer'
              }}
              title="Retirer"
            >
              ×
            </button>
          )}
        </>
      ) : (
        <span>Place libre</span>
      )}
    </div>
  );
};

export default SeatItem;
