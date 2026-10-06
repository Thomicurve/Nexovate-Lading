# Secuencia mobile y servicios compactos — plan y tarea

**Definición:** [spec.md](spec.md) · **Feature:** landing-card-layout
**Plan:** PLAN-1 · **Definición cubierta:** SPEC-1

## Forma de trabajo

- **Estado:** DONE; criterios, controles, revisión independiente y unidad local de código verificados. Cierre documental incorporado en la misma unidad local.
- **Modo:** CONTINUOUS. El 6 de octubre de 2026, el usuario respondió afirmativamente a la propuesta de implementar PLAN-1 en CONTINUOUS: «Si apruebo el plan y el diseño asi que comienza con la implementación».
- **Aprobación:** APPROVE_CURRENT_PLAN, SPEC-1/PLAN-1 y LANDING-COMPOSITION-1 aprobados mediante esa respuesta. Cubre TASK-001, preparación de rama, controles/revisión y un commit local según la pregunta presentada; sin publicación ni merge.
- **Diseño:** LANDING-COMPOSITION-1 en `nexovateLandingDesign.pen`: `Nhvgd` desktop servicios, `pC0tn` mobile servicios, `pxdLt` mobile proceso. Designer DESIGN_APPROVED tras revalidación textual del 6 de octubre de 2026, sin cambios ni clipping estructural; pruebas runtime pendientes.
- **Primera tarea:** TASK-001.
- **TDD:** OFF propuesto: cambio de composición sin lógica de negocio ni runner de tests declarado. No agregar tests que reflejen clases CSS; verificar comportamiento y layout reales.
- **Entrega propuesta:** una unidad coherente WU-001, rama de requisito `codex/landing-card-layout` desde main en `19692baea0760cc9ac8b9d32b72f4121ffe00a51`, un commit local después de controles y revisión independiente. La aprobación del plan debe cubrir rama y commit. Publicación, PR, merge y despliegue quedan sujetos a solicitud específica.
- **Baseline:** checkout limpio en main al explorar. El documento Pencil contiene diseño histórico con diferencias respecto a la aplicación actual; usar muestras nuevas de secciones afectadas, no copiar frames antiguos completos.

## TASK-001 — Conectar proceso mobile y compactar servicios

**Estado:** DONE · **Criterios:** AC-001 a AC-005 · **Dependencias:** ninguna.

Implementer aplica el diseño aprobado en ambos componentes y se detiene. Reviewer inspecciona el candidato y la evidencia después de detener al escritor. Delivery prepara la rama antes de la implementación y realiza el commit local de la unidad aceptada.

- **Archivos permitidos de aplicación:** `components/project-timeline.tsx`, `components/features.tsx`. Solo Orchestrator actualiza estos dos documentos de planificación; Designer modifica el documento Pencil.
- **Termina cuando:** todos los criterios pasan, diseño aprobado revalidado por Designer, controles observados, revisión independiente APPROVED y commit local verificado.
- **Controles:** `npm run lint`; `npx --no-install tsc --noEmit --incremental false`; `npm run build` sin servidor dev concurrente sobre `.next`; `git diff --check`. DOM/layout de `/es` y `/en` a 375/768/1440 px: cuatro servicios y cuatro pasos, números/conectores correctos por breakpoint, orden accesible, texto completo y ausencia de overflow antes/después de revelar. Comprobar reduced-motion y conservar interacción de PixelCard. Sin capturas, renders ni exports.
- **WU-001:** ambos ajustes responsive, forecast 100–220 líneas añadidas más eliminadas en dos componentes, confianza media, más documentos. Commit propuesto `fix: connect mobile process and balance service cards`. Una entrega cohesiva; sin PR solicitado.
- **Resultado:** unidad WU-001 en commit local `fix: connect mobile process and balance service cards` de `codex/landing-card-layout`, con padre `19692baea0760cc9ac8b9d32b72f4121ffe00a51`; localizar mediante historial de estos archivos. Fuente: 53 añadidas/104 eliminadas, hashes revisados abajo preservados. Lint/tipos/build/diff-check exit 0, repetidos tras ajustar padding timeline a 20/24. Lint/build escalados por EPERM del sandbox sin instalación. Build completó tras pausar exclusivamente dev del proyecto; arranque original restaurado en localhost:3000 tras resolver proxy middleware con binding restrictivo. DOM ES/EN a 375/768/1440 pasa: scrollWidth igual a clientWidth antes/después de revelar, cuatro servicios/pasos, opacidades finales 1, texto completo, tres conectores mobile de 48 px y ninguno final, desktop alternado y sin conectores mobile. Canvas y handlers PixelCard conservados; click de tarjeta sin error. Sin errores JS; advertencias heredadas flags/calendario. Reduced-motion verificado por fuente useReducedMotion/initial=false/duración 0; emulación de preferencia no disponible en navegador actual. Criterios y revisión aceptados, Delivery verificó commit/parent, selección exclusiva y fuentes sin cambios.
- **Revisión:** Reviewer APPROVED para unidad y cierre integrado, sin hallazgos bloqueantes ni cambios requeridos. Cubre AC-001–005. Considera suficiente la evidencia de reduced-motion en fuente y no material la diferencia de ancho mobile por contenedor existente/scrollbar. Candidato revisado SHA256 features `120D5C2CEE13B4B0A79D80EEE9D2A7C6C67C24F101E87BD624DB09435475597D`, timeline `9F5C51CD238B3E7B28EADEB262CA103D73323B841ADD4DF0BDC62A6DE5B65D1F`. Reutilizar aceptación si estas fuentes permanecen sin cambios.

## Próximo paso

**No hay tareas pendientes.** TASK-001 DONE bajo CONTINUOUS aprobado el 6 de octubre de 2026. El veredicto de WU-001 cubre cierre integrado y no se repite sobre las mismas fuentes. Cierre documental final en la misma unidad local, sin cambios de aplicación después de review. Landing disponible en `http://localhost:3000/es#process`. Sin push, PR, merge ni despliegue realizados o autorizados.
