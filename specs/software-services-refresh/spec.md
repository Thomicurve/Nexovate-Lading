# Nexovate: servicios de software para ordenar la operación

> Renovar la landing existente para explicar cómo Nexovate ayuda a automatizar tareas, seguir procesos y reunir datos útiles para trabajar y decidir.

**Feature:** software-services-refresh · **Definición:** SPEC-3
**Plan y tareas:** [task.md](task.md)

SPEC-3 conserva la renovación aceptada y aplica la decisión explícita posterior del usuario del 5 de octubre de 2026: retirar el componente del flujo animado del hero. Es una retirada acotada; no agrega otra funcionalidad ni modifica el proceso de trabajo de la landing.

## Objetivo

La landing actual presenta agentes de inteligencia artificial y n8n como oferta principal. El usuario quiere ofrecer servicios de software a empresas que trabajan con tareas manuales, información distribuida en planillas y documentos, y poca visibilidad de sus procesos. La renovación conserva la base y la mayor parte de la identidad visual.

## Alcance

- Conservar la marca Nexovate, confirmada por el usuario el 5 de octubre de 2026.
- Presentar cuatro servicios: software a medida, automatización de procesos, seguimiento y trazabilidad, y datos centralizados e integraciones.
- Actualizar hero, servicios, presentación, proceso de trabajo, llamados a la acción, pie de página, metadatos y descripción del manifest.
- Mantener versiones completas y coherentes en español e inglés.
- Ampliar «Sobre nosotros» con una presentación de los dos socios. Nombres, roles y biografías serán contenido provisional fácil de reemplazar. Cada perfil reserva un espacio de foto 4:5 con placeholder «Foto por agregar», reemplazable por una imagen propia más adelante.
- Mantener fondo oscuro, tipografía Inter, acentos azules, hero centrado, tarjetas de servicios, proceso y contacto. Ajustar legibilidad y espaciado, y adaptar los perfiles a móvil.
- Conservar la IA como herramienta secundaria cuando aporte valor, sin protagonismo en la oferta ni en los metadatos.
- Presentar el hero con su texto, botones y fondo existente, sin el gráfico adicional de procesos que el usuario pidió retirar.

La renovación no incluye nuevas funcionalidades de negocio, paneles reales, backend, cambios de proveedor de contacto ni publicación del sitio. Se reutilizan los recursos actuales; no se generan retratos, imágenes ni nuevos logos.

## Contenido y recorrido propuestos

El hero comunica «Software que ordena tu operación y hace visible lo que pasa». Texto de apoyo: «Creamos software a medida para automatizar tareas, seguir cada proceso y reunir tus datos en un solo lugar. Menos información dispersa. Más claridad para trabajar». Botón principal «Hablemos de tu proceso» hacia #contact y secundario «Ver servicios» hacia #solutions.

Los servicios explican resultados concretos: adaptar una herramienta al trabajo del equipo, reducir carga y transferencia manual de información, conocer responsables y estado de cada proceso, y conectar datos para obtener una visión compartida. No se prometen porcentajes de ahorro, seguridad absoluta, disponibilidad garantizada ni resultados sin evidencia.

La presentación se titula «Trabajamos cerca de tu equipo» y explica: «Somos dos socios que construimos soluciones junto a quienes las usan. Primero entendemos tu operación; después definimos qué conviene ordenar, conectar o automatizar». La IA aparece únicamente como «Usamos inteligencia artificial cuando aporta valor a la solución».

Cada perfil contiene «Nombre del socio 1/2», «Socio · rol por completar» y «Biografía de ejemplo: acá vamos a contar su recorrido, su forma de trabajar y qué aporta a cada proyecto». Un aviso indica «Contenido provisional para reemplazar». No se inventan títulos, experiencia, clientes, testimonios ni enlaces personales.

### Fotos de los socios

Los espacios de foto son placeholders neutros, no retratos ficticios. Mantienen proporción 4:5 al colocar fotos reales, con recorte object-fit cover. Las fuentes opcionales se centralizan en los datos de los perfiles para sustituirlas sin rehacer la sección. Las fotografías reales se incorporarán cuando el usuario las proporcione.

Pencil conserva la referencia editable de los espacios de foto. El flujo de DESIGN-2 queda excluido del diseño actual por la solicitud expresa del usuario; no se sustituye por otro gráfico.

El proceso de trabajo mantiene cuatro etapas y la composición existente: entender la operación; definir una solución y su alcance; construir y validar con el equipo; poner en marcha y acompañar. No se agregan plazos ni condiciones comerciales.

