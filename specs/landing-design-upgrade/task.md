# Mejora integral de diseño — plan y tareas

**Definición:** [spec.md](spec.md) · **Feature:** landing-design-upgrade
**Plan:** PLAN-2 · **Definición cubierta:** SPEC-2; conserva las seis tareas entregadas de PLAN-1/SPEC-1

## Forma de trabajo

- **Modo:** CONTINUOUS.
- **Decisión del usuario:** «Continuo: completar el plan aprobado», respuesta del 9 de octubre de 2026 a la selección del modo para esta feature.
- **Aprobación del plan:** APPROVE_CURRENT_PLAN; usuario el 9 de octubre de 2026: «Sí, me encanta el diseño, así que apruebo el plan y la propuesta. seguí nomás con la implementación.» Cubre PLAN-1/SPEC-1/AUDIT-REDESIGN-1 y entrega local del plan.
- **Diseño:** DESIGN_APPROVED: AUDIT-REDESIGN-1 aprobado explícitamente por el usuario el 9 de octubre de 2026; JnjQ0 (desktop), anRvV (mobile), DFSEc (estados) en nexovateLandingDesign.pen. Usuario «listo guardado» y archivo de 417267 bytes modificado el 9/10/2026 17:04:48 confirman persistencia. Designer revalidó IDs/tokens/estado sin cambios ni defecto nuevo. Avisos geométricos del proveedor no prueban un defecto visible ni invalidan aprobación.
- **Primera tarea de implementación:** TASK-001, una vez aprobado plan/diseño y preparada la rama.
- **TDD:** OFF propuesto para este rediseño, sin runner de tests declarado; comprobaciones funcionales siguen siendo obligatorias. La aprobación del plan incluye esta estrategia.
- **Entrega:** una rama de requerimiento codex/landing-design-upgrade en el checkout actual, commits locales por unidad revisada. Sin push, PR, merge o despliegue autorizados. Cada tarea para el escritor antes de Reviewer y Delivery.
- **Base observada:** main, HEAD 1fc8cf789328424eee92781ea0951a0e1a1894f7. Cambios previos a preservar: .codex/config.toml y .agents/skills/redesign-existing-projects/. No incluirlos en commits de aplicación.
- **Pronóstico:** 1.250–2.250 líneas autorales agregadas/eliminadas, 22–32 archivos, confianza media; diseño Pencil y lockfile se contabilizan aparte. Una sola integración cohesiva con seis commits de unidades; el umbral de 400 líneas es orientativo. Ajustes materiales se presentan antes de extender alcance.

## Controles comunes

Por cada unidad: diff acotado y git diff --check, TypeScript mediante node node_modules/typescript/bin/tsc --noEmit --incremental false, comprobaciones funcionales afectadas y revisión independiente. Build de Next mediante npm run build al cambiar superficies compartidas y al cierre; npm run lint usa .eslintrc.json existente. Usar runtime/dependencias existentes, sin instalación global. Fallos previos se distinguen de regresiones, no se ocultan.

Verificación DOM/comportamiento sin capturas de /es y /en a 375, 768 y 1440 px: desbordamiento, orden, tamaños y estados; teclado, foco, Escape, anclas, cambio de idioma, movimiento reducido, pestaña oculta y visibilidad cuando corresponda. Verificar reserva y fallback sin enviar una reserva real. Contraste medido de combinaciones relevantes, sin declarar aceptación visual desde estructura solamente. Ningún control genera imágenes. El cierre reutiliza pruebas/revisiones válidas y cubre únicamente integración restante.

## Tareas

### TASK-001 — Sistema visual y base accesible

**Estado:** DONE · **Criterios:** AC-001, AC-009, AC-010, AC-011

Definir tokens del diseño aprobado, Manrope, botones y base semántica/idioma/zoom. Unificar foco, hover y pressed. Incorporar el set de iconos aprobado verificando el paquete; no actualizar dependencias ajenas.

