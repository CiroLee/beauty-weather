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
