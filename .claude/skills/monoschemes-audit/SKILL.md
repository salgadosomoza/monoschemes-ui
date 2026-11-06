---
name: monoschemes-audit
description: "Audita la coherencia entre los componentes de Figma, el contrato de la UI y React/Storybook. Úsala para revisar props, variantes, estados, nodos y enlaces de Storybook."
disable-model-invocation: false
---

# MonoSchemes UI Audit

Audita en modo de solo lectura. Antes de empezar, lee:

- `docs/figma-rules.md`
- `docs/component-contract.md`

## Alcance

Compara, cuando estén disponibles:

1. La instancia o componente identificado en Figma.
2. El contrato versionado en `src/tokens/components.json`.
3. La implementación React y sus historias de Storybook.

Si el contrato todavía no está presente en la UI, indícalo y limita la revisión a Figma, React e
historias. No inventes un contrato ni supongas valores ausentes.

## Reglas de comparación

- Compara literalmente los nombres, tipos, valores y defaults entre las superficies.
- No conviertas nombres o valores, no propongas alias y no infieras equivalencias (`hasX` no equivale
  a `showX`; `style` no equivale a `variant`).
- Valida `lowerCamelCase` para props y `lowercase-kebab-case` para valores de diseño. Conserva la
  sintaxis de valores técnicos reconocidos en las reglas de Figma.
- `disabled` debe ser booleano.
- Excluye del contrato funcional las propiedades autogeneradas de Figma con `#id`.
- Comprueba que `parameters.design.url` de la historia enlaza al mismo nodo de Figma.
- Distingue hechos observados de datos que no pudiste consultar.

## Procedimiento

1. Obtén la lista o el nombre de componentes a revisar desde el usuario o el contrato disponible.
2. Lee el contrato y localiza en React el componente y sus historias.
3. Consulta únicamente los nodos Figma necesarios para la revisión.
4. Compara props, tipos, valores, defaults, estados, nodo y enlace de Storybook.
5. Presenta hallazgos sin corregir datos ni archivos.

Si Figma no está accesible, continúa con los datos locales y marca Figma como no verificado.

## Informe

Resume:

- superficies consultadas y componentes revisados;
- discrepancias con el valor literal de cada superficie;
- elementos no verificables y datos ausentes;
- decisiones que necesita tomar el mantenedor.

No escribas en Figma, el contrato, React ni Storybook. No ofrezcas un modo `fix`.
