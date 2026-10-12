# Mejoras SEO de Nexovate

> Unificar la identidad de Nexovate en su dominio argentino y mejorar su descubrimiento por empresas y pymes que necesitan software a medida y automatización.

**Feature:** seo-improvements · **Definition revision:** SPEC-1
**Plan y tareas:** [task.md](task.md)

## Problema y resultado esperado

La auditoría del 12 de octubre encontró señales de dominio incorrectas, idiomas inconsistentes, ausencia de JSON-LD, entrega innecesariamente pesada del logo y oportunidades de contenido comercial. El usuario solicita ejecutar las mejoras. Confirmó como público principal empresas y pymes de Argentina que necesitan software a medida y automatización.

El dominio nuevo ya está operativo: las solicitudes a nexovate.com.ar/es terminan en https://www.nexovate.com.ar/es y ambas portadas localizadas responden 200. El HTML publicado aún declara nexovate.net como canónica. Quitar el dominio anterior de Vercel no modifica el código de metadata.

## Alcance

- Origen definitivo https://www.nexovate.com.ar, URLs canónicas por página, hreflang, sitemap, robots y metadatos sociales coherentes.
- Español como idioma de respaldo para el mercado confirmado; conservar inglés, detección de idioma y selector accesible.
- JSON-LD real de la organización, sitio y páginas; servicios cuando tengan página propia. Ningún dato comercial inventado.
- Descripciones comerciales claras, etiquetas de navegación accesibles y entrega del logo existente optimizada.
- Carga del calendario al acercarse al contacto, sin perder enlace directo, estados, acceso por teclado ni respaldo sin JavaScript.
- Endurecimiento compatible de cabeceras y cookie de idioma.
- Páginas útiles de los cuatro servicios actuales, español e inglés, con enlaces desde la landing, canonical propia, pares traducidos y sitemap actualizado.
- Inventario factual de identidad y privacidad; incorporar solo canales, perfiles, casos y condiciones que se confirmen. Sin afirmar cumplimiento legal mediante una puntuación.
- Verificación técnica, nueva auditoría comparable y preparación de medición orgánica en Search Console. Accesos externos que falten requieren intervención del usuario.

No se generarán imágenes, capturas, reseñas, testimonios, clientes, direcciones, métricas de resultados ni páginas locales ficticias. No se instalarán herramientas globales. No se tratarán las alertas descartadas del auditor como defectos de la aplicación. Ranking y tráfico son resultados a medir, no criterios que se puedan garantizar al publicar código.

## Comportamiento esperado

Las páginas declararán su identidad correcta sin depender del host recibido. La raíz tendrá una política de idioma consistente con español como respaldo. Cada página de servicio tendrá texto propio relacionado con necesidades reales de empresas argentinas, encabezados claros, enlace de contacto y traducción equivalente. Los enlaces del encabezado y pie funcionarán también fuera de la portada.

El contenido principal se servirá en HTML. El navegador descargará una versión apropiada del logo existente. Cal.com se iniciará cuando el visitante se aproxime a la sección de contacto, conservando sus estados y enlace externo. Las nuevas cabeceras no impedirán agenda, Analytics, imágenes, fuentes ni navegación.

## Criterios de aceptación

- **AC-001 — Identidad y rastreo:** /es y /en declaran canonical propia en www.nexovate.com.ar; HTML, cabeceras y sitemap no discrepan sobre alternates; robots apunta al sitemap correcto; no quedan referencias de runtime a nexovate.net. Rutas inexistentes conservan 404 real.
- **AC-002 — Idiomas:** español es respaldo de idioma no reconocido; español e inglés siguen accesibles, con enlaces recíprocos y x-default consistente. Preferencias reconocidas del usuario siguen funcionando.
- **AC-003 — Entidades y metadatos:** JSON-LD válido con identidad y datos comprobables; las páginas tienen título y descripción propios. Imágenes sociales y favicon son accesibles en el origen definitivo.
- **AC-004 — Accesibilidad:** nombre accesible de Proceso/Process incluye texto visible en escritorio y móvil; navegación, foco y salto al contenido siguen funcionando.
- **AC-005 — Logo:** conservar activo y encuadre aprobado; entregar variantes optimizadas dimensionadas para la visualización. Medir MIME y bytes transferidos frente al PNG original de 373654 bytes. No introducir scroll horizontal en 320, 360, 390, 768 y 1280 px.
- **AC-006 — Calendario:** no se solicita el embed en la carga inicial lejos del contacto; al acercarse se inicia una vez, con estados de carga/ready/error/timeout y enlace externo accesible; limpieza de listeners y temporizadores. Probar éxito y fallo sin crear reservas.
- **AC-007 — Seguridad compatible:** cookie de idioma Secure en HTTPS; cabeceras elegidas comprobadas y compatibles con dependencias reales. CSP verificada primero antes de enforcement; no introducir políticas que rompan scripts, iframes o popups.
- **AC-008 — Servicios:** cuatro servicios actuales con contenido propio ES/EN, un H1 por página, canonical distinta, enlaces correctos hacia contacto/portada, selector entre traducciones equivalentes y URLs incluidas en sitemap. Sin claims, casos ni datos personales no comprobados.
- **AC-009 — Confianza y privacidad:** inventario de canales y terceros documentado; perfiles/casos/contacto y contenido público de privacidad requieren datos confirmados. Un pendiente factual queda explícito, no reemplazado con texto inventado.
- **AC-010 — Verificación y medición:** build, tipos y lint aplicables sin errores nuevos; checks funcionales y revisión independiente aceptados. Auditoría comparable de crawl ES/EN y mobile con falsos positivos separados. Indexación, canónica elegida por Google, consultas y conversiones solo se reportan si hay acceso y evidencia de Search Console/medición real.

