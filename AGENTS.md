# MonoSchemes UI — instrucciones del repositorio

`@monoschemes/ui` es la implementación React y TypeScript del sistema de diseño MonoSchemes.
Se mantiene junto al archivo de diseño de Figma y se documenta en Storybook.

## Fuentes de autoridad

- **Figma** define la anatomía, composición y decisiones visuales. Sus Variables son la fuente
  canónica de los design tokens.
- **React** define la implementación, el comportamiento y la accesibilidad.
- **Storybook** documenta y valida visualmente la implementación; vive dentro de este repositorio.
- El contrato de componentes registra las props, tipos, valores y defaults acordados.

Las decisiones visuales y los tokens se fijan en Figma antes de propagarlos a la UI. Las decisiones
de comportamiento y accesibilidad se implementan en React y se documentan en Storybook. No conviertas
automáticamente nombres ni valores entre superficies.

## Convenciones

- Componentes: `PascalCase`; props: `lowerCamelCase` en Figma, contrato y React.
- Los nombres se comparan literalmente. `style` y `variant` son props distintas; `style` está
  reservado y requiere una decisión explícita para corregirlo.
- Los valores de diseño usan `lowercase-kebab-case`. Los valores técnicos conservan su sintaxis.
- `disabled` es booleano, no un valor de `state` o `variant`.
- Las propiedades de Figma con sufijo `#id` no forman parte del contrato funcional.

Consulta [CONTRIBUTING.md](CONTRIBUTING.md), [docs/figma-rules.md](docs/figma-rules.md) y
[docs/component-contract.md](docs/component-contract.md) antes de cambiar convenciones compartidas.

## Estructura

```text
src/components/[ComponentName]/
  [ComponentName].tsx
  [ComponentName].css
  index.ts
stories/[ComponentName].stories.tsx
```

Cada historia de componente enlaza al nodo exacto de Figma mediante `parameters.design`.

## Comprobaciones

Ejecuta las comprobaciones aplicables al cambio:

```bash
npm run lint
npm run test:run
npm run build
npm run build:storybook
```

Storybook 10 está instalado en este repositorio. Usa sus paquetes y APIs de la versión 10.
