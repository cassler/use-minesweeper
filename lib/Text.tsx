import { useMemo } from 'react';

export interface TextProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | keyof typeof TextTokens
  inverted?: boolean;
}
export type TextHTMLProps = React.HTMLAttributes<HTMLElement> & TextProps;

export const TextTokens = {
  subcaption: 'text-xs',
  caption: 'text-sm',
  base: 'text-base',
  subheading: 'text-lg font-semibold',
  heading: 'text-xl font-bold',
  hero: 'text-2xl font-bold',
};
export const ContrastTokens = {
  base: ['400', '400', '700', '800', '800', '900'],
  dark: ['600', '600', '500', '300', '200', '100'],
};
export function useDesignToken({ level = 3, inverted }:TextProps):string {
  return useMemo(() => {
    if (typeof level === 'number') {
      const size = Object.values(TextTokens)[level - 1];
      const contrast = ContrastTokens[inverted ? 'dark' : 'base'][level - 1];
      return `${size} text-slate-${contrast}`;
    }
    if (typeof level === 'string') {
      const size = TextTokens[level];
      const contrastTokenIndex = Object.keys(TextTokens).indexOf(level);
      const contrast = ContrastTokens[inverted ? 'dark' : 'base'][contrastTokenIndex];
      return `${size} text-slate-${contrast}`;
    }
    return TextTokens.base;
  }, [level, inverted]);
}

export function TextRoot({
  level = 3, inverted, children, ...attr
}: TextHTMLProps) {
  const token = useDesignToken({ level, inverted });
  return <span className={token} {...attr}>{children}</span>;
}
export function Heading({
  level = 5, inverted, children, ...attr
}: TextHTMLProps) {
  const token = useDesignToken({ level, inverted });
  return <span className={token} {...attr}>{children}</span>;
}
export function SubHeading({
  level = 4, inverted, children, ...attr
}: TextHTMLProps) {
  const token = useDesignToken({ level, inverted });
  return <span className={token} {...attr}>{children}</span>;
}
export function Caption({
  level = 2, inverted, children, ...attr
}: TextHTMLProps) {
  const token = useDesignToken({ level, inverted });
  return <span className={token} {...attr}>{children}</span>;
}
export function SubCaption({
  level = 1, inverted, children, ...attr
}: TextHTMLProps) {
  const token = useDesignToken({ level, inverted });
  return <span className={token} {...attr}>{children}</span>;
}

export const Text = Object.assign(TextRoot, {
  Caption,
  SubCaption,
  Heading,
  SubHeading,
});
export default Text;
