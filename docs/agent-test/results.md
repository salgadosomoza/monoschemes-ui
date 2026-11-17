# Resultados de las pruebas con agentes

## Ronda 1 · diagnóstico histórico (no es línea base)

Ocho intentos con Claude Code y Opus 5.5, usando `@monoschemes/ui@0.0.1`. Los ocho dieron cero errores de TypeScript según el registro de la prueba. El paquete estaba roto para consumo visual: `dist/style.css` referenciaba tokens que no definía. Tres agentes terminaron sin estilos del sistema; los otros cinco inventaron o copiaron tokens localmente. Además, `claude-mem` compartió instrucciones entre sesiones, por lo que la ronda no es una comparación limpia.

El análisis de los artefactos encontró que los ocho importaron `@monoschemes/ui/style.css` y que los ocho pasaron `tsc --noEmit`. En los cinco intentos que copiaron tokens del sistema al proyecto, el analizador encontró entre 103 y 133 definiciones propias y entre 24 y 78 valores de color en crudo. Los otros tres no definieron tokens propios. Los tiempos suman los segmentos de actividad del transcript; el conteo de acciones y el detalle por intento se pueden regenerar con `score.mjs`.

| Intento | Tarea | Tiempo total | Mensajes tras el primero | Tokens locales | Colores en crudo | `tsc --noEmit` |
|---|---|---:|---:|---:|---:|---|
| t1-login-1 | Login | 1m 53s | 0 | 0 | 0 | Pasa |
| t1-login-2 | Login | 3m 58s | 2 | 103 | 52 | Pasa |
| t2-ajustes-1 | Ajustes | 1m 18s | 0 | 0 | 0 | Pasa |
| t2-ajustes-2 | Ajustes | 1m 18s | 2 | 103 | 52 | Pasa |
| t3-dashboard-1 | Dashboard | 1m 34s | 0 | 0 | 0 | Pasa |
| t3-dashboard-2 | Dashboard | 3m 55s | 0 | 103 | 78 | Pasa |
| t4-landing-1 | Landing | 3m 16s | 0 | 103 | 52 | Pasa |
| t4-landing-2 | Landing | 2m 57s | 0 | 133 | 24 | Pasa |

Los mensajes adicionales de t1-login-2 pidieron una versión del paquete con tokens y que se resolviera todo dentro de la carpeta de la tarea. Los de t2-ajustes-2 pidieron un informe exportable y luego que se mostrara en el chat. Esta contaminación invalida ambas sesiones como observaciones limpias.

### Fallos observados de la librería 0.0.1

- CSS publicado sin definiciones de tokens; tres intentos terminaron sin estilos y cinco añadieron o copiaron tokens.
- `FormInput`, `FormSelect`, `FormSearch`, `FormTextarea` y `FormDate` conservaban un máximo/medida de 232 px que impedía llenar columnas más anchas.
- El CSS publicado contenía una regla global de `body` que podía alterar el proyecto consumidor.
- `Button` no exponía `type`, por lo que el formulario no podía usarlo como submit de manera normal.
- `Table` aceptaba solo texto/números y tenía un wrapper de 1080 px; no permitía presentar estados como `Tag`.
- `AppHeader` insertaba enlaces de ejemplo aunque el consumidor no proporcionara `nav`.
- `FormPassword` tenía etiquetas accesibles de mostrar/ocultar no configurables.
- Había `console.log` de depuración en FormToggle y FormCheckbox.
- En la landing, ningún agente usó la zona `data-theme="inverse"` ni `Card/Feature`.
- En el dashboard, un agente señaló que Table no admitía `Tag`; en landing, un agente evitó `Grid` por su número fijo de columnas. Se registran como elecciones/limitaciones de esa ronda, no como puntuación de fidelidad.
- `Grid` usa un número fijo de columnas y no se adapta por sí mismo al ancho disponible; en la landing se evitó y se construyeron las rejillas con CSS de layout.

## Ronda 2 · línea base válida · completada

