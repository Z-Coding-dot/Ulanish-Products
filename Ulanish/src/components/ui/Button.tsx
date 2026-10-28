import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/utils/cn';
type Variant = 'primary' | 'outline' | 'white' | 'whatsapp';
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ variant = 'primary', className, ...props }, ref) {
  return (
    <button ref={ref} type="button" className={cn('btn', `btn-${variant}`, className)} {...props} />
  );
});
export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: LinkProps & { variant?: Variant }) {
  return <Link className={cn('btn', `btn-${variant}`, className)} {...props} />;
}
export function ActionLink({
  variant = 'primary',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn('btn', `btn-${variant}`, className)} {...props} />;
}
