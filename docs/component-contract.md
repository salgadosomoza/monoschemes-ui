# Contrato de componentes

El contrato recoge las decisiones acordadas para la API pública de cada componente. Una historia de
Storybook documenta su uso y sus estados; no sustituye el contrato.

## Responsabilidades

### Figma

- Define la anatomía visual, composición, variantes y propiedades de diseño.
- Usa nombres de props en `lowerCamelCase` y valores de diseño en `lowercase-kebab-case`.
- Representa `disabled` como booleano.

### React

- Implementa el comportamiento y expone una API tipada en TypeScript.
- Conserva literalmente los nombres y valores acordados; no aplica alias ni transformaciones
  automáticas.
- Incluye semántica y estados accesibles.

### Storybook

- Documenta props, valores, estados, ejemplos y casos límite pertinentes.
- Incluye historias con `parameters.design` enlazado al nodo de Figma correspondiente.

## Datos que registra el contrato

Para cada componente, el contrato acordado debe poder describir:

- nombre del componente y referencia a su nodo de Figma;
- props, tipos, valores permitidos y defaults;
- estados relevantes y comportamiento observable.

El contrato vigente está en [`src/tokens/components.json`](../src/tokens/components.json), junto a los tokens de la UI.
Hasta entonces, trata esta página como la definición de los criterios, no como prueba de que el archivo
ya existe en este repositorio.

## Definición de terminado

Un componente está listo cuando su diseño y API están acordados, React implementa el comportamiento
con accesibilidad, Storybook documenta los estados relevantes y las comprobaciones aplicables pasan.
