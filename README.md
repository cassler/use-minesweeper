# Minesweeper React

## Using in a project

`yarn install @cassler/use-minesweeper`

### MineSweeper React component

Import the full component to use directly.

```jsx
import { MineSweeper } from '@cassler/use-minesweeper';
import '/node_modules/@cassler/use-minesweeper/dist/style.css';
```

| Argument | Type | Default | Required | Description |
| -------- | ----- | ----- | ------- | --------- |
| `size`      | `number` | 12 | false | Dimensions of gameboard along each axis in absolute units. |
| `difficulty` | `number` | 0.25 | false | Liklihood of a bomb being on any given square. Value between 0 and 1 |

### useMinesweeper Hook

Or just the hook to compose your own version:

```jsx
import { useMineSweeper, BoardContext } from '@cassler/use-minesweeper'
```

This provides most of what you need as an object. Below is an example implementation.

```tsx
export interface Props { size: number, difficulty: number }
export function MyApp({ size = 12, difficulty = 0.25 }:Props) {
  const {
    ctx, getGridStyle, isItemOpen, selectItem,
  } = useMineSweeper(size, difficulty);
  function getLabel(item:BoardPosition) { return item.bomb ? 'X' : item.count; }
  return (
    <BoardContext.Provider value={ctx}>
      <div style={getGridStyle(size)}>
        {ctx.board.map((item, idx) => (
          <button type="button" onClick={() => selectItem(idx)}>
            {isItemOpen(idx) && getLabel(item)}
          </button>
        ))}
      </div>
    </BoardContext.Provider>
  );
}
```

| key | type | description                 |
| ---- | ---- | -------------------------- |
| ctx.board | object[] | All items on the board in an array, see types for details |
| ctx.flippedItems | number[] | All currently flipped items by absolute index. |
| ctx.selectItem | (idx:number) => void | Update state to flip selected index |
| getGridStyle | (size:number) => CSSProperties | Provide CSS grid styles to apply to board container. |
| handleNewGame | () => void | Resets the game state and generates a new board. |
| setSize | (size:number) => void | Build a new board from the given axis length |
| setDifficulty | (diff:number) => void | Provide a value between 0 and 1 to build a new board with the given difficulty factor. |


## Development

`yarn & yarn dev` To install dependencies and launch a dev server on Vite.

`yarn build` Will transpile ES and UMD flavors of modules - both are available for consumption. Notably, [UMD modules](https://github.com/umdjs/umd) which are capable of working everywhere, be it in the client, on the server or elsewhere. This includes compatability with `require` and `import` syntaxes with special-casing to handle CommonJS compatability.