- **Dependencia:** plan/diseño aprobados y rama preparada por Delivery.
- **Archivos:** app/layout.tsx, app/[locale]/layout.tsx, app/[locale]/page.tsx, app/i18n/request.ts, app/globals.css, tailwind.config.js, components/ui/button.tsx, components/ui/card.tsx, messages/{es,en}/index.json, package.json y lockfile existente. Adaptar requestLocale para AC-009/AC-010; mantener ruta ../../messages, que ya era correcta. Sin cambio de idiomas ni arquitectura.
- **Termina:** tokens y controles coherentes, idioma/main/salto/zoom funcionales; typecheck/build, DOM/contraste afectados y revisión aprobados.
- **WU-001:** 220–380 líneas, 8–12 archivos; commit propuesto feat: establish landing visual system.
- **Resultado:** commit 4d5932bea257d5ba26db7745c1c9b418eb58e543. WU-001 de 253 líneas fuente + lock14; tsc/lint/build/diffcheck PASS; DOM ES/EN ×375/768/1440, idioma/main/salto/zoom/Manrope/contraste/reduced-motion PASS. Mensajes finales sin diff y claves únicas. Reviewer APPROVED sobre diff final suministrado. Advertencia Orb previa y recursos/metadata restantes se resuelven en tareas posteriores.

### TASK-002 — Navegación y portada

**Estado:** DONE · **Criterios:** AC-002, AC-003, AC-009, AC-010, AC-011

Implementar barra flotante y menú, sección activa, cortes del título y CTA jerarquizados. Coordinar entrada con logo sin reintroducir gráfico de procesos; retirar o atenuar Orb según diseño aprobado.

- **Dependencia:** TASK-001.
- **Archivos:** components/navbar.tsx, components/hero.tsx, components/animated-brand-mark.tsx, components/animated-section.tsx, hooks/useIntersectionObserver.ts, components/blocks/Backgrounds/Orb.tsx, messages/{es,en}/index.json, app/globals.css.
- **Termina:** menú completa cierre, Escape/foco/scroll correcto, sección activa y anclas funcionales; portada coincide con Pencil; reduced-motion comprobado; revisión aprobada.
- **WU-002:** pronóstico revisado 650–850 líneas agregadas/eliminadas, 4–5 archivos, debido a sustituir navbar existente de 355 líneas y hero de 87. Se conserva una unidad cohesiva, mismos criterios/superficies/tarea y entrega local; el rango inicial no contó adecuadamente eliminaciones de estructura duplicada. Sin cambios de comportamiento, riesgo ni estrategia de entrega. Commit propuesto feat: refine landing navigation and hero.
- **Resultado:** commit df1f0210e028794a1489101be21f2fd92f37ad2d. WU-002 623 líneas/5 archivos; tsc/lint/build/diffcheck PASS; DOM seis variantes ES/EN375/768/1440 sin overflow/errores, anclas/activo/idioma/hero/logo/reduced/SSR legible PASS. Menú cuatro variantes móviles: foco/Escape/cierre100msabierto350mscerrado/scroll PASS. Reviewer pidió corregir destino con hash repetido; scrollIntoView auto añadido y ocho variantes normal/reduced PASS, luego Reviewer APPROVED.

### TASK-003 — Servicios diferenciados

**Estado:** DONE · **Criterios:** AC-004, AC-009, AC-010, AC-011

Construir ejemplos nativos de interfaz específicos para los cuatro servicios y movimiento relacionado con sus estados. Conservar legibilidad y altura compacta; ejemplos ilustrativos, no resultados reales.

- **Dependencia:** TASK-001, TASK-002.
- **Archivos:** components/features.tsx, components/service-illustrations.tsx (nuevo si necesario), components/blocks/Components/PixelCard.tsx, messages/{es,en}/index.json, app/globals.css.
- **Termina:** cuatro servicios identificables, acceso toque/teclado, ejemplos etiquetados, sin recorte ES/EN; pruebas funcionales y revisión aprobadas.
- **WU-003:** 240–420 líneas, 4–6 archivos; commit propuesto feat: illustrate custom software services.
- **Resultado:** commit b53e424cf107d61837eeca2f54321d4cad33eb8d. WU-003 283 líneas/5 archivos; tsc/lint/build/diffcheck PASS; DOM ES/EN ×375/768/1440, cuatro ejemplos etiquetados, clic/Enter/Space/reset/toque, aria-live, reduced-motion y SSR sin JavaScript PASS; sin overflow/canvas/errores. Reviewer APPROVED sobre fuentes y receipts finales.

### TASK-004 — Equipo y proceso

**Estado:** DONE · **Criterios:** AC-005, AC-006, AC-009, AC-010, AC-011

Implementar composición editorial de socios y avance discreto del proceso. Preservar datos/fotos y secuencia desktop/mobile; no inventar entregables o compromisos.

