import create from 'zustand';
import request from '@/utils/request';
import Message from '@/components/Message';
import { IWeatherNow, IWeatherNowRes } from '@/types/weather';
import { ERROR_CODE } from '@/utils/constants';

const message = new Message();
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
        } else {
          message.error(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
});

export default useWeatherStore;
