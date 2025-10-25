import React, { useMemo, useState } from "react";
import type { RoomStatus } from "@/src/generated/prisma/enums";
import { joinRoomPopupStyles as s } from "./styles/JoinRoomPopup.styles";
import { popupStyles as p } from "./styles/Popup.styles";
import { buttonStyles as b } from "./styles/Buttons.styles";

export type RoomListItem = {
  id: number;
  name: string;
  status: RoomStatus;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

interface JoinRoomPopupProps {
  rooms: RoomListItem[];
  onClose: () => void;
  onSubmit: (roomId: number) => void;
}

const JoinRoomPopup: React.FC<JoinRoomPopupProps> = ({
  rooms,
  onClose,
  onSubmit,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a, b) => {
      if (a.status !== b.status) return a.status === "OPEN" ? -1 : 1;
      return a.id - b.id;
    });
  }, [rooms]);

  const canJoin = useMemo(() => {
    const room = sortedRooms.find((r) => r.id === selectedId);
    return !!room && room.status === "OPEN";
  }, [sortedRooms, selectedId]);

  const handleRowClick = (room: RoomListItem) => {
    setSelectedId((prev) => (prev === room.id ? null : room.id));
  };

  const handleSubmit = () => {
    if (!canJoin || selectedId == null) return;
    onSubmit(selectedId);
  };

  return (
    <div className={p.modal} onClick={onClose}>
      <div className={p.box} onClick={(e) => e.stopPropagation()}>
        <h3 className={p.title}>Join a Room</h3>
        <div className={p.body}>
          {sortedRooms.length === 0 ? (
            <div className="text-base-content/70">No rooms available yet.</div>
          ) : (
            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th className="text-left">Room Name</th>
                    <th className="text-left">ID</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRooms.map((room) => (
                    <tr
                      key={room.id}
                      onClick={() => handleRowClick(room)}
                      className={`cursor-pointer transition-colors ${
                        selectedId === room.id ? s.tableRowActive : s.tableRow
                      }`}
                    >
                      <td>{room.name}</td>
                      <td>{room.id}</td>
                      <td>{room.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className={p.actions}>
          <button className={b.primary} onClick={onClose}>
            Cancel
          </button>
          <button
            className={b.primary}
            onClick={handleSubmit}
            disabled={!canJoin}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomPopup;
