import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId } = body || {};

    if (roomId === undefined || roomId === null || Number.isNaN(Number(roomId))) {
      return NextResponse.json(
        { success: false, error: 'roomId is required' },
        { status: 400 }
      );
    }
    try {
      await prisma.room.update({
        where: { id: Number(roomId) },
        data: { status: 'CLOSED' },
      });
    } catch (e) {
      console.warn('Attempted to close non-existent room:', roomId);
    }

    return NextResponse.json({ success: true, roomId, message: 'Room closed' });
  } catch (error) {
    console.error('Error closing room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to close room' },
      { status: 500 }
    );
  }
}
