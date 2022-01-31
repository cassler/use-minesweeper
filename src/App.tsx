import React from 'react';
import logo from './logo.svg';
import { Text } from '../lib/main';
import './App.css';
import { ipsum2 } from '../lib/reference';

const { Caption } = Text;

const TextLabel = [
  'font-semibold tracking-tight text-sm',
  'text-black/50 dark:text-gray-300/50  mix-blend-multiply dark:mix-blend-color-dodge',
].join(' ');

const TextHeading01 = [
  'text-black/90 dark:text-white/90',
  'text-xl md:text-3xl',
  'tracking-tighter font-extrabold',
  'mix-blend-darken dark:mix-blend-lighten',
].join(' ');
const clsx = [
  'space-y-4',
  // 'w-auto',
].join(' ');

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
      <p className="text-sm leading-tight text-black/75 dark:text-white/75 dark:mix-blend-color-dodge">{snippet}</p>
      <div className="py-4 flex items-center gap-2 w-full">
        <FunInput className="flex-1" label="First Name" />
        <FunInput className="flex-1" label="Last Name" />
      </div>
      <div className="py-4">
        <div className="flex gap-2">
          <button type="button" className="my-2 flex-auto text-sm rounded-lg font-semibold tracking-tight p-4 bg-gray-500/10 hover:bg-gray-500/20">My button</button>
          <button type="button" className="my-2 flex-auto text-sm rounded-lg font-semibold tracking-tight p-4 bg-blue-500 hover:bg-blue-600 hover:dark:bg-white text-white dark:bg-white/90 dark:text-black/90">My button</button>
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
      <main className="dark:bg-purple-700/50 bg-gray-100 p-8">
        <div className={clsx}>
          <div className="flex items-center justify-center gap-4 border-b-2 pb-4 border-black/10">
            <div className="flex-1">
              <p className={TextLabel}>This is some text</p>
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
