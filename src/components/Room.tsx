"use client";

import { useAppContext } from "../context/AppContext";
import Board from "./Board";
import PageCard from "./PageCard";
import { buttonStyles as s } from "./styles/Buttons.styles";

export default function Room() {
  const { currentRoom, setCurrentRoom } = useAppContext();

  const handleExit = async () => {
    const roomId = currentRoom!.id;
    try {
      await fetch("/api/close-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
    } catch (e) {
      console.error("Failed to close room:", e);
    } finally {
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
