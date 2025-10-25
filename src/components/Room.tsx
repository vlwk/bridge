"use client";

import { useAppContext } from "../context/AppContext";
import Board from "./Board";
import PageCard from "./PageCard";
import { buttonStyles as s } from "./styles/Buttons.styles";
import { leaveRoom } from "@/src/lib/socket";
import { getUserId } from "@/src/lib/user";

export default function Room() {
  const { currentRoom, setCurrentRoom } = useAppContext();

  const handleExit = async () => {
    const roomId = currentRoom!.id;
    const userId = getUserId();
    try {
      await fetch("/api/leave-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, userId }),
      });
    } catch (e) {
      console.error("Failed to leave room:", e);
    } finally {
      leaveRoom(roomId);
      setCurrentRoom(null);
    }
  };

  return (
    <PageCard
      title={`Game Room id=${currentRoom!.id}`}
      actions={
        <button onClick={handleExit} className={s.primary}>
          Exit Room
        </button>
      }
    >
      <Board />
    </PageCard>
  );
}
