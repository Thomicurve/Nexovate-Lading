# Nexovate: identidad integrada y símbolo animado

> Incorporar el logo aprobado y construir su N en SVG con una animación geométrica de ensamblado.

**Feature:** animated-brand-logo · **Definición:** SPEC-1
**Plan y tareas:** [task.md](task.md)

## Objetivo

El usuario aprobó el logo de `output/imagegen/nexovate-logo-v1.png` y pidió integrarlo en la web, además de recrear el símbolo sin la palabra en SVG y animar su armado mediante cálculos matemáticos. La marca es Nexovate; «Nexo8» se interpreta como una referencia a este proyecto, sin cambio de nombre.

## Alcance

- Logo completo aprobado en cabecera y pie, preservando su tipografía y proporciones. El PNG original se reutiliza con encuadre visual de sus márgenes transparentes.
- Símbolo N reconstruido como geometría vectorial editable y entregado también en un archivo SVG independiente.
- Una N animada sobre el título principal: trazado y ensamblado de sus piezas, con estado final equivalente al logo aprobado.
- Adaptación de tamaño y espacio a escritorio y móvil; nombres accesibles y comportamiento sin movimiento cuando corresponda.

No se incluyen cambios en la oferta comercial, otras secciones, favicon, dependencias, publicación o rediseño general. La solicitud explícita actual autoriza el SVG de entrega y el uso del logo aprobado. Las capturas y exports de revisión continúan excluidos.

## Comportamiento propuesto

La cabecera y el pie muestran el logo completo estático. En el inicio, el símbolo dispone de espacio reservado sobre el título. Al aparecer por primera vez, se trazan sus contornos y sus piezas se desplazan hasta encajar. La secuencia dura aproximadamente 2,4 segundos y termina en una N completa y quieta; no se repite continuamente.

Los vértices se definen desde un sistema de coordenadas proporcional. El desplazamiento se obtiene por interpolación entre posiciones iniciales y finales con una curva de suavizado. Se anima SVG real, sin video, canvas ni fotogramas de imagen. Las líneas auxiliares, si el diseño las incluye, desaparecen al terminar; no se agrega texto decorativo de fórmulas.

El símbolo final permanece visible sin JavaScript. Con `prefers-reduced-motion: reduce` se muestra directamente el estado estático, también si la preferencia cambia durante la secuencia. La animación no bloquea enlaces ni botones y se suspende fuera de vista o con la pestaña oculta. Los observadores y callbacks se limpian al desmontar.

## Criterios de aceptación

- **AC-001 — Identidad fiel:** cabecera y pie usan el logo completo aprobado, legible, sin deformación, con el mismo nombre y color. El enlace de cabecera continúa llevando al inicio.
- **AC-002 — SVG real:** la N contiene geometría vectorial, sin imagen raster incrustada ni la palabra Nexovate; preserva las piezas, proporciones y espacios negativos característicos. Existe un SVG independiente válido y reutilizable.
- **AC-003 — Ensamblado calculado:** coordenadas y transformaciones se derivan de parámetros geométricos e interpolación temporal documentados brevemente en el código. La secuencia se ejecuta una vez y acaba en el mismo símbolo estático, sin guías residuales.
- **AC-004 — Accesibilidad y ciclo de vida:** reduced-motion produce estado estático inmediato; sin JavaScript la marca sigue visible; no hay trabajo de animación permanente después de terminar ni callbacks huérfanos. La decoración no duplica anuncios para lectores de pantalla.
- **AC-005 — Integración responsive:** en ES/EN y anchos 375, 768 y 1440, logo y símbolo no provocan recortes, desplazamientos de layout ni nuevo desbordamiento; navegación, menú e idioma siguen funcionando.
- **AC-006 — Entrega verificada:** lint, tipos, build, controles funcionales de SVG/movimiento y revisión independiente aceptados; cada unidad coherente se entrega en un commit local antes de marcarla DONE.

## Enfoque propuesto

Reutilizar Next.js, React, Tailwind y las capacidades SVG del navegador. Conservar el PNG aprobado para la palabra y reconstruir únicamente el símbolo como vectores. Mantener el cálculo geométrico pequeño y legible; no incorporar librerías.

- **Código inspeccionado:** components/navbar.tsx, components/footer.tsx, components/hero.tsx, app/globals.css, package.json y app/layout.tsx. CodeGraph confirma uso compartido de los tres componentes en la landing localizada.
- **Diseño:** LOGO-DESIGN-1 en `nexovateLandingDesign.pen`, aprobado por el usuario junto con SPEC-1/PLAN-1: desktop `kUdjS` (1440), móvil `jLCQd` (375), estados `yCZeJ`. Se conservan los frames históricos. Cabecera de 56 px; logo completo de 170×32 en escritorio y 150×28,24 en móvil; pie de 210×39,53 y 190×35,77. N sobre H1 con espacio reservado de 144×136 en desktop y 112×106 en móvil, símbolos de 120×113,333 y 96×90,667, y separación de contenido de 24 px.
- **Riesgos:** pérdida de fidelidad al reconstruir la N; márgenes transparentes del PNG; espacio vertical del hero; movimiento accesible. El timeline existente tiene un antecedente de overflow transitorio que deberá distinguirse de cualquier regresión nueva.
- **Reversión:** revertir los commits específicos de esta integración, preservando el resto de la landing.

### Geometría y movimiento de LOGO-DESIGN-1

El símbolo usa `viewBox="0 0 360 340"` y tres piezas en orden de superposición: izquierda y diagonal superior (`wewP9`, #2D78FF), derecha posterior (`QXQ0Z`, #2059E8), cinta inferior (`kvKFv`, #2875FA). Es la reconstrucción geométrica de la silueta aprobada; no se promete un trazado píxel a píxel.

- Izquierda: `M0 46 L69 0 L245 111 L245 204 L89 115 L89 277 L0 331 Z`.
- Derecha: `M258 72 L360 10 L360 286 L258 226 Z`.
- Cinta inferior: `M108 148 L360 286 L280 340 L108 241 Z`.

Las coordenadas se escalan proporcionalmente: `x=W*(xBase/360)`, `y=H*(yBase/340)`. Para cada pieza, `u=clamp((t-delay)/duration,0,1)`, `e=1-(1-u)^3` y `P(t)=Pfinal+(1-e)*offset`. El trazado se normaliza con `pathLength=1`.

Estados editables: `I3DMi` (0–0,6 s, contornos), `t76VT` (0,6–1,8 s, convergencia sin rotación), `QVCSI` (1,8–2,4 s, color y retiro de contornos), `DPREc` (reduced-motion, símbolo completo). Son referencias de diseño; las pruebas de ejecución corresponden a la implementación.

Designer confirmó por lectura estructural paths, coordenadas, dimensiones y referencia PNG. La API de bounds de Pencil informó desplazamientos inconsistentes de +50 px y flags contradictorios; por eso esa API no acredita una comprobación visual ni ausencia de clipping. La inspección del usuario en Pencil y los controles posteriores de navegador siguen siendo necesarios.

## Decisiones pendientes

Ninguna. El usuario respondió «perfecto, todo aprobado, hagamoslo en modo continuous» a la presentación de SPEC-1/PLAN-1 y LOGO-DESIGN-1.
