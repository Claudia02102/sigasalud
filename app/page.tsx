'use client'
import { useEffect, useState } from 'react'
import { Confirmacion, Comprobante, Derivacion, Especialidades, Identificacion, Inicio, Ingreso, Metricas, Seleccion, Verificacion, Cupos } from '@/components/kiosco-screens'
import type { Appointment, Screen, Slot } from '@/lib/types'
import { reserveSlot } from '@/lib/registro-simulado'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('inicio')
  const [document, setDocument] = useState('12345678')
  const [selected, setSelected] = useState<Slot | null>(null)
  const [specialty, setSpecialty] = useState<Slot['specialty'] | undefined>()
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [help, setHelp] = useState(false)

  useEffect(() => { if (screen === 'comprobante') { const timer = setTimeout(() => setScreen('inicio'), 20000); return () => clearTimeout(timer) } }, [screen])
  const navigate = (next: Screen) => { if (next === 'verificacion' && !document) setDocument('12345678'); if (next === 'comprobante' && selected) setAppointment(reserveSlot(selected.id, document) ?? null); setScreen(next) }
  const back = () => setScreen(screen === 'cupos' ? 'inicio' : screen === 'especialidades' ? 'verificacion' : screen === 'seleccion' ? (specialty ? 'especialidades' : 'verificacion') : screen === 'confirmacion' ? 'seleccion' : 'inicio')
  if (screen === 'ingreso') return <Ingreso />
  if (screen === 'metricas') return <Metricas />
  const props = { onNavigate: navigate, onHelp: () => setHelp(true) }
  return <><div className="demo-controls"><button onClick={() => setScreen('ingreso')}>Ingreso</button><button onClick={() => setScreen('metricas')}>Métricas</button></div>{screen === 'inicio' && <Inicio {...props} />}{screen === 'cupos' && <Cupos {...props} />}{screen === 'identificacion' && <Identificacion {...props} onBack={back} />}{screen === 'verificacion' && <Verificacion {...props} onBack={back} document={document} />}{screen === 'especialidades' && <Especialidades {...props} onBack={back} document={document} onSpecialty={setSpecialty} />}{screen === 'seleccion' && <Seleccion {...props} onBack={back} document={document} specialty={specialty} onSelected={setSelected} />}{screen === 'confirmacion' && selected && <Confirmacion {...props} onBack={back} document={document} selected={selected} />}{screen === 'comprobante' && appointment && <Comprobante {...props} appointment={appointment} />}{screen === 'derivacion' && <Derivacion {...props} reason="No fue posible completar la consulta." />}{help && <div className="help-overlay" role="dialog" aria-modal="true"><div className="help-modal"><h2>Estamos para ayudarte</h2><p>Acercate al personal de recepción. Te van a acompañar con tu turno.</p><button onClick={() => setHelp(false)}>Cerrar</button></div></div>}</>
}
