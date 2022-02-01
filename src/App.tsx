import React from 'react';
import logo from './logo.svg';
import { Text } from '../lib/main';
import './App.css';
import { ipsum2 } from '../lib/reference';

const { Caption } = Text;

function AppHeader() {
  return (
    <header className="App-header space-x-4 items-center">
      <Text className="font-extrabold">Strive</Text>
      <img src={logo} className="App-logo" alt="logo" />
      <Caption>Interaction Lab</Caption>
    </header>
  );
}
function Avatar() {
  return <img className="rounded-full" src="//placehold.it/200x200" alt="placeholder" />;
}

function FunInput({ label = 'My Label', className = '' }: { className: string, label: string }) {
  const [val, setVal] = React.useState('');
  const isWarning = val.length > 0 && val.length < 5;
  const classname = [
    'w-full peer p-4 shadow-inner',
    'rounded bg-white dark:bg-gray-100/5 placeholder-transparent',
    'outline-none',
    'font-semibold transition-all',
    'selection:bg-black/20',
    'selection:p-2',
    'overflow-ellipsis',
    'focus:shadow-lg focus:shadow-black/25',
    isWarning ? 'ring-red-500' : 'ring-transparent',
    'ring focus:ring-gray-300 focus:ring-opacity-50',
    val !== '' && val.length < 3 && 'invalid',
  ].join(' ');

  const peerPlaceholderShown = [
    'bg-transparent top-4',
    'font-normal text-base',
    'text-black/90 ',
  ].join(' ').split(' ').map((c) => `peer-placeholder-shown:${c}`).join(' ');
  const peerFocus = [
    'bg-transparent -top-5',
    'text-xs text-white',
    'font-semibold',
  ].join(' ').split(' ').map((c) => `peer-focus-within:${c}`).join(' ');
  const labelClass = [
    peerPlaceholderShown,
    peerFocus,
    'dark:peer-placeholder-shown:text-white/90',
    'absolute left-4 top-0.5 text-xs transition-all font-semibold rounded text-black',
    'pointer-events-none',
    isWarning ? 'text-red-500' : 'dark:text-white/20',
  ].join(' ');
  return (
    <div className={`relative w-full ${className}`}>
      <input
        defaultValue={val}
        onChange={(e) => setVal(e.target.value)}
        className={classname}
        type="text"
        placeholder="Enter your name"
      />
      {/* eslint-disable-next-line */}
      <label className={labelClass}>{label}</label>
    </div>
  );
}

function TypographySample() {
  const snippet = ipsum2.slice(100);
  return (
    <div className="space-y-2">
      <p className="text-base tracking-tighter font-semibold">base text block </p>
      <p className="text-black/80 dark:text-white/80">{ipsum2}</p>
      <div className="text-base tracking-tighter font-semibold flex gap-2 flex-grow">
        <div className="flex-1">base text block</div>
        <div className="rounded bg-pink-100/25 text-xs uppercase font-bold leading-tighter text-white p-1 px-2">This tag</div>
        <div className="rounded bg-pink-100/25 text-xs uppercase font-bold leading-tighter text-white p-1 px-2">This tag</div>
      </div>
      <div className="space-y-4">
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
        <textarea rows={5} defaultValue="My Value" className="peer w-full h-32" />
        <label>Summary</label>
        <div className="flex gap-2">
          <input type="text" defaultValue="My Value" className="flex-grow" />
          <button type="button" className="w-2 ring ring-black/10">My button</button>
        </div>

        <p className="text-sm leading-tight text-black/75 dark:text-white/75 dark:mix-blend-color-dodge">{snippet}</p>
        <div className="py-4 flex items-center gap-2 w-full">
          <FunInput className="flex-1" label="First Name" />
          <FunInput className="flex-1" label="Last Name" />
        </div>
      </div>
      <div className="py-4">
        <div className="flex gap-2">
          <button type="button" className="my-2 button-default">My button</button>
          <button type="button" className="my-2 button-main">My button</button>
        </div>
        <p className="text-xs text-black/50 dark:text-white/50 dark:mix-blend-color-dodge leading-tight mt-2">
          {snippet}
        </p>
      </div>

    </div>
  );
}
function App() {
  return (
    <>
      <AppHeader />
      <main className="dark:bg-purple-900 bg-gray-100 p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 border-b-2 pb-4 border-black/10">
            <div className="flex-1">
              <p className="text-input-label">This is some text</p>
              <p className="text-heading-01">This is some text</p>
            </div>
            <div className="w-12">
              <Avatar />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <TypographySample />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