- **Dependencia:** TASK-001, TASK-003.
- **Archivos:** components/about-us.tsx, components/project-timeline.tsx, components/blocks/Backgrounds/Squares.tsx, messages/{es,en}/index.json, app/globals.css.
- **Termina:** dos perfiles reales y secuencia de cuatro pasos conectados, sin ruido de fondos, movimiento reducido y responsive comprobados; revisión aprobada.
- **WU-004:** 200–340 líneas, 4–6 archivos; commit propuesto feat: refine team and project process sections.
- **Resultado:** commit 4000141a19f6f3eaecadef55074f9e4f1b7cf44b. WU-004 210 líneas/3 archivos; tsc/lint/build/diffcheck PASS; DOM ES/EN ×375/768/1440, dos fotos cargadas/bios preservadas, cuatro pasos/orden/tres conectores sin overflow/errores PASS. Animación finita sin reinicio, reduced-motion y lectura sin JS/IntersectionObserver PASS. Reviewer APPROVED.

### TASK-005 — Contacto, reserva y cierre

**Estado:** DONE · **Criterios:** AC-007, AC-008, AC-009, AC-010, AC-011

Integrar CTA/contacto, presentación y estados del calendario, fallback directo, footer compacto y enlace WhatsApp único accesible. Usar la denominación Nexovate por decisión explícita del usuario del 9 de octubre de 2026: «Usar Nexovate; documentos legales pendientes». No crear textos/enlaces legales; quedan fuera de la entrega actual por esa decisión.

- **Dependencia:** TASK-001, TASK-004.
- **Archivos:** components/cta.tsx, components/contact.tsx, components/calendar.tsx, components/footer.tsx, components/chatButton.tsx, app/[locale]/page.tsx, messages/{es,en}/index.json, app/globals.css.
- **Termina:** sin CTA duplicado, estados de carga/fallo comprobados con salida funcional sin reserva real, WhatsApp no obstruye controles, footer coherente; revisión aprobada.
- **WU-005:** pronóstico revisado 500–600 líneas, 7–10 archivos; candidato de 523 líneas/9 archivos (174 altas +349 bajas comprobadas en staging; corrige suma del handoff previo). El crecimiento corresponde a eliminar formularios/chat comentados y estructuras duplicadas de contacto/pie, ya incluidos en el alcance. Se conserva la unidad cohesiva y los mismos criterios, diseño, arquitectura y entrega local. Commit propuesto feat: simplify contact and booking experience.
- **Resultado:** commit 4a0b1796c6029590a0f7040c17a8d484635ef2c0. WU-005 523 líneas/9 archivos; tsc/lint/build/diffcheck y JSON único PASS. DOM ES/EN ×375/768/1440 live Cal ready, contacto/WhatsApp único48px adaptativo/enlaces/foco sin overflow/errores PASS. Estados simulados loading/timeout/ready/error, aborto de script y seis variantes reduced/noJS PASS; ninguna reserva enviada. Reviewer APPROVED.

### TASK-006 — Recursos, movimiento global e integración

**Estado:** DONE · **Criterios:** AC-008, AC-009, AC-010, AC-011

Resolver metadatos y referencias faltantes con assets existentes, manifest de formato/tamaños reales y sitemap de idiomas. Eliminar efectos globales redundantes o pausarlos correctamente. Comprobar integración completa y corregir defectos del alcance aprobado.

- **Dependencia:** TASK-001–TASK-005.
- **Archivos:** app/layout.tsx, app/[locale]/layout.tsx, app/[locale]/page.tsx, components/mouse-move-effect.tsx, components/animated-section.tsx, hooks/useIntersectionObserver.ts, componentes de animación afectados, public/manifest.json, public/sitemap.xml, messages/{es,en}/index.json, app/globals.css. Corregir otros archivos anteriores solo por defectos concretos de integración.
- **Termina:** referencias reales y ES/EN coherentes, pausa/reduced-motion verificadas, typecheck/build y comprobaciones globales pertinentes observadas; revisión de integración y commits aceptados. Documentos legales continúan pendientes por decisión del usuario, sin declararlos implementados.
- **WU-006:** 70–200 líneas, 5–9 archivos; commit propuesto fix: complete landing accessibility and metadata.
- **Resultado:** commit 7af6c6489d3fd33fe64bec3a4fc25d5da53b549e. WU-006 149 líneas/6 archivos; tsc/lint/build/diffcheck y JSON/XML PASS. DOM integración ES/EN ×375/768/1440: metadatos/idioma/main/menú/hash repetido/foco/anclas/WhatsApp/fallback/reduced/noJS sin overflow/errores PASS. Recursos locales200 PNG2172×724 e ICO16/32/48 comprobados. Logo en pausa offscreen/reduced y hidden mediante simulación explícita; contraste TASK-001 reutilizado. Reviewer APPROVED para WU-006 y revisión final de integración.

