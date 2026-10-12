# Mejoras SEO de Nexovate — plan y tareas

**Definición:** [spec.md](spec.md) · **Feature:** seo-improvements
**Plan revision:** PLAN-1 · **Definition covered:** SPEC-1

## Forma de trabajo

- **Execution mode:** CONTINUOUS.
- **User's mode choice:** respuesta explícita del usuario del 12 de octubre: Apruebo: ejecución continua y commits locales.
- **Plan approval:** APPROVE_CURRENT_PLAN, PLAN-1/SPEC-1, respuesta explícita del usuario del 12 de octubre a la pregunta que incluyó seis tareas, español como respaldo, cuatro servicios en ambos idiomas, rama y commits locales.
- **Mercado confirmado:** empresas y pymes de Argentina que necesitan software a medida y automatización, respuesta del usuario del 12 de octubre.
- **First task:** TASK-001 después de aprobar plan, modo y entrega local.
- **Checkout:** E:/Freelance/Nexovate-Website; origen actual main; HEAD/base 8ef964c0143323615aa2a079f08f5b4a26c94372; remote origin https://github.com/Thomicurve/Nexovate-Website.git.
- **Baseline ajena a conservar:** .codex/config.toml modificado; skill redesign-existing-projects y activos nexovate-logo.svg/nexovate-mark.png sin seguimiento. Skill SEO, tools y auditoría del turno anterior existen sin seguimiento; no agregarlos a commits indiscriminadamente.
- **TDD:** propuesta OFF para comportamiento, con pruebas funcionales observadas después; N/A para copy y metadata pasiva. No hay runner de tests de aplicación configurado. Usar herramientas locales existentes para checks relevantes sin instalar un framework global.
- **Checks comunes:** npm run build; npx tsc --noEmit; npm run lint no interactivo si está configurado, o registrar el bloqueo de configuración sin instalar/configurar incidentalmente. Servir build local y verificar DOM/respuestas/comportamiento con Playwright disponible en tools/seo-runtime; sin screenshots, grabaciones ni reservas.
- **Delivery propuesta:** una rama local codex/seo-improvements en el checkout actual, creada/reutilizada por Implementer Delivery; commits locales por unidad revisada, preservando cambios ajenos. Rama y commits locales autorizados en la confirmación de plan del usuario. Push, PR, merge y despliegue no autorizados por esta preparación.
- **Roles:** un Implementer para una tarea por invocación; detener escritor antes de Reviewer. TASK-001/004 requieren además verificación independiente por alcance de rutas/seguridad. Orchestrator conserva decisiones y estado. Ningún escritor paralelo ni worktree.
- **Forecast:** aproximadamente 850–1400 líneas de adiciones+borrados autorales, 18–28 archivos, confianza media; el mayor desconocido es contenido por servicio/CSP. Activos binarios generados: ninguno. Las unidades amplias de contenido se separan por resultado, no para eludir revisión.

CONTINUOUS avanzará una tarea a la vez dentro de PLAN-1, con checks/review/commit, y se detendrá por bloqueos, cambios materiales o interrupción. ASK_EACH_TASK pedirá continuar después de cada tarea aceptada. Accesos y datos comerciales que falten no se inventan ni se consideran aprobados por silencio.

## Tareas

### TASK-001 — Dominio, idiomas y rastreo coherentes

**Status:** DONE · **Criteria:** AC-001, AC-002.

Centralizar origen y rutas; corregir canonical, metadataBase, alternates, OG/Twitter, robots y sitemap. Español como respaldo; conservar detección de idiomas válidos. Evitar hreflang contradictorio entre middleware y HTML. No implementar redirección de un dominio .net que no se controla.

- **Depends on:** aprobación/mode/entrega local.
- **Allowed files:** lib/seo.ts, app/layout.tsx, app/[locale]/layout.tsx, app/[locale]/page.tsx, app/i18n/index.ts, middleware.ts, app/robots.ts, app/sitemap.ts, public/robots.txt, public/sitemap.xml; checks SEO en tools/seo-* o tests/seo-* si se necesitan; specs/seo-improvements solo Orchestrator.
- **Done when:** HTML ES/EN, raíz por preferencias reconocidas/no reconocidas, rutas 404 y XML/robots cumplen AC; checks, verificación independiente y Reviewer aceptados; commit local verificado.
- **Checks:** comunes; GET /es y /en, root con Accept-Language es/en/desconocido y cookie; pares alternates exactos; ninguna URL .net en código runtime; sitemap/robots válidos sin rutas duplicadas.
- **Work units:** WU-001, 120–200 líneas, 5–8 archivos, confianza alta; commit propuesto fix(seo): align domain and localized crawl signals.
- **Result reference:** WU-001 en commit local verificado dc162455dbe5318b1a12fa85306dc6fa7758c301, codex/seo-improvements, padre 8ef964c0143323615aa2a079f08f5b4a26c94372. Build, TypeScript y lint instalados exit 0; único warning de lint preexistente en Orb.tsx:292. Check tools/seo-task001.mjs exit 0; verificador independiente confirmó canonical único, tres alternates exactos, navegación sin JS, preferencias/cookies, cuatro 404, XML válido y origen independiente de Host/X-Forwarded-Host. Reviewer WU-001 APPROVED, sin findings. Usar CLIs instalados para tipos/lint; checks elevados funcionaron sin alterar package/lock/tsconfig. Staging vacío y baseline ajena preservada.

