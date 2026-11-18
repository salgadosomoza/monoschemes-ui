# Pruebas de adopción con agentes · resumen

Los registros por intento, tiempos, puntuaciones, incidencias de la librería y el seguimiento de fricciones están en la pestaña [Prueba agentes de Google Sheets](https://docs.google.com/spreadsheets/d/1ikcrIwANXxgAbemlEyYaduw7WdIrOqd1jYdNTBLUR5w/edit#gid=1506660771). Este archivo conserva la metodología y la interpretación para que las rondas no se lean fuera de contexto.

## Rondas

- **R1 · diagnóstico histórico, paquete 0.0.1:** 8 intentos contaminados por memoria compartida y por acceso accidental a archivos externos. El paquete no incluía las definiciones de tokens en el CSS publicado; no sirve como comparación limpia.
- **R2 · línea base válida, tarball 0.0.2:** 4/4 aplicaciones completas; build, lint y TypeScript pasan; fidelidad 47/48. El único error de sistema está en T4: se fijó `data-theme="dark"` donde correspondía una zona `inverse`.
- **R3 · comparativa, npm 0.1.1 con guía, recetas y skill:** 4/4 completas; build, lint y TypeScript pasan; fidelidad 47/48. Se repite el mismo error en T4. Las fricciones de API observadas se corrigieron después en `2c09750`; la regla de zona `inverse` también se aclaró, pero la repetición demuestra que la documentación por sí sola no evitó el error en esa muestra.

## Lectura y límites

R2 y R3 son cuatro tareas únicas cada una, no repeticiones suficientes para estimar variación entre agentes. La muestra no muestra mejora entre versiones y no permite concluir que la guía no ayude en general. Los recuentos de pasos no son fiables en el formato TUI y quedan como N/D; los tiempos son los comunicados al final de cada tarea. La prueba mide integración, comprobaciones y fidelidad de implementación, no una revisión visual independiente de todas las pantallas.

En R3, npm avisó de cinco vulnerabilidades altas en el árbol heredado de la plantilla. No se cambiaron dependencias durante la prueba para preservar la comparación.

## Próximo uso

No repetir las mismas cuatro tareas hasta que cambien materialmente el paquete, las instrucciones o las recetas. La siguiente comprobación útil es una prueba focalizada de zonas `inverse`, más una receta responsive para `Text` display; sus decisiones y resultados deben actualizarse en Sheets y resumirse en [el roadmap](../roadmap.md).
