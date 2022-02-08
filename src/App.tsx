import React from 'react';
// import { MineSweeper } from '../lib/MineSweeper/MineSweeper';

import { ipsum2 } from '../lib/reference';
import logo from './logo.svg';
// Voodoo lets us load CSS through this import because
// its exported in lib/main.ts. When consuming through
// a package repo - styles must be imported explicitly
// in most cases, example:
import { MineSweeper, useMineSweeper } from '../lib/main';

export const Snippets = {
  Avatar: () => (
    <img className="rounded-full" src="//placehold.it/200x200" alt="placeholder" />
  ),
  PageHeader: () => (
    <div className="flex items-center justify-center gap-4 border-b-2 pb-4 border-black/10">
      <div className="flex-1">
        <p className="text-input-label">This is some text</p>
        <p className="text-heading-01">This is some text</p>
      </div>
      <div className="w-12">
        <Snippets.Avatar />
      </div>
    </div>
  ),
  ConfirmationPattern: () => {
    const snippet = ipsum2.slice(100);
    return (
      <div className="py-4">
        <div className="flex gap-2">
          <button type="button" className="my-2 button-default">My button</button>
          <button type="button" className="my-2 button-main">My button</button>
        </div>
        <p className="text-xs text-black/50 dark:text-white/50 dark:mix-blend-color-dodge leading-tight mt-2">
          {snippet}
        </p>
      </div>
    );
  },
  TypeSample: () => (
    <>
      <h1>Heading 1 and all that jazz</h1>
      <h2>Heading 2 and all that jazz</h2>
      <p>{ipsum2}</p>
      <h3>Heading 3 and all that jazz</h3>
      <p>{ipsum2}</p>
      <h4>Heading 4 and all that jazz</h4>
      <p>{ipsum2}</p>
      <h5>Heading 5 and all that jazz</h5>
      <p>{ipsum2}</p>
      <h6>Heading 6 and all that jazz</h6>
    </>
  ),
  SectionHeadingPattern: () => (
    <div className="text-base tracking-tighter font-semibold flex gap-2 flex-grow">
      <div className="flex-1">base text block</div>
      <div className="rounded bg-pink-100/25 text-xs uppercase font-bold leading-tighter text-white p-1 px-2">This tag</div>
      <div className="rounded bg-pink-100/25 text-xs uppercase font-bold leading-tighter text-white p-1 px-2">This tag</div>
    </div>
  ),
  InputsPattern: () => {
    const snippet = ipsum2.slice(100);
    return (
      <>
        <textarea rows={5} defaultValue="My Value" className="peer w-full h-32" />
        <div className="flex gap-2">
          <input type="text" defaultValue="My Value" className="flex-grow" />
          <button type="button" className="w-2 ring ring-black/10">My button</button>
        </div>
        <p className="text-sm leading-tight text-black/75 dark:text-white/75 dark:mix-blend-color-dodge">{snippet}</p>
      </>
    );
  },
};
function TextContentSamples() {
  return (
    <div className="flex items-center gap-4 space-y-2">
      <div className="space-y-2">
        <p className="text-base tracking-tighter font-semibold">base text block </p>
        <p className="text-black/80 dark:text-white/80">{ipsum2}</p>
        <Snippets.SectionHeadingPattern />
        <div className="space-y-4">
          <Snippets.TypeSample />
          <Snippets.InputsPattern />
        </div>
        <Snippets.ConfirmationPattern />
      </div>
    </div>
  );
}

function AppHeader() {
  return (
    <header className="App-header space-x-4 items-center">
      <h2 className="font-extrabold">Strive</h2>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Interaction Lab</p>
    </header>
  );
}
function App() {
  const { board } = useMineSweeper();
  return (
    <>
      <AppHeader />
      {JSON.stringify(board)}
      <main className="dark:bg-purple-900 bg-gray-100 p-8">
        <div className="space-y-4">
          <Snippets.PageHeader />
          <MineSweeper />
          <TextContentSamples />
        </div>
      </main>
    </>
  );
}

export default App;
