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

### Revisión, integración y publicación (F-05)

- Desarrolla cambios visuales en una rama dedicada y abre un PR. Codex puede integrarlos tras las comprobaciones; solicita revisión visual solo si Carlos la pide.
- Los cambios internos o de proceso —CI, scripts, documentación, tests y refactors sin efecto visual— no necesitan revisión visual previa; Codex puede integrarlos según el roadmap.
- Los encargos de diseño de Claude se gestionan como issues `design` + `from:claude`. Los PR llevan `Closes #N`; las correcciones se hacen en la misma rama, respondiendo a los comentarios. Al iniciar una sesión, Codex revisa las issues abiertas con `design`.
- Claude y Codex no firman issues, PR ni comentarios. La procedencia se indica únicamente con las etiquetas `from:claude` y `from:codex`. Los mensajes sin etiqueta `from:` son de Carlos. Los commits no llevan trailers `Co-authored-by`.
- No publiques si falla cualquiera de estas comprobaciones: tests, lint, typecheck, build, `check:dist` o smoke test de instalación del paquete. Cada release usa una versión semver nueva y una entrada en `CHANGELOG.md`.
- La vía prevista de npm es GitHub Actions con Trusted Publishing mediante OIDC; para este paquete público en un repositorio público, npm genera provenance automáticamente. En npmjs.com registra el publisher de GitHub con owner `salgadosomoza`, repository `monoschemes-ui` y el nombre exacto del workflow bajo `.github/workflows/`; el environment es opcional. El job necesita `id-token: write`, runner hospedado por GitHub y npm CLI ≥ 11.5.1 con Node ≥ 22.14.0. Hasta validar OIDC, no publiques con una credencial persistente. Si una publicación urgente lo exigiera, crea un token granular limitado al paquete y a publicar, guárdalo solo como secreto de GitHub, evita incluirlo en `.npmrc` o el repo y revócalo al terminar.

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
