import { useMemo } from 'react';

export interface TextProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  inverted?: boolean;
}
export type TextHTMLProps = TextProps & React.HTMLAttributes<HTMLElement>;

export function useDesignToken({ level, inverted }:Omit<TextProps, 'children'>):string {
  const TextTokens = {
    subcaption: 'text-xs',
    caption: 'text-sm',
    base: 'text-base',
    subheading: 'text-lg font-semibold',
    heading: 'text-xl font-bold',
    hero: 'text-2xl font-bold',
  };
  const ContrastTokens = {
    base: ['400', '400', '700', '800', '800', '900'],
    dark: ['600', '600', '500', '300', '200', '100'],
  };
  return useMemo(() => {
    const size = Object.values(TextTokens)[level - 1];
    const contrast = ContrastTokens[inverted ? 'dark' : 'base'][level - 1];
    return `${size} text-slate-${contrast}`;
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