### TASK-002 — Identidad estructurada, snippets y accesibilidad

**Status:** DONE · **Criteria:** AC-003, AC-004.

Agregar Organization/WebSite/WebPage con datos reales y escape JSON-LD; mejorar meta descriptions ES/EN y nombres accesibles. No añadir ratings, dirección ni perfiles no verificados. Mantener títulos descriptivos y ajustar metadata de páginas interiores en TASK-005.

- **Depends on:** TASK-001.
- **Allowed files:** lib/seo.ts, components/structured-data.tsx, app/[locale]/page.tsx, app/layout.tsx, messages/es/index.json, messages/en/index.json, components/navbar.tsx; checks SEO acotados.
- **Done when:** JSON-LD parseable, IDs/URLs correctos, atributos y nombres accesibles coherentes por idioma; Reviewer y commit local aceptados.
- **Checks:** comunes; parse JSON-LD desde HTML, escape de caracteres peligrosos, IDs estables, metadatos únicos y nombres de Proceso/Process en ambas navegaciones.
- **Work units:** WU-002, 100–170 líneas, 4–7 archivos, confianza alta; feat(seo): describe Nexovate and improve search metadata.
- **Result reference:** WU-002 en commit local verificado 1b53adf199f573da8fab58d7e9c74a76f83a30a4, padre dc162455dbe5318b1a12fa85306dc6fa7758c301; 55 líneas de aplicación y 96 de checks. Build/tipos/lint exit 0 con warning Orb preexistente. Check tools/seo-task002.mjs exit 0: JSON-LD server parseable, IDs/referencias, escape adversarial, metadata distinta ES/EN, labels y teclado/foco/salto al contenido; activos sociales/favicon publicados 200. Reviewer APPROVED sin findings. Staging vacío y baseline ajena preservada.

### TASK-003 — Entrega del logo y calendario diferido

**Status:** DONE · **Criteria:** AC-005, AC-006.

Optimizar la entrega del PNG existente mediante Next Image con sizes adecuados y conservar recorte. Iniciar calendario al aproximarse al contacto. Mantener enlace directo, respaldo sin JS y errores. Ajustar caché solo para recursos versionados/controlados.

- **Depends on:** TASK-002.
- **Allowed files:** components/brand-logo.tsx, components/calendar.tsx, components/contact.tsx, next.config.mjs, messages/es/index.json y messages/en/index.json si el estado diferido necesita texto; checks funcionales acotados. Ningún archivo gráfico nuevo.
- **Done when:** solicitudes/peso y formato registrados, logo sin overflow ni cambio de proporción; calendario se inicia una vez al acercarse y responde a fallos; Reviewer y commit local aceptados.
- **Checks:** comunes; medir transferencias desde build producción; geometría en 320/360/390/768/1280; interceptar tráfico Cal.com antes/después del scroll; simular fallo de script/timeout; verificar teclado/enlace sin enviar reservas.
- **Work units:** WU-003, 100–180 líneas, 3–6 archivos, confianza media; perf(landing): defer calendar and size brand image delivery.
- **Result reference:** WU-003 en commit local verificado f5fd206f531572010fa38ba60dae038d4a7ef37a, padre 1b53adf199f573da8fab58d7e9c74a76f83a30a4; 41 líneas aplicación +147 checks. Build/tipos/lint y tools/seo-task003.mjs exit 0; warning Orb preexistente. Sin overflow en cinco anchos, recorte preservado. Original 373654 bytes; AVIF 192/256/384/480 px: 2762/3772/5332/6740 bytes, WebP: 3148/4478/7232/9372. Cal emulado y real: cero solicitudes iniciales, una al acercarse, ready real; fallo script/link y timeout comprobados, foco/enlace/respaldo sin JS, limpieza real de observer/listeners/timer. Reviewer APPROVED sin findings. Staging vacío y baseline ajena preservada.

### TASK-004 — Seguridad compatible e inventario de privacidad

**Status:** DONE · **Criteria:** AC-007, AC-009.

