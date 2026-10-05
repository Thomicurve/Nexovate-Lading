# Renovación de Nexovate — plan y tareas

**Definición:** [spec.md](spec.md) · **Feature:** software-services-refresh
**Plan:** PLAN-2 · **Definición cubierta:** SPEC-2

## Forma de trabajo

- **Estado:** CHECKING; TASK-001 implementada, escritor detenido para revisión; PLAN-2/DESIGN-2 aprobados y rama verificada.
- **Modo:** CONTINUOUS. El usuario eligió «completar el plan aprobado, consultándote ante bloqueos o cambios importantes» en la respuesta a la pregunta inicial del 5 de octubre de 2026.
- **Aprobación del plan:** APPROVE_CURRENT_PLAN. El usuario respondió «Aprobar PLAN-2 y comenzar la implementación» el 5 de octubre de 2026 a la pregunta que enumera textos/SEO, dos socios/fotos, flujo animado, controles y tres commits locales. Cubre SPEC-2/PLAN-2, TASK-001/002/003 y orden secuencial en CONTINUOUS.
- **Diseño:** DESIGN-2 aprobado explícitamente por el usuario el 5 de octubre de 2026: «perfecto, apruebo el design-2». Documento nexovateLandingDesign.pen; escritorio eojTE y móvil s60AE; flujo rMopj / twdXH, pausa S7XW9m / MUqH3, fotos GffwM/EpLeq y thvo4/u95pBR. Designer revalidó DESIGN_APPROVED sin cambios y se detuvo: lectura textual sin clipping visible, solo navegación desktop oculta. No afirma prueba visual o funcional. El frame vacío inicial bi8Au ya no aparece: origen desconocido, Designer no ejecutó Delete ni lo recreó.
- **Primera tarea:** TASK-001, después de aprobar plan y diseño.
- **TDD:** OFF, confirmado mediante aprobación de PLAN-2 con esa propuesta, sin runner de tests declarado. Se requieren los controles normales; no se afirma un ciclo RED/GREEN.
- **Entrega propuesta:** una rama de requisito y tres commits coherentes, sin publicación. Rama candidata codex/software-services-refresh, desde main en 5fb762136a3247e2c2d84b305c91ae15d365514b. Implementer Delivery verificará y preparará la rama antes de editar aplicación.
- **Agrupación:** single-pr aceptada mediante PLAN-2 para una futura publicación solo si se solicita: una renovación de landing con tres unidades locales para revisión y reversión. Forecast total 520–840 líneas añadidas más eliminadas, confianza media. Cada unidad prevista queda debajo de unas 400 líneas; no se comprime código para cumplir un umbral.
- **Git autorizado:** aprobación de PLAN-2 cubre creación de la rama de requisito y commits de las unidades aceptadas. Push, PR, merge y despliegue requieren una solicitud aparte.
- **Baseline:** no había cambios de aplicación rastreados. Ya eran untracked .agents/, .codegraph/, .codex/, AGENTS.md y nexovateLandingDesign.pen. Preservar y no incluirlos incidentalmente en commits.
- **Integraciones:** Linear no habilitado para este trabajo; no se solicita conexión ni sincronización.

## Controles compartidos

Implementer debe confirmar y registrar la línea base antes de editar. El checkout no contiene node_modules al explorar; la preparación con npm ci usa el lockfile actual sin cambiar dependencias.

1. npm run lint.
2. npx --no-install tsc --noEmit --incremental false.
3. npm run build al cierre de cada unidad que afecte componentes/metadatos y en el candidato final integrado.
4. Comprobar JSON válido, paridad de claves ES/EN, resolución de cada clave consumida y ausencia de oferta principal de agentes/n8n en contenido activo y metadatos.
5. Leer estructura y contenido servido de /es y /en; verificar cuatro servicios, exactamente dos perfiles al cierre, IDs únicos y destinos de navegación/calendario. Para composición, comprobar comportamiento a 375, 768 y 1440 píxeles mediante DOM/layout si hay navegador disponible sin imágenes; no generar capturas, previews ni exports.
6. Revisar foco y nombres accesibles de controles modificados; no enviar formularios ni reservar reuniones de prueba.
   Para TASK-003 comprobar en navegador sin capturas: avance de las cuatro etapas, pausa/reanudación por teclado, reduced-motion estático, suspensión fuera de viewport/pestaña oculta, limpieza de recursos y ajuste en ambos idiomas a los tres anchos. No es suficiente leer el código para afirmar estos comportamientos.
7. git diff --check y revisión independiente de la unidad con el escritor detenido. Cualquier fallo previo se diferencia de una regresión; una prueba requerida no disponible queda registrada como bloqueo, nunca como pass.

Si se requiere preparación del entorno o existe un fallo ajeno al cambio, comunicar el alcance antes de ampliar archivos o dependencias.

## Tareas

### TASK-001 — Reorientar oferta, proceso y metadatos

**Estado:** IN_PROGRESS · **Responsable:** Implementer · **Criterios:** AC-001, AC-002, AC-005, AC-006, AC-007, AC-008.

Actualizar contenido bilingüe de la landing hacia software a medida, automatización, trazabilidad y datos. Sin agregar los perfiles todavía, ajustar presentación y proceso, iconos de servicios/proceso y textos SEO. Sustituir el tratamiento HTML específico de n8n por texto seguro. La IA queda secundaria en la presentación, sin condicionar la oferta.

