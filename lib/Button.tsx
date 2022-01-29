import { useEffect, useState } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'normal';

export interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
}

export function Button({ text = 'Default Text', variant = 'secondary' }:ButtonProps) {
  const [newText, setText] = useState(text);
  const [log, append] = useState<string[]>([]);

  const token = {
    contain: 'container mx-auto border',
    label: 'text-sm font-light text-gray-500',
    li: 'text-xs font-semibold text-gray-600',
    box: 'grid grid-cols-3',
    btnBase: 'text-sm font-semibold text-gray-800 bg-white rounded p-3 px-4 ring-4 ring-yellow-300',
  };
  const variants:{ [key in ButtonVariant]: string } = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-yellow-500 text-black',
    normal: 'bg-gray-200 text-gray-800',
  };
  // group all of our handler methods together
  const handles = {
    onClick: () => setText(`New Text ${Date.now()}`),
    onMouseUp: () => setText(`Finished clicking ${Date.now()}`),
    onMouseEnter: () => setText(`Mouse entered ${Date.now()}`),
    onMouseOver: () => setText(`Hover Text ${Date.now()}`),
    onMouseOut: () => setText(`You exited ${Date.now()}`),
  };

  useEffect(() => {
    // if the log length > X, include only the last X items.
    const trimmed = log.length > 10 ? log.slice(log.length - 10) : log;
    // set the log to the trimmed version and the new entry
    append([...trimmed, newText]);
  }, [newText]);

  return (
    <div className={token.contain}>
      <div className={token.box}>
        <h1 className={token.label}>{newText}</h1>
        <button className={`${variants[variant]} ${token.btnBase}`} type="button" {...handles}>Click Me</button>
        <ul>
          {log.map((txt, i) => <li className={token.li} key={i.toString()}>{txt}</li>)}
        </ul>
      </div>
    </div>

  );
}