Ejecutada el 16 de noviembre de 2026 con `@monoschemes/ui@0.0.2`, a partir del tarball local `monoschemes-ui-0.0.2.tgz`. Se prepararon cuatro carpetas desde una plantilla Vite y se lanzó una sesión nueva de Claude Code Opus 5.5 por tarea. `--safe-mode` desactivó personalizaciones, incluida la memoria compartida; cada sesión escribió solo en su propia carpeta. Los prompts completos fueron el primer mensaje. No se dieron indicaciones de implementación. En T3 hubo una pregunta y se respondió con la frase prescrita «Decide tú y continúa».

### Resultado

- **4 de 4 aplicaciones completas y compilables.** Todas importan `@monoschemes/ui/style.css` y pasan `tsc`, `npm run build` y `npm run lint`.
- **0 tokens locales y 0 colores en crudo** detectados en el CSS de las cuatro aplicaciones. No se añadieron dependencias de UI.
- **1 discrepancia de diseño** en T4: el hero usa `data-theme="dark"` en vez de la zona `data-theme="inverse"` definida por el sistema. Se ve oscuro y la aplicación ofrece ambos temas, pero no respeta el patrón de zona invertida y no se invierte con el tema de la página.
- Fidelidad revisada en código: 12/12 en T1, T2 y T3; 11/12 en T4 (47/48 en total). La puntuación no sustituye una revisión visual en navegador.
- El analizador automatizado no pudo recuperar los recuentos de pasos ni tiempos fiables desde la transcripción TUI: omitió resúmenes de acciones y contó varias veces algunos intervalos redibujados. No se usan esos datos como medición.

| Intento | Completa | Pasos | Tiempo | Errores de sistema | Fidelidad /12 | Intervenciones | Notas |
|---|---|---|---|---:|---:|---|---|
| t1-login | Sí | N/D | N/D | 0 | 12 | 0 | Usa FormInput, FormPassword, FormCheckbox, Button, Link e InlineNotification; simulación de autenticación. |
| t2-ajustes | Sí | N/D | N/D | 0 | 12 | 0 | Tabs, FormInput, FormSelect, SegmentedControl, FormToggle y botones Guardar/Cancelar; tema de sistema. |
| t3-dashboard | Sí | N/D | N/D | 0 | 12 | 1 respuesta prescrita | Usa AppHeader, SideNav, Stat, FormSearch, FormMultiSelect, Table, Pagination y EmptyState; filtro y estado vacío funcionales. |
| t4-landing | Sí | N/D | N/D | 1 | 11 | 0 | Usa FeatureCard, Card, Stat, Footer minimal y display-3; el hero usa `dark` en lugar de `inverse`. |

### Comprobaciones posteriores

El script `score.mjs` reportó `tsc` correcto en las cuatro carpetas, importación de `style.css` en las cuatro, cero definiciones locales de tokens, cero colores en crudo y cero dependencias adicionales. Ejecuté también build y lint después de terminar cada agente; ambos comandos pasaron en las cuatro.

La ronda 1 sigue siendo solo diagnóstico histórico y no se compara estadísticamente con esta muestra de cuatro tareas. La ronda 2 queda como línea base para la prueba comparativa después de publicar el paquete para agentes. La muestra actual es pequeña (una ejecución por tarea); no mide variabilidad entre agentes ni permite concluir si el paquete reduce errores frente a otra versión.


## Ronda comparativa · paquete publicado 0.1.1 · completada

Ejecutada el 17 de noviembre de 2026. Se repitieron las cuatro tareas con el paquete publicado `@monoschemes/ui@0.1.1`, que incluye `llms.txt`, `docs/agent-package/AGENTS.md`, recetas y la skill distribuida. Cada tarea usó una sesión nueva de Claude Code Opus 5.5 con `--safe-mode`, en su propia carpeta. El prompt exacto fue el primer mensaje; no hubo intervenciones posteriores. Los cuatro transcripts TUI y el código de cada intento se conservaron en la carpeta de la ronda.

