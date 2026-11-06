---
name: monoschemes-component
description: "Prepara una especificación de diseño y API para componentes MonoSchemes. Úsala para proponer componentes nuevos, revisar una API o analizar cambios y estados."
disable-model-invocation: false
---

# MonoSchemes Component Spec

Prepara especificaciones; no escribas código ni modifiques Figma o archivos. Lee antes:

- `docs/design-principles.md`
- `docs/component-contract.md`
- `docs/figma-rules.md`

## Procedimiento

1. Clasifica la petición: `new`, `refactor`, `api` o `analyze`.
2. Revisa si el componente o un patrón equivalente existe en la UI.
3. Define la anatomía, la API, los estados relevantes y el uso de tokens.
4. Separa decisiones visuales (Figma) de decisiones de comportamiento y accesibilidad (React).
5. Expón incertidumbres y decisiones bloqueantes antes de recomendar una implementación.

Si falta un nodo, comportamiento esperado o requisito que cambia sustancialmente la API, pregunta
antes de cerrar la especificación. No inventes nombres, valores o defaults.

## Convenciones

- Props en `lowerCamelCase`, con el mismo nombre literal en Figma, contrato y React.
- Valores de diseño en `lowercase-kebab-case`; conserva la sintaxis de valores técnicos.
- `style` y `variant` son distintos. No sugieras conversión automática ni alias.
- `disabled` es booleano.
- Excluye props autogeneradas de Figma con `#id` del contrato funcional.
- Considera teclado, foco, nombres accesibles, lectores de pantalla y contraste.
- Usa composición cuando reduzca duplicación sin crear abstracciones innecesarias.

## Formato de salida

### Spec de [Componente]

- **Intent:** `new` | `refactor` | `api` | `analyze`
- **Tipo:** interactivo | formulario | visualización | otro
- **Diseño de Figma:** nodo y anatomía pertinente
- **Comportamiento:** acciones, límites y accesibilidad

#### API propuesta

| Prop | Tipo Figma | Tipo React | Valores | Default | Descripción |
|---|---|---|---|---|---|

#### Estados y composición

Enumera estados relevantes, partes componibles y tokens visuales que se usarían.

#### Decisiones pendientes y riesgos

Incluye solo decisiones reales y hasta tres riesgos concretos. No incluyas bloques de código.
