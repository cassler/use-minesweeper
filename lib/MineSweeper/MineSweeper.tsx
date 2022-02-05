import {
  useRef, useContext, useMemo, useState, createContext, useEffect, CSSProperties, useLayoutEffect,
} from 'react';
import { Button } from '../Button';

interface BoardConfigProps {
  size: number;
  difficulty: number;
}
export function newBoard({ size, difficulty }:BoardConfigProps) {
  const axis = Array.from({ length: size }, (_, i) => i);
  return axis.map((x) => axis.map((y) => ({
    xAxis: x,
    yAxis: y,
    bomb: Math.random() < difficulty,
  }))).flat();
}

/**
 * @param idx numerical index of point on board
 * @param axis size of board axis in absolute terms
 * @returns direct neighbors of point on board as numerical indeces.
 */
export function getNeighbors(idx: number, axis: number):number[] {
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

export function computeBoardValues({ size, difficulty }:Props):BoardPosition[] {
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

type BoardPosition = {
  xAxis: number;
  yAxis: number;
  bomb: boolean;
  count: number,
  neighborIndeces: number[],
};

const getGridStyle = (size: number):CSSProperties => ({
  display: 'grid',
  gap: '8px',
  gridTemplateColumns: `repeat(${size}, min-content)`,
  gridTemplateRows: `repeat(${size}, min-content)`,
});

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

export function MineSweeper() {
  const [size, setSize] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<number>(0.1);
  const [board, setBoard] = useState<BoardPosition[]>([]);
  const [flippedItems, setFlippedItems] = useState<number[]>([]);

  function handleNewGame() {
    setFlippedItems([]);
    setBoard(computeBoardValues({ size, difficulty }));
  }

  function selectItem(idx:number) {
    if (flippedItems.includes(idx)) return;
    const current = board[idx];
    if (current.bomb) {
      handleNewGame();
      window.alert('YOU LOSE');
      return;
    }
    setFlippedItems([...flippedItems, idx]);
  }

  useEffect(() => handleNewGame(), [size, difficulty]);

  useEffect(() => {
    // get visible 0s
    const visibleZeros = board.filter((i, idx) => i.count === 0 && flippedItems.includes(idx));
    // put their neighbors into a flat array
    const neighbors = visibleZeros.map((i) => i.neighborIndeces).flat();
    // filter neighbors that are already flipped
    const next = neighbors.filter((i) => !flippedItems.includes(i));
    // if all visible zeros neighbors are flipped, we're done.
    if (next.length === 0) return;
    // wait 100ms before flipping the next series of neighbors.
    setTimeout(() => {
      setFlippedItems([...flippedItems, ...next.flat()]);
    }, 100);
  }, [flippedItems]);

  const ctx = useMemo(
    () => ({ board, flippedItems, selectItem }),
    [board, flippedItems, selectItem, size],
  );
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

function Item({ idx, count, bomb }: BoardPosition & { idx: number }) {
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
    // 'shadow-inner',
    isOpen && bomb && 'border-red-500/75 bg-red-500',
  ].join(' ');
  return (
    <button className={classes} type="button" onClick={() => selectItem(idx)}>
      <span>{isOpen && content}</span>
    </button>
  );
}

/**
 *
 * @param board an array of unknown values that are presumed to
 * @param idx absolute index of a spot on the board
 * @returns an array of only the neighboring indexes from board.
 */
export function checkNeighbors<T = unknown>(board: T[], idx: number):T[] {
  const axis = Math.sqrt(board.length);
  if (!Number.isInteger(axis)) {
    throw new Error('Board must be a square');
  }
  const neighbors = getNeighbors(idx, axis);
  return neighbors.map((_, i) => board[i]);
}
