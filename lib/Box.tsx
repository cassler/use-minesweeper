export type BoxVariants = ('base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl');
export type ZIndex = (0 | 1 | 2 | 3 | 4 | 5);
// export type BoxTokens = Record<BoxVariants, string>;
// Define our variant list as a union type.
// export type ButtonVariants = ('primary' | 'secondary' | 'normal');
export type BoxTokens = Record<BoxVariants | 'root', string>;

export interface BoxPropsBase extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BoxVariants;
  border?: boolean;
  zAxis?: ZIndex;
}

export function Box(props: BoxPropsBase) {
  const {
    border, children, className, zAxis,
  } = props;
  const clsx = [
    'rounded p-3 px-4 m-4',
    border && 'border border-gray-200',
    (zAxis === 1 && 'shadow-sm hover:shadow-md transition-all'),
    (zAxis === 2 && 'shadow-md hover:shadow-lg transition-all'),
    (zAxis === 3 && 'shadow-lg hover:shadow-xl transition-all'),
    className,
  ].join(' ');
  return <div className={clsx}>{children}</div>;
}
