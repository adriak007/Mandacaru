import { NextResponse } from 'next/server'

// GET /api/farm/cisterna — leitura do sensor de cisterna
// Fake sensor: retorna dados simulados. Substituir por integração IoT.
export async function GET() {
  // TODO: buscar leitura real do sensor via MQTT / HTTP do dispositivo IoT
  return NextResponse.json({
    nivel: 68,           // porcentagem (0-100)
    litros: 10880,       // litros calculados
    timestamp: new Date().toISOString(),
    fonte: 'simulado',   // 'sensor' quando real
  })
}
