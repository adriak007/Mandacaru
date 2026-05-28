import { NextResponse } from 'next/server'

// GET /api/decisions — lista decisões pendentes do agente
export async function GET() {
  // TODO: buscar do banco de dados pelo farmId da sessão
  return NextResponse.json({ message: 'Not implemented — connect to database' }, { status: 501 })
}
