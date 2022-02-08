import {
  useRef, useContext, useMemo, useState, createContext, useEffect, CSSProperties, useLayoutEffect,
} from 'react';

interface BoardPosition {
  xAxis: number;
  yAxis: number;
  bomb: boolean;
  count: number,
  neighborIndeces: number[],
}

export type BoardContextType = {
  board: BoardPosition[];
  flippedItems: number[];
  selectItem: Function
};

const BoardContext = createContext<BoardContextType>({
  board: [],
  flippedItems: [],
  selectItem: () => {},
});

export interface UseMinesweeperProps {
  initialSize?: number;
  initialDifficulty?: number;
}

export function useMineSweeper(initialSize: number = 10, initialDifficulty: number = 0.25) {
  const [size, setSize] = useState<number>(initialSize);
  const [difficulty, setDifficulty] = useState<number>(initialDifficulty);
  const [board, setBoard] = useState<BoardPosition[]>([]);
  const [flippedItems, setFlippedItems] = useState<number[]>([]);
  /**
 * @param idx numerical index of point on board
 * @param axis size of board axis in absolute terms
 * @returns direct neighbors of point on board as numerical indeces.
 */
  function getNeighbors(idx: number, axis: number):number[] {
  // adding or subtracting these values to any index will get the
  // neighboring indices given a square grid.
    const pole = [idx - axis, idx, idx + axis];
    // check if were on the first column and skip if so.
    const left = idx % axis === 0 ? [] : pole.map((x) => x - 1);
    // check if were on the last column and skip if so.
    const right = (idx + 1) % axis === 0 ? [] : pole.map((x) => x + 1);

    // Spread each section into an array
    return [left, right, pole].flat()
    // Then filter to bound values that are within the board
      .filter((i) => i >= 0 && i < axis * axis && i !== idx)
    // Sort them lowest to highest for ease of use.
      .sort((a, b) => a - b);
  }

  function computeBoardValues():BoardPosition[] {
    const axis = Array.from({ length: size }, (_, i) => i);
    const initialBoard = axis.map((x) => axis.map((y) => ({
      xAxis: x,
      yAxis: y,
      bomb: Math.random() < difficulty,
    }))).flat();
    return initialBoard.map((item, idx) => {
      const neighborIndeces = getNeighbors(idx, size);
      const count = neighborIndeces.filter((i) => initialBoard[i].bomb).length;
      return { ...item, count, neighborIndeces };
    });
  }
  function handleNewGame() {
    setFlippedItems([]);
    setBoard(computeBoardValues());
  }

  function selectItem(idx:number) {
    if (flippedItems.includes(idx)) return;
    const current = board[idx];
    if (current.bomb) {
      handleNewGame();
      if (window && typeof window !== 'undefined') {
        window.alert('YOU LOSE');
      }
      return;
    }
    setFlippedItems([...flippedItems, idx]);
  }

  function getGridStyle(s: number):CSSProperties {
    return {
      display: 'grid',
      gap: '8px',
      gridTemplateColumns: `repeat(${s}, min-content)`,
      gridTemplateRows: `repeat(${s}, min-content)`,
    };
  }

  useEffect(() => handleNewGame(), [size, difficulty]);
  useEffect(() => {
    const next = board
      // get visible 0s
      .filter((i, idx) => i.count === 0 && flippedItems.includes(idx))
      // put their neighbors into a flat array
      // filter neighbors that are already flipped
      .map((i) => i.neighborIndeces).flat()
      .filter((i) => !flippedItems.includes(i));
    // if all visible zeros neighbors are flipped, we're done.
    if (next.length === 0) return;
    // wait 100ms before flipping the next series of neighbors.
    setTimeout(() => {
      setFlippedItems([...flippedItems, ...next.flat()]);
    }, 75);
  }, [flippedItems]);

  const ctx = useMemo(
    () => ({ board, flippedItems, selectItem }),
    [board, flippedItems, selectItem, size],
  );

  return {
    ctx, flippedItems, board, size, getGridStyle, selectItem, handleNewGame, setSize, setDifficulty,
  };
}

export function Item({ idx, count, bomb }: BoardPosition & { idx: number }) {
  const { flippedItems, selectItem } = useContext(BoardContext);
  const isOpen = flippedItems.includes(idx);
  const content = bomb ? 'X' : count;
  const classes = [
    'border border-gray-500/50 rounded-lg',
    'font-black text-lg',
    'w-10 h-10 flex justify-center items-center',
    'hover:border-white/75 border-2 hover:scale-110',
    'transition-all duration-200 ease-in-out',
    'hover:shadow',
    isOpen ? 'text-white bg-white/10' : 'text-white/10',
    isOpen && bomb && 'border-red-500/75 bg-red-500',
  ].join(' ');

  function handleClick(e:React.MouseEvent) {
    if (e.type === 'contextmenu') {
      e.preventDefault();
    } else {
      selectItem(idx);
    }
  }
  return (
    <button className={classes} type="button" onClick={handleClick}>
      <span>{isOpen && content}</span>
    </button>
  );
}

export function MineSweeper() {
  const {
    ctx, handleNewGame, flippedItems, size, board, getGridStyle, setSize,
  } = useMineSweeper(12);
  return (
    <BoardContext.Provider value={ctx}>
      <div className="flex items-center justify-center bg-black/25 p-8 pb-16 rounded-2xl">
        <div>
          <div className="flex item-center justify-center mb-4 gap-4">
            <div className="p-2 flex-grow leading-tight bg-black/10 rounded-lg text-purple-100 font-bold">
              {`${flippedItems.length} / ${size * size}`}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-white/50">Size</span>
              <button type="button" className="flex-shrink bg-white/10 p-2 px-4" onClick={() => setSize(size - 1)}>-</button>
              <button type="button" className="flex-shrink bg-white/10 p-2 px-4" onClick={() => setSize(size + 1)}>+</button>
              <button onClick={handleNewGame} type="button" className="flex-shrink bg-white/10 p-2 px-4">
                New Game
              </button>
            </div>
          </div>
          <div style={getGridStyle(size)}>
            {board.map((pos, idx) => <Item idx={idx} key={idx.toString()} {...pos} />)}
          </div>
        </div>
      </div>
    </BoardContext.Provider>
  );
}
