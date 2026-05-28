import { NextRequest, NextResponse } from 'next/server'

// PATCH /api/decisions/:id — aprova ou recusa uma decisão
// Body: { action: 'approve' | 'reject' }
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: validar ação, atualizar no banco de dados, notificar agente
  const _body = await request.json()
  const _id = params.id
  return NextResponse.json({ message: 'Not implemented — connect to database' }, { status: 501 })
}
