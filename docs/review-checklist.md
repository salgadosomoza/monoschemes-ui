# Checklist de revisión

Usa los puntos pertinentes al cambio. No marques como validada una superficie que no se haya revisado.

## Arquitectura

- ¿Se reutilizaron componentes y patrones existentes?
- ¿La composición es simple y evita duplicación?
- ¿El API nuevo está justificado y tipado?

## Tokens y Figma

- ¿Los tokens existentes se reutilizaron?
- Si se añadió o modificó un token, ¿se actualizó Figma Variables y su representación en la UI?
- ¿Los nombres y valores coinciden literalmente entre Figma, contrato y React?
- ¿Los bindings y modos de variables son correctos?

## Accesibilidad y comportamiento

- ¿Se puede usar con teclado y se ve el foco?
- ¿Los controles tienen nombres y roles adecuados?
- ¿Los estados disabled, error y otros estados relevantes se comportan correctamente?
- ¿El contraste es suficiente en los estados relevantes?

## Storybook y pruebas

- ¿Las historias cubren el uso, estados y casos límite relevantes?
- ¿Cada historia enlaza al nodo de Figma pertinente?
- ¿Pasan lint, pruebas, build y build de Storybook cuando aplican?

## Documentación

- ¿Se actualizaron las guías afectadas?
- ¿Quedaron claras las limitaciones y decisiones relevantes?
