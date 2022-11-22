import request from '@/utils/request';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
import { ERROR_CODE } from '@/utils/constants';
import type {
  IAirQualityRes,
  ILocation,
  IndicesType,
  IWeatherForecastRes,
  IWeatherHourlyRes,
  IWeatherIndicesRes,
  IWeatherNowRes,
} from '@/types/weather';

interface ServiceOptions {
  loading?: boolean;
}
const loading = new Loading();
const message = new Message();

export const searchCity = async (
  location: string,
  num = 20,
  opt?: ServiceOptions,
): Promise<[ILocation[] | undefined, boolean]> => {
  opt?.loading && loading.start();
  try {
    const result = await request<ILocation[]>({
      url: '/api/tools/weather/city',
      method: 'POST',
      data: {
        location,
        number: num,
      },
    });
    if (result.code !== ERROR_CODE.success.code) {
      if (result.code === 404) {
        return [undefined, true];
      }
      message.error(result.message || '请求失败');
      return [undefined, false];
    }
    return [result.data, true];
  } catch (error) {
    console.error(error);
    return [undefined, false];
  } finally {
    opt?.loading && loading.stop();
  }
};

export const getWeatherNow = async (
  location: string,
  opt?: ServiceOptions,
): Promise<[IWeatherNowRes | undefined, boolean]> => {
  try {
    opt?.loading && loading.start();
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
    const now = {
      ...result.data.now,
      updateTime: result.data.updateTime,
    };
    return [
      {
        ...result.data,
        now,
      },
      true,
    ];
  } catch (error) {
    console.error(error);

    return [undefined, false];
  } finally {
    opt?.loading && loading.stop();
  }
};
// 逐日天气预报
export const getWeatherForecast = async (
  location: string,
  day: number,
  opt?: ServiceOptions,
): Promise<[IWeatherForecastRes | undefined, boolean]> => {
  opt?.loading && loading.start();
  try {
    const result = await request<IWeatherForecastRes>({
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
    opt?.loading && loading.stop();
  }
};

// 逐时天气预报
export const getWeatherForcastHourly = async (
  location: string,
  opt?: ServiceOptions,
): Promise<[IWeatherHourlyRes | undefined, boolean]> => {
  opt?.loading && loading.start();
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
    opt?.loading && loading.stop();
  }
};

export const getAirQualityNow = async (
  location: string,
  opt?: ServiceOptions,
): Promise<[IAirQualityRes | undefined, boolean]> => {
  opt?.loading && loading.start();
  try {
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
    opt?.loading && loading.stop();
  }
};

export const getWeatherIndices = async (
  location: string,
  type?: IndicesType[],
  opt?: ServiceOptions,
): Promise<[IWeatherIndicesRes | undefined, boolean]> => {
  opt?.loading && loading.start();
  try {
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
    opt?.loading && loading.stop();
  }
};
