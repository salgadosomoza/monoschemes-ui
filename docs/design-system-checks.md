# Comprobaciones del sistema de diseño

`npm run check:design-system` valida invariantes locales que pueden comprobarse sin comparar
automáticamente React con Figma:

- Los aliases semánticos de color en `tokens.json` apuntan a primitivos existentes.
- Los tokens de diseño usados en CSS y TypeScript (`color`, `spacing`, `gap`, tipografía,
  movimiento, radios y medidas relacionadas) están declarados en `src/styles/tokens.css`.
- Las entradas de `components.json` tienen una forma válida, nodos de Figma bien formados cuando
  se proporcionan, descriptores de props con tipo y valores para props `variant`/`enum`.

La comprobación no afirma que nombres, valores, props o nodos coincidan con Figma: esa comparación
requiere consultar la fuente visual y resolver explícitamente las diferencias. Tampoco sustituye las
pruebas de interacción, la revisión de accesibilidad ni la comprobación visual de Storybook. El addon
de accesibilidad de Storybook sigue disponible para esa revisión.

El flujo de CI ejecuta esta comprobación junto con lint, TypeScript, tests, builds, `check:dist` y
el smoke test del paquete en cada pull request y push a `main`.
