import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getWeatherNow, getWeatherForcast } from '@/services/weather-service';
import { IWeatherForcast, IWeatherNow } from '@/types/weather';

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
      try {
        const [reuslt, ok] = await getWeatherNow(location);
        if (ok) {
          set((state) => ({
            ...state,
            now: reuslt?.now,
            updateTime: reuslt?.updateTime,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
});

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
      try {
        const [result, ok] = await getWeatherForcast(location, day);
        if (ok) {
          set(() => ({
            daily: result?.daily,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
});
