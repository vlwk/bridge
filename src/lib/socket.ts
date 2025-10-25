import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function getUrl() {
  return process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4001";
}

export function getSocket(): Socket {
  if (!socket) {
    socket = io(getUrl(), {
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
}

export function ensureConnected(): Socket {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

export function joinRoom(roomId: number) {
  const s = ensureConnected();
  s.emit("room:join", { roomId });
}

export function leaveRoom(roomId: number) {
  const s = ensureConnected();
  s.emit("room:leave", { roomId });
}
