interface ICommonWeatherRes {
  updateTime: string;
  fxLink: string;
}

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

interface ISourceRefer {
  sources?: string[];
  license?: string[];
}

export interface IWeatherNowRes extends ICommonWeatherRes {
  now: IWeatherNow[];
  reffer: ISourceRefer;
}
