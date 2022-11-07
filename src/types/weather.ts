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
  country: string;
  tz: string;
  otcOffset: string;
  isDst: '0' | '1'; // 是否是夏令时 1表示是夏令时 0 表示不是夏令时
  type: string;
  rank: string;
  fxLink: string;
}

// 天气预报
export interface IWeatherForcast {
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
  now: IWeatherNow;
  updateTime: string;
  reffer: ISourceRefer;
}

export interface IWeatherForcastRes {
  daily: IWeatherForcast[];
  reffer: ISourceRefer;
}
