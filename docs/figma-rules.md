# Reglas de Figma

## Autoridad

Figma es la fuente canónica de las decisiones visuales y de los design tokens. React/Storybook es
autoridad sobre implementación, comportamiento y accesibilidad. Las discrepancias se informan y se
resuelven explícitamente.

## Variables y tokens

- Define y mantiene los design tokens como Figma Variables.
- Usa `/` para la jerarquía de nombres, por ejemplo `primitive/gray/900` o
  `semantic/background/subtle`.
- Configura explícitamente los modos `Light` y `Dark` para variables semánticas que los necesiten.
- `src/tokens/tokens.json` es una representación versionada para la UI, no una fuente independiente.
  Hasta automatizar la sincronización, actualízala después de modificar Figma Variables.

## Componentes y props

- Nombra componentes con la jerarquía del sistema, por ejemplo `Form/Input` o `Accordion/Item`.
- Usa `lowerCamelCase` para las props en Figma, React y el contrato. Los nombres deben coincidir
  literalmente: no conviertas `Status` en `status`, ni `style` en `variant`.
- `style` está reservado y se considera distinto de `variant`; cualquier corrección requiere cambiar
  explícitamente la decisión en las superficies pertinentes.
- Usa `lowercase-kebab-case` para valores de diseño. Los valores técnicos conservan su sintaxis.
- `disabled` debe ser una propiedad booleana, no un valor de `state` o `variant`.
- Las propiedades autogeneradas con `#id`, como `label#3:2`, quedan fuera del contrato funcional.
- Usa component swap para iconos cuando exista el componente correspondiente.

## Revisión

Antes de propagar un cambio visual, comprueba el nodo, las variantes, los bindings de variables y los
modos. Revisa después la representación en Storybook y el uso de tokens en React.
