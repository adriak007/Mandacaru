import { NextRequest, NextResponse } from 'next/server'

// POST /api/onboarding — cria conta e configuração inicial da fazenda
// Body: { farmName, userName, farmConfig: FarmConfig }
export async function POST(request: NextRequest) {
  // TODO: criar usuário, salvar farmConfig, retornar token de sessão
  const _body = await request.json()
  return NextResponse.json({ message: 'Not implemented — connect to database' }, { status: 501 })
}
