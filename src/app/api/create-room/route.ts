import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { computeStatus } from '../_roomUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body?.roomName as string) || 'Untitled Room';
    const userId = Number(body?.userId);

    const participants = [userId];

    const room = await (prisma as any).room.create({
      data: { name, status: 'OPEN', participants },
    });

    return NextResponse.json({
      success: true,
      roomId: room.id,
      roomName: room.name,
      message: 'Room created successfully',
    });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create room' },
      { status: 500 }
    );
  }
}