## Siguiente paso

La entrega de PLAN-1 está completa, con cierre documental a752a94d127ebb6c0cc55812dd75a3cbc5495c8d. El usuario solicitó después un ajuste material de fondo/procesos/servicios; PLAN-2 añade únicamente TASK-007 y TASK-008. La autorización previa de PLAN-1 no se interpreta como aprobación de esta propuesta nueva.

- **Próxima tarea:** ninguna; TASK-001–TASK-008 DONE y revisión final de PLAN-2 aprobada.
- **Continuación:** COVERED_BY_CONTINUOUS_PLAN; aprobación del diseño con correcciones expresas recibida: loop al seleccionar ejemplos y ventajas/desventajas. Guardado y DESIGN_APPROVED confirmados; no pedir aprobación repetida.
- **Siguiente acción:** entrega local completada sobre codex/landing-design-upgrade; HEAD de aplicación10654f69f49d351646d918615ddf66c6709f9345. Las animaciones se implementaron y comprobaron, además de la aprobación visual del candidato. Cualquier publicación requiere autorización separada.

## PLAN-2 — Ajuste de atmósfera y workflows

**Solicitud:** el usuario pidió luces discretas en el fondo, Dot Field en procesos y una gráfica comparativa de nodos animados para operación manual con Excel frente a soluciones de software, utilizando Motion for React.

**Aprobación del ajuste:** APPROVE_CURRENT_PLAN_WITH_REQUESTED_CHANGES. Usuario: «El diseño me gusta ... no ... botón de reproducir comparación y reiniciar ... cuando se seleccione alguno de los ejemplos ... se reproduzca en loop ... desventajas ... Excel y tareas manuales ... ventajas ... software». SPEC-2/PLAN-2 incorporan exactamente estas correcciones, sin pedir aprobación repetida. Designer revalidó AUDIT-REDESIGN-2 en nexovateLandingDesign.pen: desktop urBWH, móvil tfkOk y estados WO7kj; DESIGN_APPROVED y guardado físico657091 bytes9/10/2026 20:03:05 confirmados junto con respuesta «Listo, guardado». La lectura estructural no prueba geometría por posiciones cacheadas. Aprobación histórica AUDIT-REDESIGN-1 preservada.

**Ejecución:** mismo checkout y rama, dos tareas secuenciales, un escritor y revisión independiente antes de cada commit local. Sin push/PR/merge/despliegue. TDD OFF como en PLAN-1, sin runner nuevo; comprobaciones funcionales obligatorias. Riesgo medio por loops/cancelación/cambio de ejemplo y disposición responsive. Pronóstico adicional 500–900 líneas autorales, 6–9 archivos, confianza media; sin imágenes ni nuevas dependencias.

**Corrección de diseño:** Designer emitió DESIGN_APPROVED tras la decisión expresa y el guardado del usuario «Listo, guardado». Archivo físico657091 bytes9/10/2026 20:03:05. Selectores hawB7/NovMC, pausa MHtAQ/t0p5Jd, listas O2KDBF/zX2ul y Pk0gG/zfK6G; estados Vp9pZ/DRygk/ZonML/XyyKw y reglas z6qGmj vigentes, sin reproducir/reiniciar. Luces y puntos preservados. Persistencia/revalidación completadas. No se declara movimiento runtime ni geometría certificada desde readback cacheado; metadata heredada queda superada por reglas nuevas y aprobación expresa.

### TASK-007 — Luz ambiental y Dot Field

**Estado:** DONE · **Criterios:** AC-012, AC-009, AC-010, AC-015

Añadir luces tenues localizadas en portada/servicios y campo de puntos discreto en procesos. Conservar la lectura y geometría del contenido, la base oscura y el resto de secciones. Decoración estática, sin cursor ni parallax.

