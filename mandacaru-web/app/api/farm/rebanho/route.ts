import { NextRequest, NextResponse } from 'next/server'

// GET /api/farm/rebanho — retorna dados do rebanho
export async function GET() {
  // TODO: buscar do banco de dados
  return NextResponse.json({ message: 'Not implemented — connect to database' }, { status: 501 })
}

// PATCH /api/farm/rebanho — atualiza contagens do rebanho
export async function PATCH(request: NextRequest) {
  // TODO: validar e salvar no banco de dados
  const _body = await request.json()
  return NextResponse.json({ message: 'Not implemented — connect to database' }, { status: 501 })
}
