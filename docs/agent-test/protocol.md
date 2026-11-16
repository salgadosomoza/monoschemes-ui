# Protocolo de la prueba con agentes

## Hipótesis y rondas

**H1 (F-04):** un agente sin contexto construye pantallas correctas con menos pasos y errores si dispone de un paquete para agentes, comparado con tener solo el paquete npm. La hipótesis se apoya si los errores de sistema bajan al menos un 50 % y la fidelidad mejora al menos 3 puntos de 12, sin perder tareas completas.

- **Ronda 1:** ocho intentos con `@monoschemes/ui@0.0.1`. No es línea base válida porque el CSS publicado no definía los tokens y hubo contaminación de `claude-mem` entre intentos. Sirve como diagnóstico histórico.
- **Ronda 2:** cuatro intentos, uno por tarea, con `@monoschemes/ui@0.0.2`. Esta es la línea base válida antes del paquete para agentes.
- **Ronda comparativa:** repetir las mismas tareas después de publicar el paso 2. Comparar con ronda 2, no con ronda 1.

## Condiciones de ejecución

1. Iniciar cuatro sesiones nuevas de Claude Code, una por tarea, en `t1-login`, `t2-ajustes`, `t3-dashboard` y `t4-landing`.
2. Desactivar `claude-mem` para evitar que un intento comparta instrucciones con otro.
3. Mantener las instrucciones fuera de las carpetas de trabajo.
4. Pegar el prompt completo como primer mensaje; no añadir contexto extra ni intervenir durante la tarea.
5. Si el agente pide una decisión, responder exactamente: «Decide tú y continúa».
6. Exportar el transcript completo y conservar el código entregado por cada intento.
7. Para esta ronda, Codex lanzó las sesiones con autorización expresa de Carlos. En rondas futuras, no lanzará ni guiará los intentos salvo que Carlos lo autorice.
8. No modificar carpetas de ronda. Los análisis y resultados se guardan en este repositorio.

## Tareas y prompts exactos

### T1 · Login (t1-login)

> Construye esta pantalla con la librería @monoschemes/ui, que ya está instalada. Usa sus componentes y tokens; no añadas otras librerías de UI ni estilos propios salvo para el layout. Debe funcionar en tema claro y oscuro. Cuando termines, di qué componentes has usado.
>
> Pantalla: login con email, contraseña con mostrar/ocultar, casilla «Recordarme», botón principal «Entrar», enlace «¿Olvidaste tu contraseña?» y un mensaje de error si las credenciales fallan.

Componentes esperados: `FormInput`, `FormPassword`, `FormCheckbox`, `Button` primary, `Link`, `InlineNotification`.

### T2 · Ajustes (t2-ajustes)

> Construye esta pantalla con la librería @monoschemes/ui, que ya está instalada. Usa sus componentes y tokens; no añadas otras librerías de UI ni estilos propios salvo para el layout. Debe funcionar en tema claro y oscuro. Cuando termines, di qué componentes has usado.
>
> Pantalla: ajustes con pestañas General y Notificaciones. En General: nombre, idioma (selector) y tema claro/oscuro/sistema. En Notificaciones: tres interruptores. Botones Guardar y Cancelar.

Componentes esperados: `Tabs`, `FormInput`, `FormSelect`, `SegmentedControl`, `FormToggle`, `Button`.

### T3 · Dashboard (t3-dashboard)

> Construye esta pantalla con la librería @monoschemes/ui, que ya está instalada. Usa sus componentes y tokens; no añadas otras librerías de UI ni estilos propios salvo para el layout. Debe funcionar en tema claro y oscuro. Cuando termines, di qué componentes has usado.
>
> Pantalla: dashboard con cabecera de app y navegación lateral; tres métricas; tabla de campañas con búsqueda, filtro de varios estados y paginación; y un estado vacío cuando el filtro no devuelve nada.

Componentes esperados: `AppHeader`, `SideNav`, `Stat`, `FormSearch`, `FormMultiSelect`, `Table`, `Pagination`, `EmptyState`.

### T4 · Landing (t4-landing)

> Construye esta pantalla con la librería @monoschemes/ui, que ya está instalada. Usa sus componentes y tokens; no añadas otras librerías de UI ni estilos propios salvo para el layout. Debe funcionar en tema claro y oscuro. Cuando termines, di qué componentes has usado.
>
> Pantalla: landing con un hero oscuro con titular grande y llamada a la acción, tres bloques de características, una sección de precios con dos opciones y un pie mínimo.

Componentes esperados: zona `data-theme="inverse"`, `Text` display-2/display-3, `Button`, `Card/Feature`, `Card`, `Footer` minimal.

## Métricas por intento

| Métrica | Registro |
|---|---|
| Completa | Sí/no según si la pantalla solicitada está implementada y puede compilarse. |
| Pasos | Acciones del agente extraídas del transcript; si el formato TUI no permite contarlas con fiabilidad, indicar N/D. |
| Tiempo | Duración final indicada por Claude Code; no sumar duraciones repetidas por redibujados del TUI. Si no se puede verificar, indicar N/D. |
| Errores de sistema | Cuenta errores detectados: props/componentes inventados (incluye `tsc`), tokens inventados o colores en bruto, componente equivocado, CSS del paquete omitido, incumplimiento de la geometría MonoSchemes y fallos de accesibilidad. Registrar evidencia y recuento, no solo una impresión. |
| Fidelidad | 0–12: componentes, tokens, principios visuales y claro/oscuro, cada dimensión de 0 a 3. Codex puntúa leyendo código y, si hay capturas, comparando el resultado visual. |
| Intervenciones | Mensajes del usuario posteriores al primero. El procedimiento previsto es cero; registrar el texto y contexto si ocurre. |

El script también registra imports de `@monoschemes/ui`, si se importa `style.css`, definiciones locales de tokens, valores de color en crudo, declaraciones `border-radius`/`box-shadow`, disponibilidad/resultado de `tsc --noEmit` y dependencias adicionales.

## Herramienta de análisis

Desde la raíz del repositorio:

```bash
node docs/agent-test/score.mjs /ruta/a/runs
```

El script no modifica las carpetas suministradas: para `tsc --noEmit` crea una copia temporal del proyecto y enlaza sus dependencias, manteniendo los archivos de build-info fuera de la ronda. El script no decide si una tarea está completa ni puntúa la fidelidad visual: ambas valoraciones requieren revisión humana del código y de las capturas disponibles.