## Enfoque propuesto

Centralizar origen, idiomas y rutas SEO en módulos compartidos. Usar Metadata API y rutas de metadata de Next.js para evitar duplicar URLs cuando crezca el sitio. JSON-LD se renderiza en el servidor con escape seguro. Preservar Next.js 14 y next-intl actuales, comprobando APIs de las versiones instaladas antes de aplicar cambios.

Mantener el sistema visual existente, sin rediseñar la landing. Las nuevas páginas reutilizan tipografía, ancho de lectura, controles, encabezado y pie; si la propuesta introduce un cambio material de diseño, se presenta antes de implementarla y se aprueba el estado editable de Pencil.

La política CSP depende de scripts, estilo e integraciones actuales; empezar por observación y usar nonce solo si el modelo de renderizado lo requiere. No agregar unsafe-eval o políticas restrictivas sin evidencia. Mantener caché privada del HTML mientras el idioma/renderizado la exija.

- **Código verificado:** app/layout.tsx, app/[locale]/page.tsx y layout.tsx, app/i18n/index.ts, middleware.ts, public/robots.txt, public/sitemap.xml, next.config.mjs, components/brand-logo.tsx, calendar.tsx, features.tsx, navbar.tsx y footer.tsx, messages/es/index.json y messages/en/index.json.
- **Código nuevo candidato:** lib/seo.ts, datos de servicios, rutas app/sitemap.ts y app/robots.ts, página de servicio localizada, componentes de contenido y checks funcionales acotados.
- **Diseño:** conservar sistema existente; ningún diseño nuevo material aprobado todavía.
- **Riesgos:** rutas/idiomas incorrectos, metadata heredada de portada en páginas interiores, CSP incompatible, cambio de encuadre del logo, agenda que no se inicia. Rollback por unidades de trabajo independientes y commits locales; publicación separada.

## Decisiones abiertas

PLAN-1/SPEC-1 y CONTINUOUS con rama/commits locales aprobados explícitamente el 12 de octubre. Publicación sin autorización. Usuario confirmó que todavía no existen correo/perfiles/casos/política solicitados: usar identidad y canales actuales comprobables, registrar campos faltantes y no inventarlos. Acceso a Search Console pendiente cuando se alcance la tarea de medición.

## Propuesta editorial de servicios

Estructura y rutas aprobadas explícitamente por el usuario el 12 de octubre: Apruebo la estructura y las rutas propuestas. La autorización de publicación sigue siendo separada.

Cada página explica el problema operativo, qué solución se puede construir, un ejemplo identificado como ilustrativo, cómo se define el alcance y qué información llevar a la primera conversación. Cierra con un enlace a contacto y servicios relacionados. Reutiliza el encabezado, pie, tipografía y contenedores existentes; sin una nueva dirección visual.

1. **Software a medida.** ES /es/servicios/software-a-medida; EN /en/services/custom-software. Títulos: Software a medida para empresas en Argentina | Nexovate / Custom software for businesses in Argentina | Nexovate. Explicar sistemas internos y plataformas para clientes; formularios, permisos y estados según la operación. Ejemplo ilustrativo: solicitudes internas desde el ingreso hasta su responsable. Para conversar: usuarios, pasos actuales y herramientas utilizadas.
2. **Automatización de procesos.** ES /es/servicios/automatizacion-de-procesos; EN /en/services/process-automation. Títulos: Automatización de procesos para empresas | Nexovate / Business process automation | Nexovate. Explicar tareas repetidas, reglas y excepciones que necesitan revisión humana. Ejemplo ilustrativo: un pedido genera una tarea sin copiar los datos a mano. Para conversar: frecuencia, reglas y puntos de intervención del equipo.
3. **Seguimiento y trazabilidad.** ES /es/servicios/trazabilidad; EN /en/services/traceability. Títulos: Seguimiento y trazabilidad de procesos | Nexovate / Process tracking and traceability | Nexovate. Explicar estados, responsables e historial de cambios para reconstruir la operación. Ejemplo ilustrativo: seguir una solicitud desde recepción hasta resolución. Para conversar: estados, responsables y datos necesarios en cada paso.
4. **Datos e integraciones.** ES /es/servicios/integracion-de-sistemas; EN /en/services/system-integration. Títulos: Integración de sistemas y datos para empresas | Nexovate / Business system and data integration | Nexovate. Explicar fuentes separadas, identificadores compartidos, frecuencia de actualización y acceso disponible. Ejemplo ilustrativo: reunir planilla y sistema en una vista compartida. Para conversar: fuentes, permisos y datos que se deben relacionar.

Las versiones inglesas mantienen el mismo alcance. El mercado argentino se presenta de forma natural en el contexto comercial; no se repite en cada encabezado. Los ejemplos describen capacidades posibles, no trabajos realizados ni resultados medidos. Plazos, precios, compatibilidad con proveedores particulares, certificaciones y garantías no se publican sin datos confirmados.

