import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '@/components/Icon';
import HourlyForecast from '@/components/business/HourlyForecast';
import { BriefWeather } from '@/components/business/BriefWeather';
import { AirQualityPanel, BodyTempPanel, HumidityPanel, SunsetPanel } from '@/components/business/InfoPanel';
import ForecastList from '@/components/business/ForecastList';
import IndicesPanel from '@/components/business/IndicesPanel';
import {
  useAirQualityNow,
  useCityStore,
  useDayTimeStore,
  useForecastStore,
  useWeatherIndicesStore,
  useWeatherNowStore,
} from '@/store/weather';
import { getWeatherForcastHourly } from '@/services/weather-service';
import { IWeatherHourly } from '@/types/weather';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';

const cx = classNames.bind(style);
const Home: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hourly, setHourly] = useState<IWeatherHourly[]>([]);
  const { current } = useCityStore((state) => state);
  const { now, getNow } = useWeatherNowStore((state) => state);
  const { now: qualityNow, getAirQualityNow } = useAirQualityNow((state) => state);
  const { judgeDayTime } = useDayTimeStore((state) => state);
  const { daily, getForecast } = useForecastStore((state) => state);
  const { getIndices } = useWeatherIndicesStore((state) => state);
  const getForecastHourly = async (location: string) => {
    const [result, ok] = await getWeatherForcastHourly(location);
    if (ok) {
      setHourly(result?.hourly as IWeatherHourly[]);
    }
  };

  const fetchDataAll = (location: string) => {
    getNow(location);
    getForecast(location, 7);
    getAirQualityNow(location);
    getIndices(location, ['0']);
    getForecastHourly(location);
    console.log('fetch', location);
  };
  // 获取数据
  useEffect(() => {
    const location = searchParams.get('location');
    console.log(location);
    if (location) {
      fetchDataAll(location);
    } else {
      fetchDataAll(current().location);
    }
  }, [searchParams.get('location')]);

  useEffect(() => {
    judgeDayTime(daily[0]?.sunrise, daily[0]?.sunset);
  }, [daily[0]?.sunrise, daily[0]?.sunset]);

  return (
    <div className={cx('home')}>
      <Icon
        className={cx('home__map')}
        type="ri"
        name="earth-line"
        color="#e0e0e0"
        size="24px"
        onClick={() => navigate('/list')}
      />
      <BriefWeather location={searchParams.get('location')} />
      <HourlyForecast className={cx('home__hourly')} options={hourly} />
      <div className={cx('home__info-panels')}>
        <BodyTempPanel value={now?.feelsLike} />
        <HumidityPanel value={now?.humidity} />
        <SunsetPanel sunrize={daily[0]?.sunrise} sunset={daily[0]?.sunset} />
        <AirQualityPanel value={qualityNow?.aqi} category={qualityNow?.category} />
      </div>
      <ForecastList options={daily} />
      <IndicesPanel />
    </div>
  );
};

export default Home;
