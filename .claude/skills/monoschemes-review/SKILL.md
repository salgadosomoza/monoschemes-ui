---
name: monoschemes-review
description: "Revisa cambios de MonoSchemes UI antes de integrarlos. Úsala para encontrar problemas de API, accesibilidad, tokens, Figma, Storybook o regresiones."
disable-model-invocation: false
---

# MonoSchemes UI Review

Realiza una revisión de solo lectura. Lee `docs/review-checklist.md` y los archivos afectados antes
de emitir hallazgos.

## Revisión

- Prioriza errores que puedan causar comportamiento incorrecto, regresiones o problemas de
  accesibilidad.
- Comprueba consistencia de props y valores sin transformar nombres ni inventar equivalencias.
- Revisa uso de tokens y coherencia con Figma cuando haya datos disponibles.
- Revisa historias y documentación de Storybook para los estados relevantes.
- Comprueba cambios de configuración o dependencias que afecten build, lint o pruebas, sin ejecutar
  comandos salvo que el usuario lo pida.
- Separa los hallazgos confirmados de preguntas o áreas no verificables.

## Salida

Lista primero cada hallazgo con severidad, archivo y línea aproximada, efecto observable y motivo.
Después resume los aspectos revisados y las limitaciones. Si no hay hallazgos, dilo explícitamente.

No edites archivos ni Figma. No conviertas la revisión en una propuesta de reescritura completa.
