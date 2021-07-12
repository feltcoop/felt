[<img src="src/static/felt.png" align="right" width="192" height="178">](https://www.felt.dev)

# felt

> web tech that feels good 💚
> [felt.dev](https://www.felt.dev)

> **work in progress**: pre-pre-alpha

## usage

```bash
npm i @feltcoop/felt
```

The top-level API ([see src/lib/index.ts](src/lib/index.ts)) is a work in progress:

```ts
import type {Result} from '@feltcoop/felt';

// for now, you'll typically use deep imports to specific modules:
import {random_int} from '@feltcoop/felt/util/random.js';
```

## develop

```bash
npm i # node >= 14.16

# development
npm run dev

# production
npm run build
npm start
```

## credits 🐢<sub>🐢</sub><sub><sub>🐢</sub></sub>

[TypeScript](https://github.com/microsoft/TypeScript) ∙
[Svelte](https://github.com/sveltejs/svelte) ∙
[SvelteKit](https://github.com/sveltejs/kit) ∙
[Vite](https://github.com/vitejs/vite) ∙
[Gro](https://github.com/feltcoop/gro) ∙
[esbuild](https://github.com/evanw/esbuild) ∙
[Rollup](https://github.com/rollup/rollup) ∙
[Prettier](https://github.com/prettier/prettier) ∙
[@lukeed\/\*](https://github.com/lukeed)
& [more](package.json)

## license 🐦

[MIT](LICENSE)
