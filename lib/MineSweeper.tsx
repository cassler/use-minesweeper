import {
  useContext, useMemo, useState, createContext, useEffect, CSSProperties,
} from 'react';
import { Dialog } from '@headlessui/react';

export type BoardPosition = {
  xAxis: number;
  yAxis: number;
  bomb: boolean;
  count: number,
  neighborIndeces: number[],
};

export type BoardContextType = {
  board: BoardPosition[];
  flippedItems: number[];
  selectItem: Function
};

export const BoardContext = createContext<BoardContextType>({
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
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
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
    setStatus('playing');
  }

  function selectItem(idx:number) {
    if (flippedItems.includes(idx)) return;
    const current = board[idx];
    if (current.bomb) {
      setStatus('lost');
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

  function isItemOpen(idx:number) {
    return ctx.flippedItems.includes(idx);
  }

  return {
    ctx,
    isItemOpen,
    status,
    setStatus,
    flippedItems,
    board,
    size,
    getGridStyle,
    selectItem,
    handleNewGame,
    setSize,
    setDifficulty,
  };
}

export function MineSweeper() {
  const ctx = useMineSweeper(12);
  const {
    flippedItems, size, setSize, handleNewGame, board, getGridStyle, setStatus, score,
  } = ctx;
  const [isOpen, toggleOpen] = useState(false);
  function handleClose() {
    handleNewGame();
    toggleOpen(false);
  }
  return (
    <BoardContext.Provider value={ctx}>
      <div className="flex items-center justify-center flex-col bg-black/25 p-4 p-4 rounded-2xl">
        <div title="toolbar" className="flex items-center justify-around min-w-full p-2 gap-2">
          <div title="current-score" className="p-2 flex-1 leading-tight bg-black/10 rounded-lg text-purple-100 font-bold">
            {`${flippedItems.length} / ${size * size}`}
          </div>
          <div className="flex-0 flex gap-2 items-center">
            <span title="adjust-size" className="text-sm text-white/50">Size</span>
            <button title="decrement" type="button" className="bg-white/10 p-2 px-4" onClick={() => setSize(size - 1)}>-</button>
            <button title="increment" type="button" className="bg-white/10 p-2 px-4" onClick={() => setSize(size + 1)}>+</button>
            <button title="increment" type="button" className="bg-white/10 p-2 px-4" onClick={() => toggleOpen(!isOpen)}>T</button>
            <button title="newgame" onClick={handleNewGame} type="button" className="flex-shrink bg-white/10 p-2 px-4">
              New Game
            </button>
          </div>
        </div>
        <div style={getGridStyle(size)}>
          {board.map((pos, idx) => <Item idx={idx} key={idx.toString()} {...pos} />)}
        </div>

      </div>
      <Dialog
        open={ctx.status === 'lost' || isOpen}
        onClose={() => ctx.handleNewGame()}
        className="animate-fadeIn fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-red-500/75"
      >
        <div className="ring-4 ring-red-500 animate-fadeIn transition-all duration-200 bg-white/90 text-center hover:scale-110 rotate-2 rounded-lg drop-shadow-lg text-black w-[320px] p-8 space-y-2">
          <Dialog.Overlay />
          <Dialog.Title className="text-black space-y-2 justify-center">
            <div className="text-xl font-semibold pb-2">Your score</div>
            <div className="text-black text-[64px]">{flippedItems.length}</div>
          </Dialog.Title>
          <p className="text-sm leading-2 pt-8 px-2 text-center">
            You only had
            {' '}
            {board.length - flippedItems.length}
            {' '}
            left to go! There were
            {' '}
            {board.filter((i) => i.bomb).length}
            {' '}
            bombs, and you found one.
            {' '}
            <span className="font-bold">You Lose.</span>
          </p>
          <div title="actions-menu" className="pt-8 flex items-center">
            <button
              type="button"
              className="
              py-2 transition-all hover:scale-110 hover:-translate-y-2
              duration-300 ease-in-out hover:rotate-2
              px-4 ring ring-purple-700"
              onClick={() => handleClose()}
            >
              Good Game

            </button>
            <button
              type="button"
              className="py-2 transition-all hover:scale-110
              hover:-translate-y-2 duration-300
              ease-in-out hover:-rotate-2

              bg-purple-500  ring-purple-700 text-white px-4 ring ml-4"
              onClick={() => handleClose()}
            >
              Play Again
            </button>
          </div>
          <Dialog.Description className="text-center text-xs text-black/50 pt-8">
            Thanks for playing.
          </Dialog.Description>
        </div>
      </Dialog>
    </BoardContext.Provider>
  );
}

export type ItemProps = Partial<BoardPosition> & { idx: number };
export function Item({
  idx, count, bomb, xAxis, yAxis,
}: ItemProps) {
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
    <button title={`x${xAxis}y${yAxis}`} className={classes} type="button" onClick={handleClick}>
      <span>{isOpen && content}</span>
    </button>
  );
}
