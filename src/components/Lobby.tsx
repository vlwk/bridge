"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { RoomProvider } from "../context/RoomContext";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import History from "./History";
import Room from "./Room";
import PageShell from "./PageShell";
import PageCard from "./PageCard";

export default function Lobby() {
  const { currentRoom } = useAppContext();

  if (!currentRoom) {
    return (
      <PageShell>
        <PageCard title="Lobby">
          <CreateRoom />
          <JoinRoom />
          <History />
        </PageCard>
      </PageShell>
    );
  }

  return (
    <RoomProvider>
      <PageShell>
        <Room />
      </PageShell>
    </RoomProvider>
  );
}
