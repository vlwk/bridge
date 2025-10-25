import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { computeStatus } from '../_roomUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const roomIdRaw = body?.roomId;
    const userIdRaw = body?.userId;

    const roomId = Number(roomIdRaw);
    const userId = Number(userIdRaw);
    if (!roomId || Number.isNaN(roomId) || !userId || Number.isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: 'roomId and userId are required (numbers)' },
        { status: 400 }
      );
    }

    const existing = (await (prisma as any).room.findUnique({ where: { id: roomId } })) as any;
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }
 
    const nextParticipants = existing?.participants.filter((pid: Number) => Number(pid) !== userId);

    const nextStatus = computeStatus(nextParticipants);

    const updated = await (prisma as any).room.update({
      where: { id: roomId },
      data: { participants: nextParticipants, status: nextStatus },
    });

    return NextResponse.json({ success: true, room: updated });
  } catch (error) {
    console.error('Error leaving room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to leave room' },
      { status: 500 }
    );
  }
}
