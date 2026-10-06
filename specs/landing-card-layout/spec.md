# Secuencia mobile y tarjetas de servicios compactas

> Hacer visible el recorrido de trabajo en mobile y equilibrar las tarjetas de servicios con su contenido.

**Feature:** landing-card-layout · **Definición:** SPEC-1
**Plan:** [task.md](task.md)

## Necesidad y alcance

En mobile, «Cómo trabajamos» presenta cuatro tarjetas sin los conectores y números visibles en escritorio. Los servicios reservan una altura mínima de 280 px en mobile y 224 px en escritorio, excesiva para las descripciones actuales. El usuario solicita continuidad vertical entre los pasos y tarjetas de servicios mejor proporcionadas.

Se conservan los cuatro pasos, servicios, textos ES/EN, identidad, iconos, efecto PixelCard y composición desktop del proceso. No se modifican hero, equipo, navegación, dependencias ni recursos gráficos.

## Comportamiento y criterios

- **AC-001 — Recorrido mobile:** por debajo de 768 px, los cuatro pasos mantienen su orden, muestran numeración 1–4 y tres conectores verticales azules con flecha entre tarjetas. No hay conector después del último paso; los conectores son decorativos y no requieren movimiento continuo.
- **AC-002 — Proceso desktop:** desde 768 px se conserva el recorrido alternado, línea central, números y distribución actual que el usuario considera correcta.
- **AC-003 — Servicios proporcionados:** una columna mobile y dos desde 768 px; retirar los pisos de altura 280/224 px y dimensionar por contenido, con cabecera icono/título, descripción próxima y padding de 20–24 px. Mantener títulos y texto legibles, sin alturas fijas que corten traducciones.
- **AC-004 — Responsive y movimiento:** ES/EN a 375, 768 y 1440 px sin recortes ni desbordamiento horizontal, también antes de revelar los pasos. Ajustar las entradas del timeline mobile para no desplazar tarjetas fuera del viewport; respetar reduced-motion dentro del componente afectado.
- **AC-005 — Alcance preservado:** conservar copy, anchors, orden de secciones y efecto PixelCard; no modificar su motor. El orden de pasos debe ser comprensible para tecnologías de asistencia, sin anunciar flechas decorativas.

## Enfoque propuesto

Cambios locales en `components/project-timeline.tsx` y `components/features.tsx`, usando layout responsive y conectores nativos de UI. Altura natural de servicios, con alineación consistente de títulos y descripciones. Los conectores explican dirección sin introducir una animación permanente.

**Diseño:** LANDING-COMPOSITION-1, propuesta editable en `nexovateLandingDesign.pen`. Servicios desktop `Nhvgd` (1440×600), servicios mobile `pC0tn` (375×1045), proceso mobile `pxdLt` (375×1091). Tarjetas de servicios propuestas: 528×140 desktop y 327×158–176 mobile; título 18 px, descripción 16 px, icono 28 px, separación de 12 px antes de descripción. Proceso: tarjetas de 327 px de ancho, numeración junto a iconos y tres separadores de 48 px con flecha azul 24×32. Aprobación del usuario confirmada y estado revalidado por Designer; muestras ES verificadas por estructura sin flags de clipping, no es evidencia de aplicación ni validación runtime EN. Borradores propios ocultos `Y9erm` y `le2DF` superseded, fuera de aprobación.

**Aprobación:** usuario aprobó SPEC-1/PLAN-1 y LANDING-COMPOSITION-1 el 6 de octubre de 2026: «Si apruebo el plan y el diseño asi que comienza con la implementación». Revalidación del estado editable antes de escribir aplicación.

**Riesgo:** bajo, limitado a composición responsive y animación de entrada del timeline. Reversión por unidad local de cambios. No hay cambios de datos ni contratos externos.
