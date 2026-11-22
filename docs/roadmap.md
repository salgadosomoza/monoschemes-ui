# MonoSchemes · roadmap de diseño, UI y agentes

Actualizado: 22 de noviembre de 2026.

## Cómo usar este roadmap

Este archivo es la fuente única del estado, las prioridades y la siguiente acción de MonoSchemes. Incluye el trabajo de diseño y código de `monoschemes-ui`, además del paquete y las pruebas con agentes.

- **Figma/FigJam** conserva ideación, especificaciones, exploraciones y pruebas visuales. Figma sigue siendo la autoridad visual.
- **Este roadmap** indica qué está hecho, qué sigue y qué está aparcado.
- **Google Sheets**, en «MonoSchemes · Registro de decisiones» → «Registro», conserva decisiones y aprendizajes. No es una segunda lista de tareas. [Registro](https://docs.google.com/spreadsheets/d/1ikcrIwANXxgAbemlEyYaduw7WdIrOqd1jYdNTBLUR5w/edit).
- **GitHub** registra el trabajo en curso: issues, ramas, PR y comentarios de revisión. **Código y Storybook** registran la implementación y permiten comprobarla.
- Codex lleva el desarrollo de `monoschemes-ui`, el proceso, el roadmap y las entregas. Claude y Carlos llevan diseño en Figma, mejoras de UI/UX y revisión visual y de accesibilidad.
- Los cambios visuales —componentes, tokens, estilos, stories y recetas con UI— van en una rama y un PR; se integran tras las comprobaciones. La revisión de Claude es opcional y se solicita solo si Carlos la pide.
- Cada entrega mantiene este roadmap actualizado. Los estados representan el trabajo vigente; decisiones y aprendizajes se registran en Sheets, sin duplicar sus datos aquí.

### Canal Claude ↔ Codex y autoría

- Los encargos de diseño llegan como issues de `salgadosomoza/monoschemes-ui` etiquetadas `design` y `from:claude`. Al empezar una sesión, Codex revisa las issues abiertas `design`, las enlaza a su rama o PR y las cierra al entregar. Hasta que Claude use GitHub directamente, Carlos seguirá pasando los encargos a mano.
- Los PR de cambios visuales incluyen `Closes #N`. Si se solicita revisión, Claude deja comentarios con capturas y nodos de Figma; Codex corrige en la misma rama y responde en los hilos.
- Codex y Claude usan la cuenta GitHub `salgadosomoza`, igual que Carlos. La autoría se distingue en issues y PR: Codex etiqueta con `from:codex` y firma `**Codex · desarrollo**`; Claude etiqueta con `from:claude` y firma `**Claude · diseño**`. Los mensajes sin firma son de Carlos.
- Claude usa GitHub solo para issues, comentarios de revisión y etiquetas: no hace commits, push, merges ni cambios de configuración del repositorio.

Referencias: [Roadmap FigJam](https://www.figma.com/board/5e0OseT7Eu8XjlEtpJofVx/MonoSchemes-kit?node-id=1237-938), [librería visual de Figma](https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit) y [decisión F-04](https://docs.google.com/spreadsheets/d/1ikcrIwANXxgAbemlEyYaduw7WdIrOqd1jYdNTBLUR5w/edit?gid=3000#gid=3000).

## Siguiente acción

| Estado | Trabajo | Situación | Siguiente acción |
|---|---|---|---|
| Hecho | Pendientes #13, #14 y #16 | CommandPalette (#13, PR #19), plantilla Vite (#14, PR #14) y Drawer (#16, PR #21) están integrados en `main`. | Mantener las stories y el contrato alineados con el sistema. |
| En curso | EmptyState y publicación 0.2.0 (#17) | Título y descripción ya se centran; se añade prueba de regresión. El paquete incluye CommandPalette, Drawer y la plantilla actualizada. | Completar las comprobaciones del tarball y configurar Trusted Publishing en npm antes de crear el tag de publicación. |
| Hecho | Revisión visual de la alineación y zona `inverse` | Carlos revisó AppHeader sin navegación, FormSearch, Pagination y FormSelect en Light y Dark. La zona `inverse` también se comprobó en ambos temas y se ve bien. | Registrar cualquier discrepancia visual futura como una tarea independiente. |
| Hecho | Comprobación focalizada de comprensión de `inverse` | En una prueba separada, el prompt especificó que el hero debía ser oscuro en Light y claro en Dark, sin nombrar `inverse`. Claude Code consultó la documentación del paquete, eligió `data-theme="inverse"` y el resultado se confirmó visualmente en ambos temas. Build y lint pasan. | Conservar R2/R3 como resultados históricos; no atribuir causalidad a la documentación con una sola prueba ni compararla como si el prompt fuera idéntico. |
| Hecho | Traspaso del registro y resultados | Las tres rondas comparativas, la comprobación focalizada R4 y el estado actual de la auditoría de color están en Sheets; el plan inicial quedó archivado y la decisión K-09 ya no está duplicada. | Mantener Sheets para los datos y consultar este archivo para las prioridades vigentes. |
| Hecho | Rediseño de Table | PR #7 se fusionó tras el visto bueno visual; incluye ordenación, selección, búsqueda, paginación y estados, y cierra los issues #1 y #5. | Mantener stories y contrato alineados con futuras mejoras. |
| Hecho | TagGroup | PR #9 se fusionó tras el visto bueno visual; cierra los issues #2 y #6. | Mantener el componente alineado con futuras mejoras. |
| Hecho | Clasificación de Storybook | El PR #10 organiza las historias según las ocho categorías de Figma y aplica el orden revisado por Claude. | Mantener la estructura alineada con futuras historias. |
| Aplazado | Stories de Patterns | Las recetas siguen documentadas en el paquete de agentes; las historias de páginas completas se añadirán cuando haya una revisión visual específica para esa categoría. | Retomar cuando Figma tenga ejemplos listos para validar. |
| Hecho | Recetas y DescriptionList | Las siete recetas y DescriptionList están integrados; la receta de dashboard usa búsqueda, selección y paginación de Table. | Mantener los ejemplos alineados con futuras APIs. |
| Hecho | Plantilla de arranque Vite | PR #14 integrada. La plantilla usa `@monoschemes/ui` 0.2.0 y `DescriptionList`. | Mantener la versión de la plantilla alineada con cada release. |
| Backlog | Verificación automática | Falta acordar qué comprobar automáticamente además de lint, tipos y builds. | Definir alcance para tokens/valores en bruto, contrato y accesibilidad en Storybook sin imponer reglas que bloqueen usos válidos. |
| Backlog | Storybook público | Storybook aún no tiene una publicación pública enlazada desde el paquete. | Publicar `storybook-static` (por ejemplo, en GitHub Pages) y enlazarlo desde README y `llms.txt`. |
| Backlog | Code Connect | No se ha confirmado el plan de Figma ni el alcance práctico. | Confirmar elegibilidad y componentes prioritarios antes de implementar. |

## Diseño y sistema de componentes

### Hecho

- Los paquetes 1–6 de UI están implementados y versionados: componentes de controles, contenido y navegación; Calendar integrado en Form/Date; nuevos campos, Stepper y Mega menu.
- Los tokens semánticos Light/Dark, la zona `data-theme="inverse"` y el principio Recto están implementados. `--radius-full` se limita a Avatar round, Radio y el pulgar del Slider.
- El componente Accordion es atómico; el contrato `components.json` recoge los nodos y props de Figma, y las stories documentan los componentes.
- Figma tiene descripciones de uso y páginas de prueba visual: Tabler Icons, landing TTS, test de velocidad y recreación de salgadosomoza.com.
- Las decisiones y referencias principales están registradas en Sheets: F-01–F-04, C-01–C-08, R-01–R-03, K-01–K-27, T-01–T-02, I-01–I-04 y M-01. El registro de decisiones conserva también las decisiones sustituidas, como K-08 y R-01, para mantener trazabilidad.
- La exploración visual de Figma/FigJam sigue abierta a pruebas de componentes y páginas; sus marcos no son estados del roadmap. Una propuesta solo pasa a trabajo activo cuando se registra aquí con un siguiente paso.

### Backlog de diseño

| Estado | Tema | Alcance / criterio |
|---|---|---|
| Hecho | Toast | Diseño de Figma implementado (K-27, C-08, I-04): iconos y semántica por tipo, tratamiento visual de error y presentación en Light, Dark e `inverse`. |
| Hecho | Decisiones de color C-05 | C-05 queda cerrado según el Sheet: D2 usa `border/default`, D3 usa `bg/inverse` y D4 usa el color del texto para el subrayado y `border-focused` para el foco. No hacen falta tokens nuevos; Divider, Modal, ProgressBar y Button ya cumplen. |
| Hecho | Tooltip | Diseñado e implementado según K-28, con acceso por teclado, posición adaptativa y soporte Light, Dark e `inverse`. |
| Aplazado | Popover | Esperar a que exista un caso real antes de diseñarlo o implementarlo (K-29). |
| Hecho | CommandPalette y Drawer | CommandPalette (#13, PR #19) y Drawer (#16, PR #21) están implementados y en `main`. |
| Condicional | Footer estrecho | Revisar el Footer a 960 px si vuelve a aparecer el caso de uso. |
| Hecho | Publicación en Figma Community | Librería publicada como [MonoSchemes · Monochrome UI Kit](https://www.figma.com/community/file/1706316593970846496/monoschemes-monochrome-ui-kit). | Mantener la ficha y el archivo de Figma alineados con futuras entregas. |
| Backlog | Archivo de monoschemes-kit | El sistema queda en Figma + `monoschemes-ui`; dejar el repo Kit en solo lectura cuando se complete el aviso/README de archivo. |
| Hecho | Issue de TagGroup | El PR #9 cerró los issues #2 y #6 al integrarse en `main`. |

Las páginas de prueba de Figma son referencias de exploración, no entregas independientes. Añadir allí pruebas nuevas cuando aporten un caso concreto.

## Paquete y pruebas con agentes

### Flujo de entrega y publicación (F-05)

- Los cambios visuales —componentes, tokens, estilos y stories— se desarrollan en una rama y PR. Codex los integra tras las comprobaciones; la revisión de Claude es opcional salvo que Carlos la solicite.
- Los cambios internos o de proceso —CI, scripts, documentación, tests y refactors sin efecto visual— pueden integrarse sin una revisión visual previa.
- Una publicación requiere que tests, lint, typecheck, build, `check:dist` y el smoke test de instalación del tarball pasen; también requiere versión semver nueva y entrada en `CHANGELOG.md`.
- Publicación propuesta: GitHub Actions con npm Trusted Publishing (OIDC); para un paquete público en un repo público npm genera provenance automáticamente. En npmjs.com habrá que registrar como publisher `salgadosomoza` / `monoschemes-ui` y el nombre exacto del workflow que se cree en `.github/workflows/`; el environment de GitHub es opcional y se decidirá al añadir protección de despliegues. El job necesitará `id-token: write`, runner alojado por GitHub y npm CLI ≥ 11.5.1 con Node ≥ 22.14.0. Hasta completar y probar OIDC, no publicar desde una credencial persistente. Si hiciera falta una publicación urgente, usar un token granular limitado al paquete y a publicar, guardarlo solo como secreto de GitHub, no en `.npmrc` ni en el repo, y revocarlo al terminar.
- Recomendación para `0.0.0-stage`: deprecar esa versión suelta para desaconsejar su instalación; queda pendiente ejecutar la acción en npm y verificar el mensaje de deprecación.

### Hecho

- El paquete se puede instalar y consumir como `@monoschemes/ui`; las versiones `0.1.0` y `0.1.1` están publicadas en npm.
- La versión 0.1.1 incluye el error de InlineNotification, tokens y temas en el CSS publicado, contrato, documentación de consumo, `llms.txt`, recetas y skill para Claude Code.
- **Ronda 1 · 0.0.1:** 8 intentos diagnósticos, contaminados por `claude-mem`; no es línea base. El problema principal fue el CSS publicado sin definiciones de tokens.
- **Ronda 2 · 0.0.2:** 4/4 aplicaciones completas; 47/48 de fidelidad; 1 error de sistema en T4 por usar `data-theme="dark"` en vez de `inverse`.
- **Ronda comparativa · 0.1.1:** 4/4 completas; 47/48; 1 error de sistema, el mismo uso fijo de `dark` en T4. Con esta muestra, la hipótesis H1 no queda apoyada; tampoco se demuestra que el paquete para agentes no ayude en general.
- **Comprobación focalizada · 19 nov 2026:** T4 se repitió con el criterio visual explícito (oscuro en página Light, claro en Dark), sin nombrar `inverse`. Claude Code consultó README, `llms.txt`, guía y receta; eligió `data-theme="inverse"`. Codex confirmó visualmente ambos temas; build y lint pasan. No es una ronda comparable ni permite aislar el efecto de cada documento.
- La última revisión de fricciones llevó a mejoras de integración en el commit `2c09750`. Los datos por intento, puntuaciones e incidencias se guardan en Sheets; [el resumen metodológico](agent-test/results.md) conserva conclusiones y límites, sin duplicar filas.
- Tras la consolidación, Sheets es el registro de resultados detallados y auditorías; este archivo conserva conclusiones, límites y acciones, no filas duplicadas de medición.

### Backlog de agentes

| Estado | Trabajo | Siguiente paso |
|---|---|---|
| Hecho | Registro de resultados | Las rondas y auditorías están consolidadas en Sheets; este roadmap y `docs/agent-test/results.md` conservan prioridades e interpretación. |
| Hecho | Recetas y DescriptionList | Las siete recetas y DescriptionList ya están integrados. La receta de dashboard usa las capacidades propias de búsqueda, selección y paginación de Table. | Mantener ejemplos alineados con cambios de API. |
| Hecho | Plantilla inicial Vite | PR #14 integrada y actualizada para `@monoschemes/ui` 0.2.0. |
| Backlog | Verificación automática | Añadir comprobaciones acordadas de contrato, tokens y accesibilidad; no ocultar diferencias válidas entre React y Figma. |
| Después de cambios sustantivos | Nueva prueba comparativa | Repetir las mismas tareas y métricas solo cuando cambien de forma material las instrucciones, recetas o APIs. La muestra seguirá siendo pequeña y debe presentarse como tal. |

## Ideas aparcadas

- **pen.dev:** experimento opcional; Figma sigue siendo la fuente visual.
- **Plugin de sincronización Figma ↔ código:** fuera del trabajo activo.

## Criterio para incorporar ideas desde Figma

Las ideas y pruebas del FigJam no pasan automáticamente a backlog. Se traen a este archivo cuando existe una necesidad concreta, una decisión o una siguiente acción verificable. Las métricas, resultados por intento y auditorías detalladas viven en las pestañas correspondientes de [Google Sheets](https://docs.google.com/spreadsheets/d/1ikcrIwANXxgAbemlEyYaduw7WdIrOqd1jYdNTBLUR5w/edit); las decisiones vigentes y sustituidas permanecen en `Registro`.
