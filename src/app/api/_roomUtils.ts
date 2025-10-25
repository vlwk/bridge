export type RoomStatusString = 'OPEN' | 'CLOSED' | 'FULL';

export function computeStatus(participants: number[]): RoomStatusString {
  const count = participants.length;
  if (count === 0) return 'CLOSED';
  if (count >= 4) return 'FULL';
  return 'OPEN';
}