La instalación del paquete advirtió de 5 vulnerabilidades de severidad alta en el árbol heredado de dependencias de la plantilla. No se ejecutó `npm audit fix` ni se cambiaron versiones para no contaminar la comparación.

### Resultado

- **4 de 4 aplicaciones completas.** Las cuatro pasan `npm run build`, `npm run lint` y `tsc --noEmit`.
- Las cuatro importan `@monoschemes/ui/style.css`; el análisis encuentra **0 tokens locales**, **0 colores en crudo**, **0 radios** y **0 sombras** en CSS de la aplicación.
- No añadieron dependencias de UI ni colores del sistema. Las dependencias de Vite, TypeScript y lint ya estaban en la plantilla.
- Fidelidad revisada: **47/48**, igual que la ronda 2.
- **1 error de sistema** en T4: el hero usa `data-theme="dark"` en vez de `data-theme="inverse"`, aunque la guía y la receta incluidas en el paquete indican expresamente que no se sustituya una zona inversa por una zona fija oscura. La captura de Dark confirma que el hero permanece oscuro en vez de invertir al tema claro.
- La hipótesis H1 **no queda apoyada por esta muestra**: la ronda 2 tenía 1 error y 47/48; la ronda comparativa repite 1 error y 47/48. No hay reducción del 50 % de errores ni una mejora de al menos 3 puntos. Son cuatro tareas únicas, así que esto no demuestra que las instrucciones no ayuden en general; indica que esta ronda no detectó mejora.

| Intento | Completa | Pasos | Tiempo | Errores de sistema | Fidelidad /12 | Intervenciones | Notas |
|---|---|---|---:|---:|---:|---|---|
| t1-login | Sí | N/D | 1m 10s | 0 | 12 | 0 | Usa los componentes de login previstos; añade Card y un selector de tema para permitir la comprobación Light/Dark. Autenticación simulada. |
| t2-ajustes | Sí | N/D | 1m 52s | 0 | 12 | 0 | Usa Tabs, FormInput, FormSelect, SegmentedControl, FormToggle y Button. Tema de sistema, cancelar y guardar funcionales. |
| t3-dashboard | Sí | N/D | 2m 53s | 0 | 12 | 0 | Usa AppHeader, SideNav, Stat, FormSearch, FormMultiSelect, Table, Pagination y EmptyState; filtros y estado vacío funcionales. |
| t4-landing | Sí | N/D | 2m 28s | 1 | 11 | 0 | Usa FeatureCard, Card, Footer minimal, Text display y Button. El hero fijo oscuro incumple el patrón inverse. |

Los pasos se dejan como N/D porque el formato TUI no permite contar acciones con fiabilidad; se registran los tiempos finales comunicados por Claude, sin sumar intervalos de redibujado. Las comprobaciones automáticas se ejecutaron después de cerrar las cuatro tareas. `score.mjs` se ejecutó sobre una copia temporal de análisis para no alterar las carpetas de la ronda.

### Fricciones de API detectadas

- **AppHeader:** cuando no hay navegación superior, las acciones no se alinean al extremo derecho en escritorio. T3 lo resolvió con una regla sobre la clase interna `.app-header-actions`; es una dependencia de implementación que conviene eliminar o documentar.
- **FormSearch:** no acepta una etiqueta visible como prop. T3 añadió una etiqueta HTML enlazada mediante `id`.
- **Pagination:** las etiquetas accesibles del contenedor siguen en inglés y no son configurables; T3 sí pudo traducir los botones Prev/Next.
- **FormSelect:** no acepta `name` ni `id`; T2 mantuvo el valor en el estado de React.
- **Text display:** los tamaños son fijos. T4 seleccionó display-2/display-3/h1 según el ancho de pantalla y añadió reglas de ajuste de línea para evitar desbordamiento móvil.

Estas fricciones no se cuentan como errores de sistema de la tarea: las pantallas compilan y mantienen sus funciones y semántica. Se anotan para decidir si requieren cambios de API o recetas de consumo. La única discrepancia de patrón observada que afecta la puntuación es el uso de `dark` en T4.
