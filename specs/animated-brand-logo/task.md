# Identidad integrada y símbolo animado — plan y tareas

**Definición:** [spec.md](spec.md) · **Feature:** animated-brand-logo
**Plan:** PLAN-1 · **Definición cubierta:** SPEC-1

## Ejecución y aprobación

- **Modo:** CONTINUOUS, elegido explícitamente para esta feature.
- **Aprobación del plan:** APPROVE_CURRENT_PLAN. Ante la presentación de LOGO-DESIGN-1 y SPEC-1/PLAN-1, el usuario respondió «perfecto, todo aprobado, hagamoslo en modo continuous». Autoriza TASK-001 y TASK-002 en secuencia con revisión y commits locales.
- **Diseño:** LOGO-DESIGN-1 aprobado por esa misma decisión en `nexovateLandingDesign.pen`: desktop `kUdjS`, móvil `jLCQd`, estados `yCZeJ`. Designer revalidó DESIGN_APPROVED: paths, colores, dimensiones, encuadre y estados coinciden con SPEC-1. La comprobación de navegador corresponde a Implementer.
- **Primera tarea:** TASK-001.
- **TDD:** OFF, incluido en PLAN-1 aprobado y consistente con el trabajo previo del proyecto y la ausencia de runner de tests en package.json. Se requieren los controles funcionales detallados abajo; no se instalará un runner incidentalmente.
- **Entrega aprobada:** dos unidades coherentes con revisión y commit local por unidad. Una sola rama de requisito `codex/animated-brand-logo`, desde el main observado. Sin push, PR, merge ni despliegue autorizados.
- **Forecast:** aproximadamente 260–400 líneas de fuente añadidas más eliminadas, dos commits. Confianza media; PNG excluido del cómputo. Si aumenta materialmente el alcance se consulta antes de avanzar.

## Controles compartidos

1. `npm run lint`, `npx tsc --noEmit` y `git diff --check` sobre cada candidato pertinente.
2. `npm run build` en una verificación secuencial controlada: no ejecutar simultáneamente con un servidor dev usando el mismo `.next`. Inspeccionar antes procesos propios del proyecto y restaurar su preview si hace falta detenerlo.
3. Verificar SVG válido, sin raster incrustado, rutas correctas y correspondencia entre geometría estática y animada.
4. Inspección funcional sin capturas en ES/EN a 375, 768 y 1440: dimensiones de marca, ausencia de nuevas colisiones/desbordamientos, enlaces, menú móvil, teclado e idioma.
5. Observar estado inicial/intermedio/final de la animación, ejecución única, estado final estable, reduced-motion desde carga y durante movimiento, pestaña oculta, salida de viewport, limpieza al desmontar y fallback sin JavaScript. No afirmar pruebas que las herramientas no permitan realizar.
6. Revisión independiente del candidato detenido. Los cambios posteriores invalidan la evidencia afectada. Después del commit, comprobar que el candidato integrado corresponde al revisado.

El antecedente de overflow transitorio del timeline no autoriza una corrección ajena a esta feature ni permite atribuir una regresión nueva sin comparar el baseline.

## Tareas

### TASK-001 — Integrar la marca y construir el símbolo vectorial

**Estado:** DONE · **Responsable:** Implementer · **Criterios:** AC-001, AC-002, AC-005, AC-006.

Copiar el logo aprobado a assets públicos, crear un componente de marca con encuadre proporcional e integrarlo en cabecera y pie. Reconstruir la N como SVG nativo de acuerdo con la geometría del diseño aprobado y entregar su archivo independiente estático. Preparar la geometría compartida que consumirá la animación.

- **Dependencias:** ninguna; requiere aprobación actual de plan, modo y diseño.
- **Archivos permitidos:** nuevos `public/images/brand/nexovate-logo.png`, `public/images/brand/nexovate-mark.svg`, `components/brand-logo.tsx`, `lib/brand-geometry.ts`; cambios acotados en `components/navbar.tsx`, `components/footer.tsx` y estilos exclusivos de marca en `app/globals.css` si son necesarios.
- **Termina cuando:** marca completa integrada, N fiel y vectorial, asset reutilizable, controles 1–4 pertinentes aceptados, Reviewer APPROVED y commit verificado.
- **WU-001:** marca estática y geometría base; forecast 110–180 líneas en seis o siete archivos más PNG; confianza media. Commit propuesto `feat: integrate Nexovate brand and vector mark`.
- **Resultado:** Reviewer APPROVED y commit `b969cc64ec1cfd5b34f088cb0be4a0b7ea72aa90`, parent `0b9999f`, verificados. Fuente 89 líneas autorales en cinco fuentes más PNG idéntico al original; hashes antes/después iguales. Lint/tipos/build, SVG/escala, SHA256 PNG y DOM ES/EN a 375/768/1440 pasan. Espaciado de cabecera md<lg ajustado sin ocultar controles. Overflow global de 34 px en móvil/tablet persiste al sustituir temporalmente cabecera/pie originales; no se atribuye a esta tarea.

### TASK-002 — Animar el ensamblado de la N en el inicio

**Estado:** DONE · **Responsable:** Implementer · **Criterios:** AC-002, AC-003, AC-004, AC-005, AC-006.

Crear el símbolo inline con las piezas y coordenadas de TASK-001. Aplicar trazado, interpolación de posiciones y final estático del diseño aprobado. Integrarlo sobre el título del hero con espacio reservado y completar las condiciones de accesibilidad y ciclo de vida.

- **Dependencias:** TASK-001 DONE con controles, revisión y commit verificados.
- **Archivos permitidos:** nuevo `components/animated-brand-mark.tsx`; `components/hero.tsx`; estilos exclusivos en `app/globals.css`; ajustes acotados de `lib/brand-geometry.ts` conservando la equivalencia con el SVG estático.
- **Termina cuando:** animación y estado estático cumplen el diseño aprobado, controles 1–6 pertinentes aceptados, revisión independiente de la unidad y cobertura integrada APPROVED, commit verificado.
- **WU-002:** movimiento y composición final; forecast 150–220 líneas en tres o cuatro archivos; confianza media. Commit propuesto `feat: animate the Nexovate mark assembly`.
- **Resultado:** TASK-002 y revisión integrada APPROVED; commit `bd23a078a919da647d9b374a4c262a8b6e86392e`, parent `b969cc6`, verificado con fuentes iguales al candidato revisado. Fuente +132 líneas en AnimatedBrandMark y hero. Lint/tipos/build/diff-check, DOM ES/EN a 375/768/1440, gap 24 px, equivalencia geométrica, fases reales y fallback sin JS pasan. El componente real probó pausa fuera de viewport, reduced-motion inicial/dinámico, fin y unmount sin callbacks/listeners/observadores pendientes. La señal de pestaña oculta se verificó sintéticamente; Edge headless no acreditó la transición nativa. Reviewer consideró suficiente el handler real y su lógica compartida comprobada para este cambio acotado, sin findings.

## Próximo paso

- **Próxima tarea:** ninguna; TASK-001 y TASK-002 DONE sobre `codex/animated-brand-logo`.
- **Continuación:** plan aprobado completado; revisión integrada y commits verificados.
- **Decisión del usuario:** «perfecto, todo aprobado, hagamoslo en modo continuous» cubre SPEC-1/PLAN-1, LOGO-DESIGN-1 y las dos tareas.
- **Resultado integrado:** 221 líneas autorales de aplicación, dentro del forecast; ambos commits conservan el candidato comprobado. Preview local de producción disponible en `http://localhost:3000/es`. Sin publicación remota ni merge autorizados.
