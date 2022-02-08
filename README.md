# Minesweeper React

## Using in a project

`yarn install @cassler/use-minesweeper`

Import the full component to use directly.

```jsx
import { MineSweeper } from '@cassler/use-minesweeper';
import '/node_modules/@cassler/use-minesweeper/dist/style.css';
```

Or just the hook to compose your own version:

```jsx
import { useMineSweeper } from '@cassler/use-minesweeper'
```

| Argument | Type | Default | Required | Description |
| -------- | ----- | ----- | ------- | --------- |
| `size`      | `number` | 12 | false | Dimensions of gameboard along each axis in absolute units. |
| `difficulty` | `number` | 0.25 | false | Liklihood of a bomb being on any given square. Value between 0 and 1 |

## Development

`yarn & yarn dev` To install dependencies and launch a dev server on Vite.

`yarn build` Will transpile ES and UMD flavors of modules - both are available for consumption. Notably, [UMD modules](https://github.com/umdjs/umd) which are capable of working everywhere, be it in the client, on the server or elsewhere. This includes compatability with `require` and `import` syntaxes with special-casing to handle CommonJS compatability.
