export const formatNumber = (num: number): string =>
  new Intl.NumberFormat().format(num);
