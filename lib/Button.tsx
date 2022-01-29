import { useState } from 'react';

// helper types
// 1. add 'root' to a union string type.
// 2. create object type from all var strings including root.
export type VarsWithRoot<T = string> = T | 'root';
export type TokensFrom<T extends string> = Record<VarsWithRoot<T>, string>;

// Define our variant list as a union type.
export type ButtonVariants = ('primary' | 'secondary' | 'normal');
// Create a type that has all variants as required keys.
// export type ButtonTokens = TokensFrom<ButtonVariants>;
export type ButtonTokens = Record<ButtonVariants | 'root', string>;

// Declare all properties, with basic HTML attributes included.
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  text: string; // text to display in Button
  variant?: ButtonVariants; // name of variant from ButtonVariants
  inject?: Partial<ButtonTokens> // optional, include any additional tokens to override.
}

export function Button({
  text = 'Default Text',
  variant = 'secondary',
  className,
  inject,
  ...attrs
}:ButtonProps) {
  const [count, setCount] = useState<number>(0);
  const tokens:ButtonTokens = {
    root: 'text-sm font-semibold text-gray-800 bg-white rounded p-3 px-4 ring-4 ring-yellow-300',
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-yellow-500 text-black',
    normal: 'bg-gray-200 text-gray-800',
    ...inject,
  };
  const baseToken = `${tokens.root} ${tokens[variant]} ${className}`;

  // group all of our handler methods together
  const handles = {
    onClick: () => setCount(count + 1),
    onMouseUp: () => setCount(count + 1),
    onMouseEnter: () => setCount(count + 1),
    onMouseOver: () => setCount(count + 1),
    onMouseOut: () => setCount(count + 1),
  };

  return (
    <button className={baseToken} type="button" {...handles} {...attrs}>
      {`Clicked ${count} times ... ${text}`}
    </button>
  );
}
