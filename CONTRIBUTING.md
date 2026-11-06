# Contribuir a MonoSchemes UI

Esta guía describe el flujo público para proponer cambios a `@monoschemes/ui`.

## Antes de cambiar

1. Lee las [instrucciones del repositorio](AGENTS.md) y las [reglas de diseño](docs/design-principles.md).
2. Busca componentes y patrones equivalentes antes de añadir una abstracción.
3. Decide qué autoridad aplica: Figma para apariencia y tokens; React para comportamiento y
   accesibilidad; Storybook para documentación y validación visual.
4. Si una decisión afecta el API de un componente, registra los nombres, tipos, valores y defaults
   acordados en el contrato del componente.

## Flujo de trabajo

- Cambios visuales y tokens: actualiza primero Figma Variables y el diseño pertinente; después
  actualiza el JSON de tokens y la implementación React.
- Cambios de comportamiento o accesibilidad: implementa en React y documenta los estados en
  Storybook. Actualiza Figma cuando la interacción o apariencia diseñada también cambie.
- No conviertas nombres ni valores automáticamente entre Figma y React. Si no coinciden, resuelve
  explícitamente la decisión antes de propagar el cambio.
- Mantén las historias enlazadas al nodo de Figma pertinente mediante `parameters.design`.

## Comprobaciones locales

Desde la raíz del repositorio:

```bash
npm install
npm run lint
npm run test:run
npm run build
npm run build:storybook
```

Ejecuta las comprobaciones relevantes para el cambio y describe cualquier limitación al abrir una
solicitud de cambio.

## Documentación de referencia

- [Contexto del proyecto](docs/project-context.md)
- [Contrato de componentes](docs/component-contract.md)
- [Reglas de Figma](docs/figma-rules.md)
- [Checklist de revisión](docs/review-checklist.md)
