export type Screen = 'inicio' | 'identificacion' | 'verificacion' | 'seleccion' | 'confirmacion' | 'comprobante' | 'derivacion'
export type Status = 'vigente' | 'vencida' | 'no-encontrada'
export type Specialty = 'Cardiología' | 'Dermatología' | 'Medicina general' | 'Traumatología'

export type Reference = { specialty: Specialty; origin: string; validUntil: string; status: Status }
export type PatientRecord = { document: string; reference?: Reference }
export type Slot = { id: string; date: string; time: string; specialty: Specialty; available: number }
export type Appointment = Slot & { code: string; document: string }
export type SessionMetrics = { attempts: number; derivations: number; abandoned: number; screenTimes: Record<string, number> }
export type DemoProps = { onNavigate: (screen: Screen) => void; onHelp: () => void }
export const specialties: Specialty[] = ['Cardiología', 'Dermatología', 'Medicina general', 'Traumatología']

export const todayLabel = 'Martes 12 de septiembre'
export const formatDate = (date: string) => new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${date}T12:00:00`))
export const prettyDate = (date: string) => formatDate(date).replace(/^./, (c) => c.toUpperCase())