El contacto conserva el calendario Cal.com actual. Su texto debe describir la selección de un horario disponible, sin prometer una confirmación manual posterior. El formulario comentado no se activa.

## Criterios de aceptación

- **AC-001 — Propuesta clara:** hero, servicios, presentación, proceso y footer explican servicios de software y beneficios operativos. Agentes de IA y n8n dejan de ser la oferta principal.
- **AC-002 — Cuatro servicios:** se presentan las cuatro líneas definidas con textos concretos e iconos acordes, manteniendo la composición de tarjetas.
- **AC-003 — Dos socios:** existen exactamente dos perfiles con contenido provisional centralizado en los mensajes de cada idioma y sin credenciales ficticias. Cada perfil tiene un espacio de foto 4:5 con placeholder honesto y fuente opcional centralizada para reemplazarlo. En escritorio aparecen juntos; en móvil se apilan.
- **AC-004 — Continuidad visual:** se conserva identidad y orden de secciones; los ajustes siguen el candidato Pencil explícitamente aprobado. Texto y perfiles permanecen legibles sin recortes ni desbordamiento a 375, 768 y 1440 píxeles.
- **AC-005 — Idiomas y navegación:** ambas rutas /es y /en presentan contenido equivalente sin claves faltantes. Enlaces de navegación, cambio de idioma y botones mantienen sus destinos; contacto conserva el calendario.
- **AC-006 — Descubrimiento coherente:** título, descripción, keywords, Open Graph, Twitter y manifest reflejan el nuevo enfoque manteniendo marca, dominio, integraciones y recursos existentes.
- **AC-007 — Accesibilidad del cambio:** jerarquía de títulos, contraste y foco de controles modificados son correctos; contenido nuevo se lee con teclado y lector de pantalla. Las etiquetas modificadas corresponden a su idioma.
- **AC-008 — Validación y entrega:** cambios pasan los controles definidos en task.md y revisión independiente, con commits locales por unidad aceptada antes de marcar las tareas terminadas.
- **AC-009 — Retirada del gráfico:** el hero no importa ni presenta ProcessMotion. Se eliminan el archivo del componente, sus estilos exclusivos y las claves motion de ambos idiomas. Permanecen el texto, los botones y el Orb existente del hero, junto con la sección #process de cómo trabajamos. Este criterio sustituye al proceso animado de SPEC-2 por decisión expresa del usuario.

## Enfoque aprobado

Reutilizar Next.js 14, React, next-intl, Tailwind y los componentes existentes. El contenido vive en messages/es/index.json y messages/en/index.json. Cambiar las claves de servicios y sus consumidores de manera conjunta. AboutUs incorpora los perfiles con texto seguro en lugar del reemplazo HTML específico de n8n. No hacen falta dependencias nuevas ni una migración. La retirada elimina únicamente el gráfico adicional y sus recursos exclusivos.

- **Código relevante:** app/layout.tsx; components/hero.tsx; components/features.tsx; components/about-us.tsx; components/project-timeline.tsx; components/navbar.tsx; components/cta.tsx; components/footer.tsx; mensajes y public/manifest.json. La retirada afecta además app/globals.css y elimina components/process-motion.tsx.
- **Diseño:** base de DESIGN-2 aprobada en nexovateLandingDesign.pen sobre escritorio eojTE y móvil s60AE; fotos GffwM/EpLeq (208×260) y thvo4/u95pBR (192×240), Orb con opacidad 0.35. La solicitud posterior del usuario excluye el flujo rMopj / twdXH y sus controles S7XW9m / MUqH3 de la landing. Los frames Pencil conservan el diseño histórico y no representan la retirada actual. No se requieren nuevos assets, capturas ni exports para esta eliminación precisa.
- **Riesgos:** texto más extenso en tarjetas; incoherencia entre idiomas o metadatos; diferencias de composición móvil. La retirada requiere comprobar referencias, claves y estilos huérfanos, build y continuidad del hero/proceso. No hay runner de tests declarado.
- **Reversión:** revertir los commits específicos de la renovación, conservando el trabajo previo y las configuraciones del usuario.

## Decisiones pendientes

Ninguna decisión bloqueante. El usuario aprobó DESIGN-2 («perfecto, apruebo el design-2») y SPEC-2/PLAN-2 («Aprobar PLAN-2 y comenzar la implementación») el 5 de octubre de 2026. Luego solicitó explícitamente «Directamente remove ese componente» para el flujo animado del inicio; esa solicitud autoriza la retirada precisa de SPEC-3. El modo CONTINUOUS, la marca y el papel secundario de IA están confirmados. Las fotos reales se incorporarán cuando el usuario las proporcione.
