# MonoSchemes UI — instrucciones del repositorio

`@monoschemes/ui` es la implementación React y TypeScript del sistema de diseño MonoSchemes.
Se mantiene junto al archivo de diseño de Figma y se documenta en Storybook.

## Fuentes de autoridad

- **Figma** define la anatomía, composición y decisiones visuales. Sus Variables son la fuente
  canónica de los design tokens.
- **React** define la implementación, el comportamiento y la accesibilidad.
- [**Storybook**](https://monoschemes.salgadosomoza.com/) documenta y valida visualmente la implementación. Sus historias viven en este repositorio.
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
  [ComponentName].stories.tsx
stories/[FoundationOrPattern].stories.tsx
```

Las historias de cada componente viven junto a su implementación. La carpeta raíz `stories/`
se reserva para fundamentos y patrones que combinan varios componentes. Cada historia de
componente enlaza al nodo exacto de Figma mediante `parameters.design`.

## Flujo de trabajo

- Codex gestiona autónomamente ramas, commits, push, roadmap y publicación en npm, siguiendo las condiciones de revisión y release de [CONTRIBUTING.md](CONTRIBUTING.md).
- Los cambios visuales van en una rama y un PR. Codex los integra tras las comprobaciones; la revisión de Claude es opcional y solo se espera si Carlos la solicita. Los cambios internos o de proceso no necesitan revisión visual previa.
- Al empezar una sesión, revisa las issues abiertas con `design`. Los encargos de Claude llevan `design` y `from:claude`; enlázalos al PR con `Closes #N` y ciérralos al entregar.
- Al empezar una sesión, revisa también tus PR abiertos y responde a los comentarios nuevos. Si Carlos pide cambios, corrígelos en la misma rama y responde en el hilo; si no hay revisión solicitada, integra tras verificar.
- Claude y Codex no firman issues, PR ni comentarios. La procedencia se indica únicamente con las etiquetas `from:claude` y `from:codex`. Los mensajes sin etiqueta `from:` son de Carlos. Los commits no llevan trailers `Co-authored-by`.

## Comprobaciones

Ejecuta las comprobaciones aplicables al cambio:

```bash
npm run lint
npm run test:run
npm run build
npm run build:storybook
```

## Roadmap y pruebas con agentes

Consulta [docs/roadmap.md](docs/roadmap.md) y [docs/agent-test/](docs/agent-test/) para el roadmap del paquete y el protocolo de evaluación con agentes. Mantén `docs/roadmap.md` al día en cada entrega.

Storybook 10 está instalado en este repositorio. Usa sus paquetes y APIs de la versión 10.
