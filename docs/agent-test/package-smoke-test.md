# Prueba de consumo del paquete para agentes

Actualizado: 16 de noviembre de 2026.

## Paquete inspeccionado

- Paquete: `@monoschemes/ui@0.0.2` (tarball local; esta comprobación no publicó en npm).
- Tarball: 138 archivos, 97,3 kB comprimido y 452,4 kB sin comprimir.
- SHA-1: `d2c50f1148a3e9b27a17d80cfa344a73382c8eb5`.
- Incluye `dist/`, README, licencia, `llms.txt`, guía y recetas para agentes, skill de Claude Code, declaraciones TypeScript y JSON de tokens/componentes.
- No incluye el `AGENTS.md` de la raíz del repositorio, que contiene instrucciones de mantenimiento. La guía de consumo está en `docs/agent-package/AGENTS.md` y queda enlazada desde el README incluido y `llms.txt`.

## Instalación limpia

Instalé el tarball en un proyecto temporal Vite + React + TypeScript, en `/private/tmp/monoschemes-agent-check/project`.

- `npm install`: correcto; npm no reportó vulnerabilidades.
- Importé `Button`, `FormInput`, `FeatureCard`, `Footer`, `Link` y `Text`, además de `@monoschemes/ui/style.css`.
- `npm run build` (`tsc -b` y build de producción de Vite): correcto, sin errores de tipos o exports.
- El paquete instalado contenía la guía, las recetas, el skill, `llms.txt`, el mapa de componentes y el JSON de tokens.

## Prueba de uso de las instrucciones por un agente

Inicié una sesión nueva de Claude Code Opus 5.5 con `--safe-mode` en el proyecto temporal. El primer prompt le pidió leer el README y `llms.txt`, seguir la guía y la receta de landing, y construir una página temática.

El agente usó `data-theme="inverse"`, `Text` con `display-2`, `FeatureCard`, `Button` y `Footer variant="minimal"`; para el layout usó variables de espaciado y color del paquete. No añadió otra librería de UI ni tokens de color propios. El proyecto pasó TypeScript y build de producción.

La prueba detectó que el mapa de componentes solo enumeraba el valor antiguo de display en `Text`. Corregí el mapa y la guía para incluir `display-1`, `display-2` y `display-3`, y marcar `display` como obsoleto. Reconstruí el tarball e instalé la versión corregida; el `components.json` instalado contiene los valores actualizados.

Esta es una comprobación de documentación y uso, separada de la línea base de cuatro tareas y de la futura ronda comparativa.

## Pendiente

No hice bump de versión, alta en npm, login, publicación, release de GitHub ni ronda comparativa. Esos pasos quedan para después de revisar este paquete.
