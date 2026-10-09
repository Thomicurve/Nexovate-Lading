# Nexovate: identidad, interacción y movimiento por sección

> Dar carácter propio a cada sección y mostrar cómo Nexovate ordena la operación, con movimiento intencional y un recorrido de contacto claro.

**Feature:** landing-design-upgrade · **Definición:** SPEC-2 (ajuste de fondo y comparativa; conserva SPEC-1)
**Plan y tareas:** [task.md](task.md)

## Necesidad

El usuario considera la landing aburrida y pidió implementar todos los puntos de la auditoría realizada con redesign-existing-projects. La estructura repite títulos centrados y tarjetas oscuras pese a tener varios efectos. La mejora debe diferenciar secciones, explicar servicios visualmente y corregir navegación, accesibilidad, movimiento y contacto.

## Alcance

- Tipografía, jerarquía, superficies, espaciado, radios, iconografía y estados de controles coherentes.
- Navegación flotante, indicador de sección activa y menú móvil con apertura/cierre coordinados, Escape y gestión de foco.
- Portada con logo existente, composición tipográfica y entrada coordinada; un CTA principal y enlace secundario.
- Cuatro servicios compactos con representaciones propias de interfaz, identificadas como ejemplos ilustrativos.
- Presentación editorial de los dos socios con fotos y biografías existentes.
- Proceso desktop alternado y mobile conectado, con progreso discreto y entregables sin compromisos inventados.
- CTA integrado al contacto, calendario Cal.com con carga, fallo y alternativa directa; WhatsApp accesible.
- Footer compacto; idioma, contenido principal, foco, zoom y navegación por anclas accesibles.
- Metadatos ES/EN, sitemap y manifest coherentes, resolviendo referencias a recursos ausentes mediante assets existentes.

Se conserva Next.js 14, React, Tailwind 3, next-intl, Framer Motion y Cal.com. Se preservan marca azul, logo y fotos. No se reintroduce el gráfico de procesos del hero retirado por el usuario en software-services-refresh SPEC-3. No se generan imágenes, capturas, exports raster/vector, assets SVG ni archivos de revisión de diseño; componentes de interfaz e iconos nativos siguen permitidos. No se inventan métricas, clientes, testimonios, garantías, plazos, condiciones comerciales ni textos legales. Publicación, PR, merge y configuración de integraciones quedan fuera de esta autorización.

## Comportamiento y restricciones

El visitante entiende la oferta en portada, distingue los cuatro servicios y conoce a los socios y el proceso antes de reservar. La navegación indica la sección actual. Calendario y WhatsApp siguen siendo los canales existentes. Los ejemplos de servicios no se presentan como productos o casos reales.

Los efectos respetan movimiento reducido y no ocultan contenido si falla la animación. Los motores decorativos se pausan fuera de pantalla y con pestaña oculta. No se secuestra el scroll. Teclado y toque tienen acceso equivalente a contenido y controles. El menú devuelve el foco al disparador al cerrarse y permite Escape. Las anclas consideran la barra fija. La reserva conserva una salida directa si el embed falla.

## Criterios de aceptación

- **AC-001 — Sistema visual:** tipografía propuesta Manrope, escala Tailwind, superficies neutras y azul de marca coherentes con el diseño aprobado; radios y espaciados compartidos. Iconografía aprobada por la skill mediante un set único; cualquier dependencia se verifica antes de incorporarla.
- **AC-002 — Navegación:** barra y menú coinciden con el diseño aprobado; sección activa perceptible; apertura/cierre completos; Escape, foco y scroll de fondo correctos; enlaces y selector de idioma preservados.
- **AC-003 — Portada:** logo y texto protagonizan una entrada coordinada; acción principal lleva a contacto y enlace secundario a servicios; sin gráfico de procesos ni competencia decorativa excesiva.
- **AC-004 — Servicios:** cuatro líneas conservadas, contenido compacto sin alturas que recorten traducciones; cada ejemplo representa su servicio y está marcado ilustrativo; interacción comprensible con toque/teclado.
- **AC-005 — Equipo:** exactamente dos socios y sus fotografías/biografías reales actuales, composición editorial responsive, sin fondo decorativo que compita con lectura ni credenciales inventadas.
- **AC-006 — Proceso:** cuatro etapas ordenadas, desktop alternado/mobile conectado, progreso no continuo, lectura y secuencia preservadas. Entregables se limitan a actividades ya descritas o información confirmada.
- **AC-007 — Conversión:** CTA/contacto integrados sin invitaciones duplicadas; Cal.com conserva evento y destino; estado de carga y fallback directo perceptibles, errores manejados; WhatsApp es un único enlace con nombre accesible.
- **AC-008 — Footer y recursos:** footer compacto con denominación Nexovate; rutas de navegación reales. Sin referencias a og-image.jpg/apple-icon.png inexistentes; manifest declara formato/tamaño comprobados; sitemap y metadatos representan /es y /en. El usuario decidió dejar documentos legales pendientes; no crear enlaces ficticios ni textos sin fuente.
- **AC-009 — Accesibilidad y movimiento:** main, idioma correcto, enlace de salto traducido, foco visible, zoom habilitado, contraste verificado; reduced-motion global sin contenido invisible; motores en pausa cuando no son visibles; estados hover/pressed coherentes sin animar dimensiones innecesariamente.
- **AC-010 — Responsive e idiomas:** /es y /en a 375, 768 y 1440 px sin recortes, superposición de WhatsApp ni desbordamiento horizontal; navegación, cambio de idioma, anclas y calendario comprobados por DOM/comportamiento sin imágenes.
- **AC-011 — Evidencia:** diseño Pencil exacto aprobado/revalidado, controles pertinentes observados, revisión independiente y commits de cada unidad antes de completar las tareas. No confundir comprobación estructural con aprobación visual del usuario o prueba runtime.

