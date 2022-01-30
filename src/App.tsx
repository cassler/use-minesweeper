import React from 'react';
import logo from './logo.svg';
import {
  Button, Text, useDesignToken,
} from '../lib/main';
import './App.css';
import { ipsum2 } from '../lib/reference';

const { SubCaption, Caption, SubHeading } = Text;

const ctn = [
  'dark:bg-green-700/50 bg-gray-100 mx-auto p-4',
].join(' ');
const PaperToken01 = [
  'bg-white/25 dark:bg-black/10',
  'shadow-inner dark:shadow-black/10',
  'border border-slate-500/10 dark:border-white/10',
].join(' ');

const TextLabel = [
  'font-semibold tracking-tight text-sm',
  'text-black/50 dark:text-gray-300/50  mix-blend-multiply dark:mix-blend-color-dodge',
].join(' ');

const TextHeading01 = [
  'text-black/90 dark:text-white/90',
  'text-md md:text-3xl',
  'tracking-tighter font-extrabol',
  'mix-blend-darken dark:mix-blend-lighten',
].join(' ');
const clsx = [
  'width-auto m-1 p-6 px-8',
  'space-y-4',
  'rounded-xl',
  PaperToken01,
].join(' ');

function AppHeader() {
  const t = useDesignToken({ level: 3, inverted: false });
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <SubHeading>{t}</SubHeading>
      <Text>This too</Text>
      <Caption>This too</Caption>
      <SubCaption>This too</SubCaption>
    </header>
  );
}
function Avatar() {
  return <img className="rounded-full" src="//placehold.it/200x200" alt="placeholder" />;
}

function FunInput({ label = 'My Label', className = '' }: { className: string, label: string }) {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className={`relative ${className}`}>
      <input
        ref={ref}
        id="x"
        className="
        w-full peer p-4 shadow-inner
        rounded bg-black/5 placeholder-transparent
        focus:outline-none
        focus:ring-1 focus:ring-orange-500 focus:ring-opacity-50"
        type="text"
        placeholder="Enter your name"
      />
      <label
        htmlFor={ref}
        className="
          absolute
          left-4
          -top-3
          text-xs
          transition-all
          font-semibold
          text-black
          p-0.5
          rounded
          bg-white
          dark:text-white
          dark:bg-black

          peer-placeholder-shown:bg-transparent
          peer-placeholder-shown:top-3
          peer-placeholder-shown:font-normal
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-black/40
          dark:peer-placeholder-shown:text-white/40
          peer-focus-within:bg-transparent
          peer-focus-within:-top-3
          peer-focus-within:text-xs
          peer-focus-within:font-semibold"
      >
        {label}
      </label>

    </div>
  );
}

function TypographySample() {
  const snippet = ipsum2.slice(100);
  return (
    <div className="space-y-2">
      <p className="text-base tracking-tighter font-semibold">base text block </p>
      <p className="text-black/80 dark:text-white/80">{ipsum2}</p>
      <p className="text-base tracking-tighter font-semibold">base text block </p>
      <p className="text-sm leading-tight text-black/75 dark:text-white/75 dark:mix-blend-color-dodge">{snippet}</p>
      <div className="py-4 flex items-center space-x-2">
        <FunInput className="flex-1" label="First Name" />
        <FunInput className="flex-1" label="Last Name" />
      </div>
      <div className="py-4">
        <div className="flex gap-2">
          <button type="button" className="my-2 flex-auto text-sm rounded-lg font-semibold tracking-tight p-4 bg-gray-500/10">My button</button>
          <button type="button" className="my-2 flex-auto text-sm rounded-lg font-semibold tracking-tight p-4 bg-blue-500 text-white dark:bg-white/90 dark:text-black/90">My button</button>
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
    <div className="App">
      <AppHeader />
      <main className={`${ctn}`}>
        <div className={clsx}>
          <div className="flex items-center justify-center gap-4 border-b-2 pb-4 border-black/10">
            <div className="flex-1">
              <p className={TextLabel}>This is some text</p>
              <p className={TextHeading01}>This is some text</p>
            </div>
            <div className="w-12">
              <Avatar />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-grow">
              <div className="space-y-2">
                <div className="flex">
                  <TypographySample />
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
