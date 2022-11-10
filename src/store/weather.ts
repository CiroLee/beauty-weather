import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getWeatherNow, getWeatherForcast, getAirQualityNow } from '@/services/weather-service';
import { IAirQuality, IWeatherForcast, IWeatherNow } from '@/types/weather';

// 当前使用的城市信息
interface CityState {
  locationId: string;
  locationName: string;
  setCity: (locationId: string, locationName: string) => void;
}

export const useCityStore = create<CityState>()(
  persist(
    (set) => {
      return {
        locationId: '101010100',
        locationName: '北京',
        // 使用查询城市接口后设置
        setCity: (locationId: string, locationName: string) =>
          set(() => ({
            locationId,
            locationName,
          })),
      };
    },
    {
      name: 'city',
    },
  ),
);
interface IDayTimeState {
  isDayTime: boolean;
  judgeDayTime: (sunrize?: string, sunset?: string) => void;
}
export const useDayTimeStore = create<IDayTimeState>()((set) => {
  return {
    isDayTime: true,
    judgeDayTime: (sunrize?: string, sunset?: string) => {
      const currentTime = Date.now();
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();
      const sunrizeTime = new Date(`${year}/${month}/${day} ${sunrize}`).getTime();
      const sunsetTime = new Date(`${year}/${month}/${day} ${sunset}`).getTime();
      set(() => ({
        isDayTime: currentTime >= sunrizeTime && currentTime <= sunsetTime,
      }));
    },
  };
});
interface NowState {
  now?: IWeatherNow | null;
  updateTime?: string;
  getNow: (location: string) => void;
}
// 实时天气
export const useWeatherNowStore = create<NowState>()((set) => {
  return {
    now: null,
    getNow: async (location: string) => {
      const [reuslt, ok] = await getWeatherNow(location);
      if (ok) {
        set((state) => ({
          ...state,
          now: reuslt?.now,
          updateTime: reuslt?.updateTime,
        }));
      }
    },
  };
});

// 未来天气预报
type days = 3 | 7 | 15;
interface IForcastState {
  daily: IWeatherForcast[];
  getForcast: (location: string, day: days) => void;
}

export const useForcastStore = create<IForcastState>()((set) => {
  return {
    daily: [],
    getForcast: async (location: string, day: days) => {
      const [result, ok] = await getWeatherForcast(location, day);
      if (ok) {
        set(() => ({
          daily: result?.daily,
        }));
      }
    },
  };
});

interface IAirQualityNowState {
  now: IAirQuality | null;
  station: (IAirQuality & { id: string })[];
  getAirQualityNow: (location: string) => void;
}

export const useAirQualityNow = create<IAirQualityNowState>()((set) => {
  return {
    now: null,
    station: [],
    getAirQualityNow: async (location: string) => {
      const [result, ok] = await getAirQualityNow(location);
      if (ok) {
        set(() => ({
          now: result?.now,
          station: result?.station || [],
        }));
      }
    },
  };
});