## Enfoque propuesto

Crear una propuesta editable desktop/mobile en nexovateLandingDesign.pen preservando los frames históricos. Revisar y aprobar los nodos exactos antes de escribir aplicación. Reutilizar dependencias y componentes donde sirven al diseño; sustituir efectos repetidos por movimiento que expresa avance o responde a acciones. Manrope y Phosphor forman parte del diseño aprobado.

- **Código:** app/layout.tsx, app/[locale]/layout.tsx, app/[locale]/page.tsx, app/globals.css, componentes de secciones y animaciones, messages/es/index.json, messages/en/index.json, tailwind.config.js, public/manifest.json, public/sitemap.xml.
- **Diseño:** candidato AUDIT-REDESIGN-1 en nexovateLandingDesign.pen: escritorio ES 1440 JnjQ0, móvil ES 375 anRvV, estados/interacción ES/EN DFSEc. Navbar YwNYN/eZ8LM; hero A8NcU/x6BsVJ; servicios vEj1h/pVRTT; equipo CEjC9/c1ZAg5; proceso d0vP54/k4A35; contacto T41spC/tVRG4; footer K6tBD4/P8FWz2. Menú abierto dUHMX; carga calendario iRr1y; error/fallback hlxqB; reglas tablet/EN/movimiento l8ToWq. Propuesta Manrope, bases #000000/#181818, divisiones #313131, textos #FFFFFF/#9B9B9B, azul existente del logo #2D78FF y controles Phosphor. Retirar Orb en hero y cuadrícula del equipo. Diseño aprobado por el usuario y revalidado por Designer; frames históricos preservados.
- **Límite de evidencia Pencil:** lectura textual confirma nodos/dimensiones/contenido/assets, pero reporta offsets verticales de 50px, posiciones desactualizadas y clipping en landing desktop/mobile. Estados sin clipping reportado. Inspección directa del usuario y resolución de defectos visibles obligatorias antes de DESIGN_APPROVED; no declarar validación geométrica ni visual. Tablet/EN cubiertos por reglas, sin landing completa adicional. La revisión automática rechazó una normalización amplia de coordenadas por riesgo de corrupción; no se repitió y se usaron correcciones puntuales.
- **Persistencia:** usuario guardó el documento; archivo físico de 417267 bytes modificado el 9/10/2026 17:04:48. Designer confirmó los tres IDs y emitió DESIGN_APPROVED. El archivo .pen está ignorado por Git por política existente.
- **Riesgo:** medio por composición responsive, animaciones y embed externo. Los fallos de Cal.com deben tener alternativa. Reversión por commits de unidades coherentes.

## Decisiones pendientes

El ajuste de SPEC-2 sustituye la presentación de ejemplos individuales de servicios por una comparativa compartida; el resto de SPEC-1 y sus criterios se conservan. La aprobación previa corresponde a SPEC-1/PLAN-1/AUDIT-REDESIGN-1.
El usuario decidió el 9 de octubre de 2026: «Usar Nexovate; documentos legales pendientes». Esta decisión permite completar el rediseño usando la marca; privacidad y términos quedan expresamente pendientes para una solicitud posterior con datos reales.

## Ajuste solicitado: luz, Dot Field y comparación de workflows

El usuario pidió suavizar el fondo completamente negro con luces discretas, incorporar un Dot Field al proceso y mostrar mediante nodos animados la diferencia entre una operación con Excel y trabajo manual y otra organizada con software. La base oscura, Manrope, marca, navegación, equipo y contacto se conservan.

Las luces usan el azul existente a baja intensidad, localizadas detrás del contenido de portada y servicios. El campo de puntos queda en el fondo del proceso, discreto y estático, sin competir con las etapas ni captar eventos de interacción. Esta petición autoriza la luz ambiental pese a la recomendación general de la skill de evitar fondos degradados; no requiere cambiar la skill ni reactivar el efecto del cursor.

