import create from 'zustand';
import request from '@/utils/request';

import { IWeatherNow, IWeatherNowRes } from '@/types/weather';
import { ERROR_CODE } from '@/utils/constants';
interface State {
  now: IWeatherNow | null;
  getNow: (location: string) => void;
}

const useWeatherStore = create<State>()((set) => {
  return {
    now: null,
    getNow: async (location: string) => {
      try {
        const result = await request<IWeatherNowRes>({
          url: '/api/tools/weather/now',
          method: 'POST',
          data: {
            location,
          },
        });
        if (result.code === ERROR_CODE.success.code) {
          set((state) => ({
            ...state,
            now: result.data.now,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
});

export default useWeatherStore;
