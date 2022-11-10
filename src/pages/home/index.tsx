import { FC, useState, useMemo } from 'react';
import { useAsync } from 'react-use';
import Icon from '@/components/Icon';
import HourlyForcast from '@/components/business/HourlyForcast';
import BriefWeather from '@/components/business/BriefWeather';
import { BodyTempPanel, HumidityPanel, SunsetPanel, AirQualityPanel } from '@/components/business/InfoPanel';
import style from './style/index.module.scss';
import classNames from 'classnames/bind';
import { useWeatherNowStore, useCityStore, useForcastStore, useAirQualityNow } from '@/store/weather';
import { getWeatherForcastHourly } from '@/services/weather-service';
import { IWeatherHourly } from '@/types/weather';
const cx = classNames.bind(style);
const Home: FC = () => {
  const [hourly, setHourly] = useState<IWeatherHourly[]>([]);
  const { locationId } = useCityStore((state) => state);
  const { now } = useWeatherNowStore((state) => state);
  const { daily } = useForcastStore((state) => state);
  const { now: qualityNow } = useAirQualityNow((state) => state);
  useAsync(async () => {
    const [result, ok] = await getWeatherForcastHourly(locationId);
    if (ok) {
      setHourly(result?.hourly as IWeatherHourly[]);
    }
  });

  return (
    <div className={cx('home')}>
      <Icon className={cx('home__map')} type="ri" name="earth-line" color="#e0e0e0" size="24px" />
      <BriefWeather />
      <HourlyForcast className={cx('home__hourly')} options={hourly} />
      <div className={cx('home__info-panels')}>
        {useMemo(
          () => (
            <BodyTempPanel value={now?.feelsLike} />
          ),
          [now?.feelsLike],
        )}
        {useMemo(
          () => (
            <HumidityPanel value={now?.humidity} />
          ),
          [now?.humidity],
        )}
        {useMemo(
          () => (
            <SunsetPanel sunrize={daily[0]?.sunrise} sunset={daily[0]?.sunset} />
          ),
          [daily[0]?.sunrise, daily[0]?.sunset],
        )}
        {useMemo(
          () => (
            <AirQualityPanel value={qualityNow?.aqi} category={qualityNow?.category} />
          ),
          [qualityNow?.aqi, qualityNow?.category],
        )}
      </div>
    </div>
  );
};

export default Home;
