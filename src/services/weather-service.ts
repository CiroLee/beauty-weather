import request from '@/utils/request';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
import { ERROR_CODE } from '@/utils/constants';
import type { IWeatherNowRes, IWeatherForcastRes, IWeatherHourlyRes } from '@/types/weather';

const loading = new Loading();
const message = new Message();

export const getWeatherNow = async (location: string): Promise<[IWeatherNowRes | undefined, boolean]> => {
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
    return [result.data, true];
  } catch (error) {
    return [undefined, false];
  } finally {
    loading.stop();
  }
};
// 逐日天气预报
export const getWeatherForcast = async (
  location: string,
  day: number,
): Promise<[IWeatherForcastRes | undefined, boolean]> => {
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
    return [result.data, true];
  } catch (error) {
    return [undefined, false];
  } finally {
    loading.stop();
  }
};

// 逐时天气预报
export const getWeatherForcastHourly = async (location: string): Promise<[IWeatherHourlyRes | undefined, boolean]> => {
  loading.start();
  try {
    const result = await request<IWeatherHourlyRes>({
      url: '/api/tools/weather/forecast-hour',
      method: 'POST',
      data: {
        location,
      },
    });
    if (result.code !== ERROR_CODE.success.code) {
      message.error(result.message || '请求失败');
      return [undefined, false];
    }
    return [result.data, true];
  } catch (error) {
    return [undefined, false];
  } finally {
    loading.stop();
  }
};
