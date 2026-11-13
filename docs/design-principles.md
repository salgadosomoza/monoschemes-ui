# Principios de diseño

MonoSchemes es un sistema de diseño mantenible, accesible y coherente, no solo una colección de
componentes.

## Autoridad por dominio

- Figma decide la apariencia y los tokens visuales.
- React decide el comportamiento, la API y la accesibilidad.
- Storybook documenta y valida la implementación React.

Las discrepancias se describen y se resuelven explícitamente. No se elige automáticamente un
ganador fuera del dominio de autoridad de cada superficie.

## Recto

El layout no llama la atención; el contenido sí. La estructura se expresa con espaciado, divisiones
de 1 px, tipografía y tonos, nunca con esquinas redondeadas.

El token --radius-full solo se usa en:

- Avatar con shape="round" para personas.
- FormRadio y su anillo de foco.
- El pulgar de FormSlider; su anillo de foco conserva la forma circular del pulgar.

El resto de los componentes y anillos de foco usa --radius-none.

## Token first

Usa los tokens existentes antes de proponer otros. Evita valores hardcodeados para color, espacio,
radio o tipografía cuando exista un token equivalente. Los nuevos tokens se definen como Figma
Variables y luego se reflejan en el archivo de tokens de la UI.

## Composición y simplicidad

- Prefiere componentes pequeños que se compongan frente a componentes monolíticos.
- Sigue los patrones existentes cuando encajen.
- Añade flexibilidad o abstracciones cuando haya una necesidad concreta.
- Mantén las APIs consistentes sin impedir los requisitos reales de cada componente.

## Accesibilidad

La accesibilidad es un requisito del componente. Considera teclado, foco visible, semántica,
nombres accesibles, contraste y soporte para lectores de pantalla según corresponda.
