import request from '@/utils/request';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
import { ERROR_CODE } from '@/utils/constants';
import type { IWeatherNowRes, IWeatherForcastRes } from '@/types/weather';

const loading = new Loading();
const message = new Message();

export const getWeatherNow = async (
  location: string,
): Promise<[Omit<IWeatherNowRes, 'reffer'> | undefined, boolean]> => {
  try {
    loading.start();
    const result = await request<IWeatherNowRes>({
      url: '/api/tools/weather/now',
      method: 'POST',
      data: {
        location,
      },
    });
    if (result.code !== ERROR_CODE.success.code) {
      message.error(result.message || '请求失败');
      return [undefined, false];
    }
    return [
      {
        now: result.data.now,
        updateTime: result.data.updateTime,
      },
      true,
    ];
  } catch (error) {
    return [undefined, false];
  } finally {
    loading.stop();
  }
};

export const getWeatherForcast = async (
  location: string,
  day: number,
): Promise<[Omit<IWeatherForcastRes, 'reffer'> | undefined, boolean]> => {
  loading.start();
  try {
    const result = await request<IWeatherForcastRes>({
      url: '/api/tools/weather/forecast-day',
      method: 'POST',
      data: {
        location,
        day,
      },
    });
    if (result.code !== ERROR_CODE.success.code) {
      message.error(result.message || '请求失败');
      return [undefined, false];
    }
    return [{ daily: result.data.daily }, true];
  } catch (error) {
    return [undefined, false];
  } finally {
    loading.stop();
  }
};
