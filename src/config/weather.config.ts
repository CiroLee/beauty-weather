export interface InfoConfig {
  range: [number, number];
  text: string;
}
export const tempMap: InfoConfig[] = [
  {
    range: [-35, -11],
    text: '极冷,添衣保暖',
  },
  {
    range: [-10, 17],
    text: '冷,注意保暖',
  },
  {
    range: [18, 28],
    text: '舒适',
  },
  {
    range: [28, 40],
    text: '热,注意防暑',
  },
  {
    range: [41, 50],
    text: '炎热,减少外出',
  },
];

export const HumidityMap: InfoConfig[] = [
  {
    range: [0, 19],
    text: '干燥,建议加湿',
  },
  {
    range: [20, 39],
    text: '干燥,注意补水',
  },
  {
    range: [40, 70],
    text: '舒适',
  },
  {
    range: [71, 100],
    text: '潮湿,注意除湿',
  },
];

export const iconToBgMap: InfoConfig[] = [
  {
    range: [100, 199],
    text: '1xx',
  },
  {
    range: [300, 399],
    text: '3xx',
  },
  {
    range: [400, 499],
    text: '4xx',
  },
  {
    range: [500, 599],
    text: '5xx',
  },
];
