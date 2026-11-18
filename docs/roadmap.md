# MonoSchemes · roadmap de diseño, UI y agentes

Actualizado: 18 de noviembre de 2026.

## Cómo usar este roadmap

Este archivo es la fuente única del estado, las prioridades y la siguiente acción de MonoSchemes. Incluye el trabajo de diseño y código de `monoschemes-ui`, además del paquete y las pruebas con agentes.

- **Figma/FigJam** conserva ideación, especificaciones, exploraciones y pruebas visuales. Figma sigue siendo la autoridad visual.
- **Este roadmap** indica qué está hecho, qué sigue y qué está aparcado.
- **Google Sheets** conserva decisiones y datos de pruebas/auditorías. No es una segunda lista de tareas. [Registro y resultados](https://docs.google.com/spreadsheets/d/1ikcrIwANXxgAbemlEyYaduw7WdIrOqd1jYdNTBLUR5w/edit).
- **Código y Storybook** registran la implementación y permiten comprobarla.

Referencias: [Roadmap FigJam](https://www.figma.com/board/5e0OseT7Eu8XjlEtpJofVx/MonoSchemes-kit?node-id=1237-938), [librería visual de Figma](https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit) y [decisión F-04](https://docs.google.com/spreadsheets/d/1ikcrIwANXxgAbemlEyYaduw7WdIrOqd1jYdNTBLUR5w/edit?gid=3000#gid=3000).

## Siguiente acción

| Estado | Trabajo | Situación | Siguiente acción |
|---|---|---|---|
| Siguiente | Revisión visual de la alineación | El commit `2c09750` alinea AppHeader sin navegación, FormSearch, Pagination y FormSelect con sus casos de consumo. Lint, typecheck y builds pasan; falta revisar las historias renderizadas. | Revisar esos casos en Storybook en Light y Dark, y comprobar la zona `inverse` en los dos temas. |
| Hecho | Traspaso del registro y resultados | Las tres rondas de agentes y el estado actual de la auditoría de color están en Sheets; el plan inicial quedó archivado y la decisión K-09 ya no está duplicada. | Mantener Sheets para los datos y consultar este archivo para las prioridades vigentes. |
| Backlog | Recetas y plantilla de arranque | Hay guía de consumo y recetas, pero falta cerrar el conjunto de patrones de producto y una plantilla Vite lista para clonar. | Priorizar login, ajustes, listado con filtros, detalle, formulario por pasos y estados vacío/error; crear la plantilla si sigue siendo útil tras revisar las recetas. |
| Backlog | Verificación automática | Falta acordar qué comprobar automáticamente además de lint, tipos y builds. | Definir alcance para tokens/valores en bruto, contrato y accesibilidad en Storybook sin imponer reglas que bloqueen usos válidos. |
| Backlog | Storybook público | Storybook aún no tiene una publicación pública enlazada desde el paquete. | Publicar `storybook-static` (por ejemplo, en GitHub Pages) y enlazarlo desde README y `llms.txt`. |
| Backlog | Code Connect | No se ha confirmado el plan de Figma ni el alcance práctico. | Confirmar elegibilidad y componentes prioritarios antes de implementar. |

## Diseño y sistema de componentes

### Hecho

- Los paquetes 1–6 de UI están implementados y versionados: componentes de controles, contenido y navegación; Calendar integrado en Form/Date; nuevos campos, Stepper y Mega menu.
- Los tokens semánticos Light/Dark, la zona `data-theme="inverse"` y el principio Recto están implementados. `--radius-full` se limita a Avatar round, Radio y el pulgar del Slider.
- El componente Accordion es atómico; el contrato `components.json` recoge los nodos y props de Figma, y las stories documentan los componentes.
- Figma tiene descripciones de uso y páginas de prueba visual: Tabler Icons, landing TTS, test de velocidad y recreación de salgadosomoza.com.
- Las decisiones y referencias principales están registradas en Sheets: F-01–F-04, C-01–C-07, R-01–R-03, K-01–K-26, T-01–T-02, I-01–I-03 y M-01. El registro de decisiones conserva también las decisiones sustituidas, como K-08 y R-01, para mantener trazabilidad.
- La exploración visual de Figma/FigJam sigue abierta a pruebas de componentes y páginas; sus marcos no son estados del roadmap. Una propuesta solo pasa a trabajo activo cuando se registra aquí con un siguiente paso.

### Backlog de diseño

| Estado | Tema | Alcance / criterio |
|---|---|---|
| Backlog | Toast | La API tiene `success`, `warning` y `error`, pero no hay diseño acordado para esos estados. Decidir en Figma antes de cambiar su apariencia. |
| Backlog | Decisiones de color C-05 | Resolver D2 (divisores suaves), D3 (relleno de progreso) y D4 (subrayado de Button/Text) en Figma y luego reflejar el resultado en tokens/código. |
| Backlog | Interacciones según necesidad | Tooltip, Popover, Drawer, Combobox y paleta de comandos son candidatos; priorizarlos desde casos reales, no por completar una lista. |
| Condicional | Footer estrecho | Revisar el Footer a 960 px si vuelve a aparecer el caso de uso. |
| Backlog | Publicación en Figma Community | Preparar portada, descripción, etiquetas, licencia y contenido publicable; no hay fecha fijada. |
| Backlog | Archivo de monoschemes-kit | El sistema queda en Figma + `monoschemes-ui`; dejar el repo Kit en solo lectura cuando se complete el aviso/README de archivo. |
| Por revisar | Issues históricos de Table y Tag | Confirmar que los issues públicos siguen abiertos y son útiles; el soporte de celdas `ReactNode` y los componentes actuales pueden haber resuelto parte del alcance. |

Las páginas de prueba de Figma son referencias de exploración, no entregas independientes. Añadir allí pruebas nuevas cuando aporten un caso concreto.

## Paquete y pruebas con agentes

### Hecho

- El paquete se puede instalar y consumir como `@monoschemes/ui`; las versiones `0.1.0` y `0.1.1` están publicadas en npm.
- La versión 0.1.1 incluye el error de InlineNotification, tokens y temas en el CSS publicado, contrato, documentación de consumo, `llms.txt`, recetas y skill para Claude Code.
- **Ronda 1 · 0.0.1:** 8 intentos diagnósticos, contaminados por `claude-mem`; no es línea base. El problema principal fue el CSS publicado sin definiciones de tokens.
- **Ronda 2 · 0.0.2:** 4/4 aplicaciones completas; 47/48 de fidelidad; 1 error de sistema en T4 por usar `data-theme="dark"` en vez de `inverse`.
- **Ronda comparativa · 0.1.1:** 4/4 completas; 47/48; 1 error de sistema, el mismo uso fijo de `dark` en T4. Con esta muestra, la hipótesis H1 no queda apoyada; tampoco se demuestra que el paquete para agentes no ayude en general.
- La última revisión de fricciones llevó a mejoras de integración en el commit `2c09750`. Los datos por intento, puntuaciones e incidencias se guardan en Sheets; [el resumen metodológico](agent-test/results.md) conserva conclusiones y límites, sin duplicar filas.
- Tras la consolidación, Sheets es el registro de resultados detallados y auditorías; este archivo conserva conclusiones, límites y acciones, no filas duplicadas de medición.

### Backlog de agentes

| Estado | Trabajo | Siguiente paso |
|---|---|---|
| Hecho | Registro de resultados | Las rondas y auditorías están consolidadas en Sheets; este roadmap y `docs/agent-test/results.md` conservan prioridades e interpretación. |
| Backlog | Recetas / plantilla | Completar los patrones de producto y decidir si conviene una plantilla inicial Vite. |
| Backlog | Verificación automática | Añadir comprobaciones acordadas de contrato, tokens y accesibilidad; no ocultar diferencias válidas entre React y Figma. |
| Después de cambios sustantivos | Nueva prueba comparativa | Repetir las mismas tareas y métricas solo cuando cambien de forma material las instrucciones, recetas o APIs. La muestra seguirá siendo pequeña y debe presentarse como tal. |

## Ideas aparcadas

- **pen.dev:** experimento opcional; Figma sigue siendo la fuente visual.
- **Plugin de sincronización Figma ↔ código:** fuera del trabajo activo.

## Criterio para incorporar ideas desde Figma

Las ideas y pruebas del FigJam no pasan automáticamente a backlog. Se traen a este archivo cuando existe una necesidad concreta, una decisión o una siguiente acción verificable. Las métricas, resultados por intento y auditorías detalladas viven en las pestañas correspondientes de [Google Sheets](https://docs.google.com/spreadsheets/d/1ikcrIwANXxgAbemlEyYaduw7WdIrOqd1jYdNTBLUR5w/edit); las decisiones vigentes y sustituidas permanecen en `Registro`.
