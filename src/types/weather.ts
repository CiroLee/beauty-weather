export interface IWeatherNow {
  obsTime: string;
  temp: string;
  feelsLike: string;
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  wdinScale: string;
  windSpeed: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  dew?: string;
}

export interface ILocation {
  name: string;
  id: string;
  lat: string; // 经度
  lon: string; // 纬度
  adm2: string; // 地区/城市的上级行政区划名称
  adm1: string; // 地区/城市所属一级行政区域
  isDst: '0' | '1'; // 是否是夏令时 1表示是夏令时 0 表示不是夏令时
  type: string;
  rank: string;
}

// 天气预报
export interface IWeatherForecast {
  fxDate: string; // 预报日期
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string; // 月相名称
  moonPhaseIcon: string;
  tempMax?: string; // 预报当天最高温度
  tempMin?: string;
  iconDay: string; // 预报白天天气状况的图标代码
  textDat: string;
  iconNight: string;
  textNight: string;
  wind360Day: string; // 预报白天风向角度
  windDirDat: string; // 预报白天风向
  windScaleDay: string; // 预报白天风力等级
  windSpeedDay: string;
  wind360Night: string;
  windDirNight: string;
  windScaleNight: string;
  windSpeedNight: string;
  humidity: string; // 相对湿度
  precip: string; // 预报当天总降水量，默认单位：毫米
  pressure: string; // 大气压强
  vis: string; // 能见度
  cloud?: string; // 云量
  uvIndex: string; // 紫外线强度指数
}
// 小时预报
export interface IWeatherHourly {
  fxTime: string; // 预报时间 精确到小时
  temp: string;
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string; // 风力等级
  humidity: string;
  pop?: string; // 逐小时预报降水概率，百分比数值
  precip: string; // 前小时累计降水量，默认单位：毫米
  pressure: string;
  cloud?: string;
  dew?: string; // 露点温度
}
// 实时空气质量
export interface IAirQuality {
  pubTime: string;
  aqi: string; // 空气质量指数
  level: string;
  category: string;
  primary: string; // 空气质量的主要污染物，空气质量为优时，返回值为NA
  pm10: string;
  pm2p5: string;
  no2: string;
  so2: string;
  co: string;
  o3: string;
}

export type IndicesType =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16';
export interface IDailyIndices {
  date: string; // 预报日期
  type: string; // 生活指数类型ID
  name: string; // 生活指数类型名称
  level: string; // 生活指数预报等级
  category: string; // 生活指数预报级别名称
  text?: string; // 生活指数详细描述
}

interface ISourceRefer {
  sources?: string[];
  license?: string[];
}

export interface ISerchCityReq {
  location: string;
  number?: number;
  adm?: string; // 行政区
  range?: string; //搜索范围
}

export interface IWeatherNowRes {
  location: string;
  now: IWeatherNow;
  updateTime: string;
  reffer: ISourceRefer;
}

export interface IWeatherForecastRes {
  location: string;
  daily: IWeatherForecast[];
  reffer: ISourceRefer;
}

export interface IWeatherHourlyRes {
  location: string;
  hourly: IWeatherHourly[];
  reffer: ISourceRefer;
}

export interface IAirQualityRes {
  location: string;
  now: IAirQuality;
  station?: (IAirQuality & { id: string })[];
  refer: ISourceRefer;
}

export interface IWeatherIndicesRes {
  location: string;
  daily: IDailyIndices[];
  reffer: ISourceRefer;
}
