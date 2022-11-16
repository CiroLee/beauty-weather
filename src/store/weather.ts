import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getAirQualityNow, getWeatherForecast, getWeatherIndices, getWeatherNow } from '@/services/weather-service';
import { IAirQuality, IDailyIndices, IndicesType, IWeatherForecast, IWeatherNow } from '@/types/weather';

// 当前使用的城市信息
interface CityState {
  locations: {
    location: string;
    name: string;
  }[];
  current: () => { location: string; name: string };
  addLocation: (id: string, name: string) => void;
  removeLocation: (id: string) => void;
}

export const useCityStore = create<CityState>()(
  persist(
    (set, get) => {
      return {
        locations: [
          { location: '101280605', name: '宝安' },
          { location: '101010100', name: '北京' },
        ],
        current: () => ({
          location: get().locations[0].location,
          name: get().locations[0].name,
        }),
        addLocation: (location: string, name: string) => {
          set((state) => {
            if (get().locations.find((item) => item.location === location)) return { ...state };
            state.locations.push({ location, name });
            return {
              locations: state.locations,
            };
          });
        },
        removeLocation: (location: string) => {
          set((state) => {
            const locations = state.locations.filter((item) => item.location !== location);
            return {
              locations,
            };
          });
        },
      };
    },
    {
      name: 'cities',
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
  daily: IWeatherForecast[];
  getForcast: (location: string, day: days) => void;
}

export const useForcastStore = create<IForcastState>()((set) => {
  return {
    daily: [],
    getForcast: async (location: string, day: days) => {
      const [result, ok] = await getWeatherForecast(location, day);
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
interface IWeatherIndicesState {
  indices: IDailyIndices[];
  getIndices: (location: string, type?: IndicesType[]) => void;
}
export const useWeatherIndices = create<IWeatherIndicesState>()((set) => {
  return {
    indices: [],
    getIndices: async (location: string, type?: IndicesType[]) => {
      const [result, ok] = await getWeatherIndices(location, type);
      if (ok) {
        set(() => ({
          indices: result?.daily,
        }));
      }
    },
  };
});
