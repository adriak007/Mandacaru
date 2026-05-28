import { NextRequest, NextResponse } from 'next/server'

// GET /api/farm — retorna configuração completa da fazenda
export async function GET() {
  // TODO: buscar do banco de dados pelo userId da sessão
  return NextResponse.json({ message: 'Not implemented — connect to database' }, { status: 501 })
}

// PATCH /api/farm — atualiza configuração da fazenda
export async function PATCH(request: NextRequest) {
  // TODO: validar corpo, salvar no banco de dados
  const _body = await request.json()
  return NextResponse.json({ message: 'Not implemented — connect to database' }, { status: 501 })
}
