"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import JoinRoomPopup, { type RoomListItem } from "./JoinRoomPopup";
import { buttonStyles as s } from "./styles/Buttons.styles";

export default function JoinRoom() {
  const { setCurrentRoom } = useAppContext();
  const [isJoining, setIsJoining] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rooms, setRooms] = useState<RoomListItem[]>([]);

  useEffect(() => {
    if (!showPopup) return;
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/get-rooms");
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        setRooms(data.rooms ?? []);
      } catch (e: any) {
        console.error(e);
      }
    };
    fetchRooms();
  }, [showPopup]);

  const handleJoinRoom = async (roomId: number) => {
    setIsJoining(true);
    try {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) throw new Error("Selected room not found");
      if (room.status !== "OPEN") throw new Error("Room is closed");
      setCurrentRoom({ id: room.id, name: room.name || `Room ${room.id}` });
      setShowPopup(false);
    } catch (error) {
      console.error("Error joining room:", error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        disabled={isJoining}
        className={s.primary}
      >
        {isJoining ? "Joining..." : "Join Room"}
      </button>

      {showPopup && (
        <JoinRoomPopup
          rooms={rooms}
          onClose={() => setShowPopup(false)}
          onSubmit={handleJoinRoom}
        />
      )}
    </div>
  );
}