- **Dependencias:** ninguna tarea; requiere aprobación del plan/diseño y rama verificada.
- **Archivos permitidos:** messages/es/index.json, messages/en/index.json, app/layout.tsx, public/manifest.json, components/features.tsx, components/project-timeline.tsx, components/about-us.tsx, components/hero.tsx. En hero únicamente etiquetas accesibles/texto; ajustes de composición quedan en TASK-002.
- **Termina cuando:** contenido y consumidores coherentes en ambos idiomas; contacto describe la agenda existente; metadatos consistentes; controles relevantes aceptados, revisión APPROVED y commit verificado.
- **Controles:** controles compartidos 1–4, destinos y contenido de 5, 6–7. La comprobación de perfiles y layout final se completa en TASK-002.
- **WU-001:** oferta y descubrimiento coherentes; forecast 200–320 líneas añadidas más eliminadas en ocho archivos, confianza media; commit propuesto feat: reposition landing around software services. Una única agrupación futura con WU-002/WU-003 si se autoriza PR.
- **Resultado:** candidato detenido WU-001, 114 inserciones/113 eliminaciones en ocho archivos. Lint, tipos, build, paridad JSON y HTTP ES/EN pasan; review/commit pendientes. HEAD/base 5fb762136a3247e2c2d84b305c91ae15d365514b.

### TASK-002 — Presentar los socios y afinar la composición

**Estado:** TODO · **Responsable:** Implementer · **Criterios:** AC-003, AC-004, AC-005, AC-007, AC-008.

Incorporar los dos perfiles en AboutUs, sus espacios de foto 4:5 y textos provisionales de cada idioma. Fuentes de foto opcionales centralizadas; placeholder neutro hasta recibir fotos reales. Aplicar ajustes moderados de legibilidad, ancho y espaciado del diseño aprobado a hero/servicios/equipo, conservando orden, fondos y efectos existentes. El hero prioriza contacto y ofrece servicios como segundo botón. La navegación «Sobre nosotros» llega al equipo.

- **Dependencias:** TASK-001 DONE con revisión y commit verificados.
- **Archivos permitidos:** components/about-us.tsx, components/hero.tsx, components/features.tsx, messages/es/index.json, messages/en/index.json. components/navbar.tsx solo si una corrección de etiqueta/foco necesaria para AC-007 afecta el recorrido renovado. No modificar los motores de Orb, Squares ni PixelCard sin una necesidad evidenciada y revisión del alcance.
- **Termina cuando:** existen dos perfiles y espacios de foto reemplazables sin datos reales inventados; composición conforme a DESIGN-2 en desktop/móvil; no hay textos cortados; rutas y navegación se conservan; controles relevantes, revisión independiente y commit local aceptados. El movimiento final corresponde a TASK-003.
- **Controles:** todos los controles compartidos en el candidato final; repetir solo lo afectado tras una corrección.
- **WU-002:** presentación de equipo, fotos provisionales y composición; forecast 140–240 líneas añadidas más eliminadas en cinco o seis archivos, confianza media; commit propuesto feat: introduce founders and refine landing layout. Misma rama y agrupación de WU-001.
- **Resultado:** pendiente.

### TASK-003 — Dar movimiento al flujo de procesos

**Estado:** TODO · **Responsable:** Implementer · **Criterios:** AC-004, AC-005, AC-007, AC-008, AC-009.

Construir el gráfico ilustrativo nativo debajo del hero conforme a DESIGN-2. Cuatro etapas conectadas, señal azul y resaltado secuencial, con pausa/reanudación, versión estática reduced-motion y suspensión cuando no se ve. Mantener Orb en segundo plano. No agregar paquetes, video ni recursos de imagen.

- **Dependencias:** TASK-002 DONE con revisión y commit verificados.
- **Archivos permitidos:** nuevo components/process-motion.tsx, components/hero.tsx, app/globals.css solo estilos/keyframes del gráfico, messages/es/index.json y messages/en/index.json solo contenido/etiquetas de motion.
- **Termina cuando:** animación y controles cumplen AC-009, composición bilingüe/responsive y accesibilidad verificadas funcionalmente; controles completos del candidato integrado, revisión independiente APPROVED y commit verificado.
- **Controles:** todos los controles compartidos, incluyendo comportamiento real del movimiento sin imágenes. Repetir solo lo afectado después de correcciones.
- **WU-003:** motion graphic completo y accesible; forecast 180–280 líneas añadidas más eliminadas en cuatro o cinco archivos, confianza media; commit propuesto feat: animate the operational process flow. Misma rama/agrupación, cierre de feature tras prueba integrada.
- **Resultado:** pendiente.

## Próximo paso

- **Siguiente tarea:** TASK-001.
- **Continuación:** COVERED_BY_CONTINUOUS_PLAN, SPEC-2/PLAN-2 aprobado y DESIGN-2 revalidado sin cambios el 5 de octubre de 2026.
- **Decisión del usuario:** CONTINUOUS, DESIGN-2 («perfecto, apruebo el design-2») y PLAN-2 («Aprobar PLAN-2 y comenzar la implementación») confirmados por decisiones separadas.
- **Acción actual:** revisar WU-001 con escritor detenido; si APPROVED, Delivery hace commit solo de los ocho archivos verificados antes de TASK-002.
