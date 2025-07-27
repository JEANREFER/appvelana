import React, { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Guestfamily } from "@prisma/client";

type DraggableGuestProps = {
  guest: Guestfamily;
};

const DraggableGuest = ({ guest }: DraggableGuestProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "GUEST",
    item: { guest },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref, drag]);

  return (
    <li
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "6px 8px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {guest.prénom} {guest.nom} ({guest.age} ans)
    </li>
  );
};

export default DraggableGuest;
