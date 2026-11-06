# Contexto de MonoSchemes UI

MonoSchemes es un sistema de diseño. Este repositorio contiene su biblioteca pública de componentes
React, tipada con TypeScript y documentada en Storybook 10.

## Superficies y autoridad

- **Figma**: anatomía, composición y decisiones visuales. Figma Variables es la fuente canónica de
  los design tokens.
- **React**: comportamiento, API de los componentes y accesibilidad.
- **Storybook**: documentación y validación visual de la implementación React; forma parte de este
  repositorio.

El flujo se decide por dominio. Para un cambio visual, define primero la decisión en Figma y luego
propágala a tokens y UI. Para comportamiento y accesibilidad, resuelve la implementación en React y
valídala y documéntala en Storybook. No hay una superficie que prevalezca fuera de su dominio.

## Repositorio

- Paquete: `@monoschemes/ui`
- Stack: React, TypeScript, Vite y Storybook 10.
- Componentes: `src/components/`
- Tokens para la UI: `src/tokens/tokens.json` y `src/styles/tokens.css`
- Historias: `stories/` y junto a algunos componentes.
- Archivo de diseño: [MonoSchemes en Figma](https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB)

Storybook es la documentación interactiva del paquete, no un producto ni una superficie de diseño
separados.
