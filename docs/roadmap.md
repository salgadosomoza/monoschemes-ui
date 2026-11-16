# Roadmap del paquete y de los agentes

Actualizado: 16 de noviembre de 2026.

## Objetivo · decisión F-04

Hacer que otros equipos y sus agentes puedan usar `@monoschemes/ui` como punto de partida para explorar y construir MVPs. Para el agente consumidor, la fuente de verdad es el paquete: código, contrato, documentación de uso y recetas. Figma sigue siendo la fuente visual.

**Hipótesis H1:** un agente sin contexto construye pantallas correctas en menos pasos y con menos errores con un paquete para agentes que con el paquete npm por sí solo. Se considerará apoyada si los errores de sistema se reducen al menos a la mitad y la fidelidad visual sube al menos 3 puntos sobre 12, sin reducir el número de tareas completas.

La ronda 1 no es una línea base válida: se ejecutó con el paquete 0.0.1, cuyo CSS no incluía los tokens, y hubo contaminación entre intentos por `claude-mem`. La ronda 2 con 0.0.2 queda como línea base válida. Carlos autorizó a Codex a lanzar las cuatro tareas en sesiones aisladas; las puntuaciones y límites están en [resultados](agent-test/results.md).

## Estado y siguiente acción

| Estado | Tema | Situación | Siguiente acción |
|---|---|---|---|
| Hecho | Paso 0 · paquete instalable | Exports, CSS, metadatos, `sideEffects`, `publishConfig`, README de consumo y fuentes tipográficas documentadas. | Mantener las comprobaciones del paquete en cada entrega. |
| Hecho | Paso 1 · ronda 1 | Ocho intentos con Claude Code Opus 5.5 y el paquete 0.0.1. Resultado contaminado; no usar como línea base. | Consultar [resultados](agent-test/results.md) solo como diagnóstico inicial. |
| Hecho | Paquete 0.0.2 | Commit `00a44f5`, publicado en GitHub. Incluye tokens y temas en CSS, `check:dist`, `no-console`, `Button type`, celdas `ReactNode`, AppHeader sin navegación ficticia y etiquetas accesibles configurables en FormPassword. | Base para la ronda 2. |
| Hecho | Paso 1b · ronda 2 | Cuatro tareas terminadas con el tarball local 0.0.2: login, ajustes, dashboard y landing. Todas compilan, pasan lint y typecheck; la revisión encontró una desviación en T4 (hero `dark` en vez de `inverse`). | Conservar la ronda como línea base antes del paquete para agentes. Ver [resultados](agent-test/results.md). |
| Hecho | Paso 2 · paquete para agentes | Guía de consumo, `llms.txt`, skill para Claude Code, recetas y orientación para 19 componentes principales en `components.json`. La guía distingue los tipos React de las propiedades de diseño y explica la zona `inverse`. | Mantener las instrucciones alineadas con los tipos publicados y las decisiones de Figma. |
| Hecho | Prueba prepublicación del paquete de agentes | El tarball local 0.0.2 incluye la documentación; un proyecto Vite limpio instaló el paquete, encontró las instrucciones y compiló una landing. El ensayo también detectó y permitió corregir la escala display incompleta en el mapa. | Ver [informe de la prueba](agent-test/package-smoke-test.md). Esta comprobación no es la ronda comparativa. |
| Hecho | Publicación npm 0.1.0 | Publicado como paquete público; instalado desde el registro en un proyecto Vite limpio y compilado correctamente. Preparación en el commit `86cdb82`. | Mantener la comprobación de instalación para los siguientes releases. |
| En revisión | InlineNotification · error (K-26, I-03) | Diseño aprobado en Figma; `default` y `error` están implementados en cambios locales sin commit. No corresponde publicarlo como 0.0.3 ahora que 0.1.0 está publicado. | Revisar e incluir en una versión posterior; 0.1.1 sería el siguiente patch si se mantiene como cambio compatible. |
| Backlog | Toast · decisión de diseño | La API acepta `success`, `warning` y `error`, pero Figma/código no definen estilos para esos tipos. | Decidir en Figma qué variantes existen y sus estilos antes de cambiar Toast. |
| Backlog | Storybook público | Publicar Storybook con GitHub Pages. El repo es público. | Añadir GitHub Action que construya `storybook-static` en cada push a `main` y publique el resultado. |
| Backlog | Paso 3 · recetas y plantilla | Recetas de login, ajustes, listado con filtros, detalle, formulario por pasos, estados vacío/error y plantilla inicial Vite + MonoSchemes. | Seleccionar las recetas útiles a partir de la ronda 2 y construirlas en código. |
| Backlog | Paso 4 · verificación automática | Comprobación de valores en bruto y accesibilidad en Storybook. | Definir alcance y umbrales después de fijar el paquete para agentes y las recetas. |
| Backlog | Paso 5 · prueba comparativa | Repetir las cuatro tareas con el paquete para agentes y compararlas con la línea base válida de la ronda 2. | Ejecutar cuando el paso 2 esté publicado; usar sesiones nuevas, mismos prompts y métricas. |
| Backlog | Code Connect | Falta confirmar el plan de Figma apropiado. | Confirmar plan y alcance antes de implementar Code Connect. |
| Aparcado | pen.dev | No forma parte de la ruta actual. | No iniciar salvo que se reactive explícitamente. |

La guía de publicación está en [publishing.md](publishing.md). La versión `0.1.0` ya está publicada en npm.

## Dependencias de diseño relacionadas

- El diseño de error de InlineNotification ya está aprobado en Figma; la implementación está en revisión local. La variante `success`/`warning` de Toast sigue sin decisión de diseño.
- Componentes de interacción que pueden ser necesarios: Tooltip, Popover, Drawer, Combobox y paleta de comandos. Su prioridad se decide con los resultados de la ronda 2.
- La publicación del kit en Figma Community no tiene fecha; `monoschemes-kit` se archivará cuando corresponda.
- Las dudas de color C-05 (D2 divisores, D3 relleno de progreso, D4 subrayado Button/Text) siguen pendientes de confirmación.
- Footer debe revisarse para contenedores estrechos (960 px) si la necesidad aparece de nuevo.
