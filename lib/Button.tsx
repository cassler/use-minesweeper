import { useState } from 'react';

/** Typings - Token ============================================== */

// 1. add 'root' to a union string type.
// 2. create object type from all var strings including root.
export type VarsWithRoot<T = string> = T | 'root';
export type TokensFrom<T extends string> = Record<VarsWithRoot<T>, string>;
export type VariantConfig<T extends string> = Record<T, TokenConfig>;
/** Additional Experiments */
export interface TokenConfig {
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  color: 'slate' | 'gray' | 'blue' | 'red';
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/** Typings - Button =========================================== */

// Define our variant list as a union type.
export type ButtonVariants = ('primary' | 'secondary' | 'normal');
export type ButtonTokens = Record<ButtonVariants | 'root', string>;
// export type ButtonTokens = TokensFrom<ButtonVariants>; // <-- this is the same as the above
// Create a type that has all variants as required keys.
// Declare all properties, with basic HTML attributes included.
export type ButtonPropsBase = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string; // text to display in Button
  variant?: ButtonVariants; // name of variant from ButtonVariants
  inject?: Partial<ButtonTokens> // optional, include any additional tokens to override.
};

export function Button({ text = 'Default Text', variant = 'secondary', ...props }: ButtonPropsBase) {
  const { inject, className, ...attrs } = props;
  const [count, setCount] = useState<number>(0);
  const tokens:ButtonTokens = {
    root: 'text-sm font-semibold text-gray-800 bg-white rounded p-3 px-4 ring-4 ring-yellow-300',
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-yellow-500 text-black',
    normal: 'bg-gray-200 text-gray-800',
    ...inject,
  };
  const baseToken = `${tokens.root} ${tokens[variant]} ${className}`;
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
