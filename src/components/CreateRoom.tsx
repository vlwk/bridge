"use client";

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import SettingsPopup from "./SettingsPopup";
import { buttonStyles as s } from "./styles/Buttons.styles";

export default function CreateRoom() {
  const { setCurrentRoom } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleCreateRoom = async (roomData: {
    roomName: string;
    settings: Record<string, any>;
  }) => {
    setIsCreating(true);

    try {
      const response = await fetch("/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const data = await response.json();

      setCurrentRoom({
        id: data.roomId,
        name: data.roomName || `Room ${data.roomId}`,
      });

      setShowPopup(false);
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        disabled={isCreating}
        className={s.primary}
      >
        {isCreating ? "Creating..." : "Create Room"}
      </button>

      {showPopup && (
        <SettingsPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleCreateRoom}
        />
      )}
    </div>
  );
}