Revisar cookie, cabeceras y dependencias reales. Aplicar Referrer-Policy y Permissions-Policy compatibles, determinar COOP apropiado; observar CSP antes de enforcement. Elaborar inventario factual de Analytics, Cal.com y WhatsApp y solicitar datos mínimos pendientes antes de contenido público de privacidad/perfiles. No agregar un banner sin identificar su necesidad real.

**Inventario factual:** identidad pública Nexovate y biografías de Thomas Curvelo Ferrer/Juan Lucas Cuenca; contacto existente en WhatsApp (https://wa.me/message/QEX2LSMCN5A6D1) y agenda Cal.com (https://cal.com/nexovate-o7uzwd/15min). Cal carga script/iframe al aproximarse a contacto; WhatsApp es un enlace, sin SDK de seguimiento integrado. Analytics está integrado en el layout; su recepción en Vercel requiere validación publicada. Según [documentación de Vercel](https://vercel.com/docs/analytics/privacy-policy), Web Analytics usa estadísticas agregadas sin cookies de terceros y puede registrar URL, referrer, dispositivo y ubicación aproximada. La preferencia NEXT_LOCALE es independiente. Manrope se entrega como fuente local de Next; los preconnects de Google existentes no prueban descarga de una fuente externa.

**Datos pendientes:** el usuario confirmó que todavía no existen correo público, perfiles, casos autorizados ni política de privacidad. No se agrega una ruta pública de privacidad con hechos inventados. Para prepararla posteriormente faltan responsable y canal de consultas de datos, usos/retención reales de consultas y reservas, configuración de proveedores y validación de esos términos. Este contenido público es condicional en PLAN-1; la presente tarea conserva inventario y pendientes explícitos.

- **Depends on:** TASK-003.
- **Allowed files:** next.config.mjs, middleware.ts, lib/seo.ts; footer/traducciones y ruta de privacidad solo con hechos/datos confirmados y alcance revisado; checks de cabeceras acotados.
- **Done when:** cabeceras/cookie y terceros funcionan, prueba independiente de seguridad compatible y Reviewer aceptados; inventario y pendientes explícitos; commit de los cambios verificados. Si faltan datos indispensables para contenido público, conservar tarea pendiente y consultar.
- **Checks:** comunes; inspeccionar cookie HTTPS; navegación, carga de Next, embed, Analytics y enlaces externos; observar violaciones CSP; no reportar ausencia de violations como prueba de seguridad completa.
- **Work units:** WU-004, 100–180 líneas, 3–6 archivos, confianza media/baja hasta observar política; fix(security): harden headers without breaking integrations.
- **Result reference:** WU-004 en commit local verificado 67d8cb65e9d61d2c603409ec21a18e9c63efb121, padre f5fd206f531572010fa38ba60dae038d4a7ef37a; 35 líneas aplicación +94 checks. Build/tipos/lint y tools/seo-task004.mjs exit 0; warning Orb preexistente. Verificación independiente exit 0: cabeceras/cookie/preferencias y navegación, Cal real ready/200, logo/fuentes, destinos/opener; probes script-src y connect-src reportan y permiten ejecución/respuesta. Reviewer APPROVED sin findings. CSP sigue Report-Only sin collector ni enforcement; observación padre local. HTTPS de navegador simulado; Analytics local 404, compatibilidad script/POST simulada y script publicado antiguo 200. Candidato TLS/recepción Analytics pendientes de publicación. Inventario y datos de privacidad pendientes explícitos. Staging vacío y baseline ajena preservada.

### TASK-005 — Contenido por servicio para empresas argentinas

**Status:** IN_PROGRESS · **Criteria:** AC-008, AC-009.

Preparar y revisar contenido propio para software a medida, automatización, seguimiento/trazabilidad y datos/integraciones en ES/EN. Rutas propuestas /es/servicios/{software-a-medida,automatizacion-de-procesos,trazabilidad,integracion-de-sistemas} y equivalentes /en/services/{custom-software,process-automation,traceability,system-integration}. Confirmar slugs y estructura editorial antes de publicación; conservar el sistema visual. Agregar enlaces útiles desde cards/pie y navegación que funcione fuera de portada. Casos/perfiles solo cuando se aporten datos verificables.

- **Depends on:** TASK-004. Usuario aprobó explícitamente la propuesta editorial y rutas de spec.md el 12 de octubre: Apruebo la estructura y las rutas propuestas. Si aparece diseño material, aprobación editable Pencil antes de ese cambio.
- **Allowed files:** datos/SEO en lib/seo.ts y lib/services.ts; rutas localizadas de servicio dentro de app/[locale]; components/service-page.tsx, features.tsx, navbar.tsx y footer.tsx; traducciones ES/EN, app/sitemap.ts. Sin nuevos estilos globales materiales ni imágenes.
- **Done when:** cuatro pares de páginas útiles con HTML, enlaces y metadata propios, equivalencia de selector por slug localizado, sitemap correcto y 404 para servicios desconocidos; contenido real revisado, checks/Reviewer y commits aceptados.
- **Checks:** comunes; rastrear todas las rutas, un H1, títulos/canonical únicos, JSON-LD de página/servicio, selector ES↔EN, CTA de vuelta a contacto, navegación a secciones existentes y viewport sin scroll.
- **Work units:** WU-005A, infraestructura/rutas/navegación, 180–300 líneas; WU-005B, textos/páginas/enlaces, 200–350 líneas; confianza media. Commits feat(seo): add localized service routes y content(seo): explain Nexovate services for Argentine businesses. Revisar candidato conjunto y divisiones coherentes antes de entrega; si >400 líneas inseparables, explicar división/alcance al usuario.
- **Result reference:** WU-005A en commit local verificado 1e903a58a9ee9d6cd145fe734b48bd61f40137e9, padre 67d8cb65e9d61d2c603409ec21a18e9c63efb121; 243 líneas aplicación +115 check, once archivos. Build/tipos/lint y tools/seo-task005a.mjs exit 0 con Orb preexistente. Ocho rutas sin JS, H1/metadatos únicos, canonical/alternates/social/grafo de cinco entidades; sitemap diez URLs, once rutas inválidas más fr/mayúsculas 404. Teclado/navegación/selector/CTA desktop y móvil, sin overflow en cinco anchos. Reviewer WU-005A APPROVED sin findings. Unidad funcional con copy existente, staging vacío y baseline preservada. WU-005B editorial todavía requerida para cerrar tarea.
- **WU-005B:** candidata sobre 1e903a58a9ee9d6cd145fe734b48bd61f40137e9; 210 líneas aplicación +60 checks. Ocho contenidos equivalentes y cuarenta cuerpos distintos en las cinco secciones aprobadas; ejemplos hipotéticos explícitos, metadata/OG/Twitter/WebPage/Service igual a introducción visible. Build/tipos/lint y tools/seo-task005b.mjs exit 0; warning Orb preexistente. Ocho HTML sin JS, contenido/encabezados/grafo/CTA/relacionados y cinco anchos sin overflow. Reviewer WU-005B y cobertura TASK-005 APPROVED sin findings; pruebas WU-005A sin cambios reutilizadas. Commit pendiente.

### TASK-006 — Auditoría final y medición orgánica

**Status:** TODO · **Criteria:** AC-010.

Reutilizar checks aceptados sin repetir suites idénticas. Comprobar integración completa del candidato y auditoría local de producción. Preparar propiedad Search Console, sitemap e inspección de URLs; usar acceso real cuando esté disponible, detener la acción dependiente si requiere autenticación/datos. Tras publicación autorizada, auditar el dominio definitivo con crawl y móvil comparables. Estado publicado y estado local se informan por separado.

El usuario confirmó el 12 de octubre que nexovate.com.ar todavía no está configurado en Search Console. Preparar instrucciones de verificación y envío del sitemap; alta/verificación efectiva, inspección de URLs y métricas orgánicas quedan pendientes de acceso/autenticación y publicación.

- **Depends on:** TASK-005; autorización y capacidad de publicación para comprobaciones posdeploy; acceso de usuario a Search Console para lectura/configuración externa.
- **Allowed files:** checks tools/seo-* y documentación mínima existente del proyecto; estado solo Orchestrator. Ninguna reimplementación incidental de tareas cerradas ni alta de cuentas/integraciones globales.
- **Done when:** criterios de integración aceptados, resultados de auditoría medidos, gaps externos explícitos; commits locales verificados. No declarar indexación/ranking efectivos sin evidencia.
- **Checks:** producción local y rutas completas, crawl y --mobile de SEOmator5.1, sin capturas; comparar fallos concretos con auditoría original; revisar URLs seleccionadas por Google solo con sesión autenticada. Datos de INP/campo permanecen pendientes si no existen.
- **Work units:** WU-006, 50–100 líneas de checks/documentación, confianza media; test(seo): verify localized site integration.
- **Result reference:** pendiente.

## Siguiente paso

- **Feature state:** IMPLEMENTING.
- **Next task:** TASK-005.
- **Continuation:** COVERED_BY_CONTINUOUS_PLAN.
- **User decision:** PLAN-1/SPEC-1 y CONTINUOUS con rama y commits locales aprobados explícitamente el 12 de octubre.
- **Consumed by:** TASK-004 entregada en 67d8cb65e9d61d2c603409ec21a18e9c63efb121; TASK-005 cubierta por CONTINUOUS y aprobación editorial explícita.


