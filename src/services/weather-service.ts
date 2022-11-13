import request from '@/utils/request';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
import { ERROR_CODE } from '@/utils/constants';
import type {
  IWeatherNowRes,
  IWeatherForcastRes,
  IWeatherHourlyRes,
  IAirQualityRes,
  IWeatherIndicesRes,
  IndicesType,
  ILocation,
} from '@/types/weather';

const loading = new Loading();
const message = new Message();

export const searchCity = async (location: string, num = 20): Promise<[ILocation[] | undefined, boolean]> => {
  try {
    const result = await request<ILocation[]>({
      url: '/api/tools/weather/city',
      method: 'POST',
      data: {
        location,
        number: num,
      },
    });
    return [result.data, true];
  } catch (error) {
    console.error(error);
    return [undefined, false];
  } finally {
    loading.stop();
  }
};

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
    console.error(error);

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
    console.error(error);
    return [undefined, false];
  } finally {
    loading.stop();
  }
};

export const getAirQualityNow = async (location: string): Promise<[IAirQualityRes | undefined, boolean]> => {
  try {
    loading.start();
    const result = await request<IAirQualityRes>({
      url: '/api/tools/weather/air',
      method: 'POST',
      data: { location },
    });
    if (result.code !== ERROR_CODE.success.code) {
      message.error(result.message || '请求失败');
      return [undefined, false];
    }
    return [result.data, true];
  } catch (error) {
    console.error(error);
    return [undefined, false];
  } finally {
    loading.stop();
  }
};

export const getWeatherIndices = async (
  location: string,
  type?: IndicesType[],
): Promise<[IWeatherIndicesRes | undefined, boolean]> => {
  try {
    loading.start();
    const result = await request<IWeatherIndicesRes>({
      url: '/api/tools/weather/indices-daily',
      method: 'POST',
      data: {
        day: 1,
        type: type ?? ['0'],
        location,
      },
    });
    if (result.code !== ERROR_CODE.success.code) {
      return [undefined, false];
    }
    return [result.data, true];
  } catch (error) {
    console.error(error);

    return [undefined, false];
  } finally {
    loading.stop();
  }
};
