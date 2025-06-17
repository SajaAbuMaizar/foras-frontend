export const formatNumber = (num: number): string =>
  new Intl.NumberFormat().format(num);

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
