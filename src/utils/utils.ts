export const getSeverityColor = (color?: string) => {
  const severityColor = {
    white: '#fff',
    blue: '#0050ef',
    green: '#60917',
    yellow: '#F0a30a',
    orange: '#fa6800',
    red: '#e51400',
    black: '#000',
  };
  if (!color) return 'gray';
  return severityColor[color.toLowerCase() as keyof typeof severityColor] || 'gray';
};

export const px2vw = (val: number | string, base: number): string => {
  const unit = 100 / base; // 1px = (100vw/base px) = ?vw
  const px = typeof val === 'string' ? Number(val.replace(/px|rem|em|vw|vh$/g, '')) : val;
  return (px * unit).toFixed(5) + 'vw';
};