- **Dependencia:** aprobación y persistencia del diseño/PLAN-2/SPEC-2; TASK-001–TASK-006 entregadas.
- **Archivos:** app/globals.css, app/[locale]/page.tsx o components/hero.tsx, components/features.tsx y components/project-timeline.tsx según integración de capas.
- **Termina:** capas decorativas no interactivas ni expuestas a lectores de pantalla; contraste y ausencia de overflow comprobados ES/EN ×375/768/1440; reduced/noJS conservan legibilidad; typecheck/lint/build/diffcheck y revisión aprobados.
- **WU-007:** 60–150 líneas, 2–5 archivos; commit propuesto feat: add subtle landing atmosphere.
- **Resultado:** commit8c0e865e866966715edda727a1a424acc8ebfce3. WU-00752 líneas/4 archivos (49 altas+3 bajas); tsc/lint/build/diffcheck y18 variantes ES/EN375/768/1440 normal/reduced/noJS PASS; sin overflow/recortes/pageerrors. Capas estáticas aria-hidden/pointer-none detrás del contenido, luces3.8%/5% y puntos2px/32px. Contraste compuesto conservador muted/luz≥7.30, muted/puntos≈6.71, botonesblackbrand5.24. Reviewer APPROVED.

### TASK-008 — Comparativa de servicios con nodos y Motion

**Estado:** DONE · **Criterios:** AC-013, AC-014, AC-015, AC-009, AC-010

Reemplazar las miniinterfaces individuales por un comparador compartido y selector de cuatro ejemplos de los servicios existentes. Mantener servicios y textos; contar la misma operación manual y centralizada mediante nodos/conexiones, cuello de botella y avance. Al seleccionar, el ejemplo anima automáticamente en loop con Motion ya instalado; sin botones reproducir/reiniciar. Mostrar desventajas manuales y ventajas relacionadas con capacidades de Nexovate, sin métricas o promesas inventadas.

- **Dependencia:** TASK-007 revisada y entregada.
- **Archivos:** components/features.tsx, components/service-illustrations.tsx, components/service-workflow.tsx (nuevo si necesario), messages/{es,en}/index.json, app/globals.css y hook de visibilidad acotado si necesario.
- **Termina:** comparación, cuatro ejemplos y ventajas/desventajas ES/EN legibles en 375/768/1440; etiqueta ilustrativa y cuello reconocibles sin depender del color. Selección clic/Enter/Space/toque inicia loop, cambios rápidos cancelan ejecución anterior, pausa/reanudación discreta funcional y sin foco robado/anuncios repetitivos. Pausa fuera de vista/pestaña oculta y limpieza al cambiar ejemplo/desmontar observadas. Reduced-motion y noJS conservan ambos recorridos. tsc/lint/build/diffcheck, revisión del candidato e integración con navegación/contacto aprobados.
- **WU-008:** 440–750 líneas, 4–7 archivos; unidad cohesiva de comparación/selección/loop y retirada de ejemplos anteriores. Commit propuesto feat: compare manual and optimized workflows.
- **Resultado:** commit ab72328e19ea4423fae873ad3f2ae1faed049b7f. WU-008: 522 líneas fuente, 412 altas/110 bajas en 6 archivos. tsc/lint/build/diffcheck y claves JSON únicas PASS. Seis variantes ES/EN ×375/768/1440 y 24 selecciones clic/toque/Enter/Space PASS: 8 nodos y 4 puntos por ejemplo, foco estable, sin overflow/pageerrors y cuatro servicios conservados. Dos ciclos por ruta en los cuatro ejemplos, pausa/reanudación, visibilidad real y 12 cambios rápidos con limpieza comprobados. Pestaña oculta probada mediante simulación explícita; 18 variantes reduced/noJS/noObserver PASS. Defecto móvil corregido con observación independiente de cada ruta. Integración afectada WhatsApp/Cal PASS; Reviewer APPROVED para WU-008 e integración.
- **Corrección de ritmo:** commit10654f69f49d351646d918615ddf66c6709f9345, 2 altas/2 bajas en service-workflow.tsx: selector a300ms/ease-landing y curva Motion[0.32,0.72,0,1]. tsc/lint/build/diffcheck actualizado PASS. Production1440/375: curva, dos ciclos, pausa/reanudación, 8 cambios rápidos/cleanup y reduced estático PASS, cero errores. Reviewer APPROVED para delta y cierre PLAN-2; TASK-008 completa con ambos commits locales.