Servicios mantiene las cuatro líneas y sus descripciones. Un comparador compartido reemplaza las cuatro miniinterfaces y permite seleccionar un ejemplo de software a medida, automatización, trazabilidad o integración de datos. Cada selección muestra dos recorridos de la misma operación con nodos, conexiones y solicitudes ilustrativas. El flujo manual muestra solicitud, planilla/archivos, copias y revisión con cola, y seguimiento disperso. El optimizado muestra solicitud, sistema central, reglas/asignación y estado compartido. El atasco se explica mediante texto y acumulación, sin presentar Excel como necesariamente defectuoso ni inventar métricas, casos de éxito o garantías. Bajo cada recorrido se explican dificultades concretas de ese trabajo manual y ventajas relacionadas con las capacidades de Nexovate: centralización, automatización, seguimiento o conexión de fuentes según el ejemplo.

Los recorridos se comparan simultáneamente en dos columnas en escritorio y se apilan en móvil. Seleccionar un ejemplo activa su animación en loop automáticamente, sin botones de reproducir o reiniciar. El primer ejemplo queda seleccionado inicialmente y anima al estar visible. Cada ciclo presenta la acumulación manual y el avance centralizado con un breve reposo entre ciclos; el usuario puede detener/reanudar el movimiento mediante un control discreto, sin tener que pulsarlo para iniciar. Los nodos, desventajas y ventajas permanecen legibles mientras anima. Fuera de pantalla o con la pestaña oculta se detiene el loop; movimiento reducido muestra la comparación estática completa. El movimiento usa las APIs de Motion ya disponibles en framer-motion 12.6.2, sin instalar un segundo motor ni migrar dependencias. La documentación oficial de useAnimate admite ambas rutas de importación: https://motion.dev/docs/react-use-animate.

- **AC-012 — Atmósfera:** luz ambiental azul tenue y Dot Field localizado en procesos; sin captura de puntero, desbordamiento o reducción del contraste de texto/controles; sin movimiento decorativo continuo.
- **AC-013 — Comparación:** cuatro servicios conservados, selector de cuatro ejemplos y dos flujos de la misma operación con nodos y conexiones. Cuello de botella reconocible por texto y estado, ventajas del flujo optimizado y desventajas del manual específicas de cada ejemplo, etiqueta ilustrativa en ES/EN. Reemplaza los ejemplos individuales de AC-004, conservando identificación de servicios y acceso equivalente. Usar la marca Nexovate existente; la referencia verbal «Nexo8» no implica cambio de marca.
- **AC-014 — Animación automática:** selección por clic, teclado y toque inicia loop automáticamente; ejemplo inicial seleccionado, sin botones reproducir/reiniciar ni ejecuciones concurrentes. Control discreto de pausa/reanudación, sin robar foco o anunciar cada ciclo repetidamente. Movimiento reducido muestra estados equivalentes sin desplazamientos; sin JavaScript conserva ambos recorridos y explicaciones del ejemplo inicial, sin controles inoperantes. Animaciones detenidas fuera de pantalla/pestaña oculta, limpieza al desmontar y cambiar ejemplo, sin cambios tardíos de una ejecución anterior.
- **AC-015 — Evidencia del ajuste:** candidato Pencil editable AUDIT-REDESIGN-2, comprobaciones ES/EN a 375/768/1440, controles/contraste/pausa/reinicio observados, revisión independiente y commits locales acotados. Preservar toda la entrega anterior y trabajo ajeno.

Superficies previstas: app/globals.css, app/[locale]/page.tsx o components/hero.tsx para luz, components/project-timeline.tsx para puntos; components/features.tsx, components/service-illustrations.tsx y/o nuevo components/service-workflow.tsx, mensajes ES/EN y un hook de visibilidad solo si es necesario. Nodos y conexiones son interfaz nativa, sin imágenes o exports SVG nuevos.

Candidato AUDIT-REDESIGN-2 en nexovateLandingDesign.pen: desktop urBWH, móvil tfkOk, estados WO7kj; servicios Jr4m2/t8drv, rutas manual f290fu/w1ppx y Nexovate euAXJ/nIBj8; proceso JYb5V/FhXTP con puntos hrJ5U/ij5ld. Comparador arriba de las cuatro explicaciones de servicios. Dos columnas desde 1024px, recorridos apilados a 768/375px. Luces estáticas azules con intensidad máxima aproximada 5% desktop y 3,8% móvil; puntos nativos de 2px cada 32px en márgenes del proceso. Controles negro sobre azul de marca, reutilizando contraste 5,24:1.

Corrección solicitada: selectores hawB7/NovMC, pausa MHtAQ/t0p5Jd, desventajas O2KDBF/zX2ul y ventajas Pk0gG/zfK6G. Estados de ejemplos ES/EN Vp9pZ (software a medida), DRygk (automatización), ZonML (trazabilidad) y XyyKw (integración). Reglas z6qGmj sustituyen explícitamente la interacción finita anterior, incluidos los estados bmQqn/comwT/G2rDR e i6BPe que quedan como material previo. Frames históricos preservados. Readback del proveedor conserva posiciones cacheadas y metadata parcial heredada; gobiernan los nodos corregidos y SPEC-2, no las referencias antiguas de reproducción/reinicio. No acredita ausencia de solapamientos. Inspección nativa y aprobación del usuario gobiernan la aceptación visual.
