import type { Appointment, PatientRecord, Reference, SessionMetrics, Slot } from './types'

const patients: PatientRecord[] = [
  { document: '12345678', reference: { specialty: 'Cardiología', origin: 'Hospital Central', validUntil: '30 de septiembre de 2026', status: 'vigente' } },
  { document: '87654321', reference: { specialty: 'Dermatología', origin: 'Centro de Salud Norte', validUntil: '10 de agosto de 2026', status: 'vencida' } },
  { document: '11112222' },
]
let slots: Slot[] = [
  { id: 'cardio-1', date: '2026-09-15', time: '09:30', specialty: 'Cardiología', available: 2 },
  { id: 'cardio-2', date: '2026-09-18', time: '11:00', specialty: 'Cardiología', available: 4 },
  { id: 'cardio-3', date: '2026-09-24', time: '15:30', specialty: 'Cardiología', available: 1 },
  { id: 'derma-1', date: '2026-09-17', time: '10:00', specialty: 'Dermatología', available: 0 },
  { id: 'general-1', date: '2026-09-16', time: '08:30', specialty: 'Medicina general', available: 6 },
]
export const getReference = (document: string): Reference | undefined => patients.find((p) => p.document === document)?.reference
export const getSlots = (specialty: Slot['specialty']) => slots.filter((slot) => slot.specialty === specialty && slot.available > 0)
export const reserveSlot = (slotId: string, document: string): Appointment | undefined => {
  const slot = slots.find((item) => item.id === slotId)
  if (!slot || slot.available < 1) return undefined
  slot.available -= 1
  return { ...slot, document, code: `T-${Math.floor(100000 + Math.random() * 900000)}` }
}
export const metrics: SessionMetrics = { attempts: 48, derivations: 7, abandoned: 3, screenTimes: { Inicio: 18, Identificación: 34, Selección: 52, Confirmación: 16 } }
export const exportMetrics = () => {
  const rows = [['Métrica', 'Valor'], ['Ingresos', String(metrics.attempts)], ['Derivaciones', String(metrics.derivations)], ['Abandonos', String(metrics.abandoned)], ...Object.entries(metrics.screenTimes)]
  return `data:text/csv;charset=utf-8,${rows.map((r) => r.join(',')).join('%0A')}`
}
