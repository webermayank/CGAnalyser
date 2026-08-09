export const parseList = (str: string | undefined): string[] => {
  if (!str) return [];
  if (str.trim().toLowerCase() === 'none') return [];
  return str.split(',').map(s => s.trim()).filter(s => s.length > 0);
};

export const parseNumber = (str: string | undefined): number => {
  if (!str) return 0;
  if (str.trim().toLowerCase() === 'none') return 0;
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
};
