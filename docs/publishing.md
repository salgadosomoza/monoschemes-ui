# Guía de primera publicación en npm

Esta guía prepara la publicación pública de `@monoschemes/ui@0.1.0`, después de completar y revisar el paquete para agentes. La versión debe estar committeada y subida al repositorio antes de publicar. No publiques desde una sesión de trabajo no revisada.

## 1. Preparar la cuenta y la organización

1. Crea o verifica una cuenta en [npmjs.com](https://www.npmjs.com/signup) y confirma el correo asociado.
2. Activa la autenticación de dos factores (2FA) para autorización y escrituras. npm requiere 2FA o un token granular con bypass 2FA para publicar; se recomienda publicación interactiva con 2FA.
3. En npmjs.com, crea la organización `monoschemes` con el plan gratuito de paquetes públicos, o comprueba que ya tienes acceso a ella.
4. No generes ni guardes tokens de npm en el repositorio. Para la primera publicación, usa el flujo interactivo.

## 2. Iniciar sesión y comprobar el acceso

Desde Terminal:

```sh
npm login --auth-type=web
npm whoami
```

Completa el inicio de sesión en el navegador y el desafío 2FA. Confirma que `npm whoami` muestra la cuenta esperada y que esa cuenta pertenece a `monoschemes`.

## 3. Preparar la versión

Antes de publicar `0.1.0`, confirma que el paso 2 está completo y revisado: documentación de agentes y `llms.txt` incluidos en el paquete, contrato de componentes enriquecido y skill de consumo preparada. Después:

```sh
npm run lint
npm run test:run
npm run typecheck
npm run build
npm run check:dist
npm pack --dry-run
```

Revisa que el paquete contiene `dist/`, `README.md`, `LICENSE`, `docs/agent-package/AGENTS.md`, `docs/agent-package/recipes.md`, `skills/monoschemes-ui/SKILL.md`, `src/tokens/components.json`, `src/tokens/tokens.json` y `llms.txt`, además de `package.json`; comprueba que no arrastra pruebas, stories, secretos ni archivos de trabajo. Confirma que `package.json` declara `name: "@monoschemes/ui"`, `version: "0.1.0"`, `private: false` y `publishConfig.access: "public"`.

La versión se prepara en un cambio revisado por Carlos. No publiques hasta tener el commit y el push de esa versión.

## 4. Publicar la primera versión pública

Desde la raíz del repositorio, después de confirmar que la versión y el paquete están listos:

```sh
npm publish --access public
```

Responde al desafío 2FA interactivo. El flag `--access public` es necesario para que el primer publish de un paquete con scope organizativo sea público.

## 5. Comprobar la publicación

```sh
npm view @monoschemes/ui version
npm view @monoschemes/ui dist.tarball
npm install @monoschemes/ui@0.1.0
```

Comprueba que la versión publicada es `0.1.0`, instala el paquete en un proyecto limpio y verifica los imports de componentes y `@monoschemes/ui/style.css`. Revisa también la ficha pública en `https://www.npmjs.com/package/@monoschemes/ui`.

## Referencias oficiales

- [Crear una organización npm](https://docs.npmjs.com/creating-an-organization/)
- [Crear y publicar un paquete público con scope](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/)
- [Inicio de sesión de npm](https://docs.npmjs.com/cli/login/)
- [Autenticación de dos factores y publicación](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/)
- [Revisar el contenido del paquete con `npm pack --dry-run`](https://docs.npmjs.com/cli/pack/)
