import React, { useState } from 'react';
import logo from './logo.svg';
// Voodoo lets us load CSS through this import because
// its exported in lib/main.ts. When consuming through
// a package repo - styles must be imported explicitly
// in most cases, example:
import { MineSweeper } from '../lib/main';

function AppHeader() {
  return (
    <header className="App-header space-x-4 items-center">
      <h2 className="font-extrabold">Strive</h2>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Interaction Lab</p>
    </header>
  );
}

function Carat() {
  return <svg className="overflow-visible ml-3 transition-all duration-150 ease-linear text-white/5 group-hover:text-white" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6" /></svg>;
}

interface ColorButtonProps { color: string, onClick: () => void, isActive: boolean }
function ColorButton({
  color, onClick = () => {}, isActive,
}:ColorButtonProps) {
  const clsx = () => `p-3 group ring-2 p-3 capitalize ring-2 ring-${color}-500 bg-${color}-500/10 flex items-center justify-between
    ${isActive ? `active bg-white/10 text-white ring-white text-${color}-500` : ''}
  `;
  return (
    <button type="button" className={clsx()} onClick={onClick}>
      {color}
      <Carat />
    </button>
  );
}
function App() {
  const [color, setColor] = useState<string>('bg-red-900');
  return (
    <div className={`${color} min-h-screen`}>
      <AppHeader />
      <main className="p-8 space-y-4 flex items-start justify-center">
        <div className="flex flex-col gap-4 w-36 justify-start p-4">
          {['green', 'blue', 'indigo', 'yellow', 'orange', 'red'].map((c) => (
            <ColorButton color={c} isActive={color === `bg-${c}-900`} onClick={() => setColor(`bg-${c}-900`)} />
          ))}
        </div>
        <MineSweeper />
      </main>
    </div>

  );
}

export default App;
