import { FC, useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import HourlyForcast from '@/components/business/HourlyForcast';
import BriefWeather from '@/components/business/BriefWeather';
import { BodyTempPanel } from '@/components/business/InfoPanel';
import style from './style/index.module.scss';
import { useMedia } from 'react-use';
import classNames from 'classnames/bind';
import { useWeatherNowStore, useCityStore, useForcastStore } from '@/store/weather';
import { getWeatherForcastHourly } from '@/services/weather-service';
import { IWeatherHourly } from '@/types/weather';
const cx = classNames.bind(style);
const Home: FC = () => {
  const [hourly, setHourly] = useState<IWeatherHourly[]>([]);
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const { locationId } = useCityStore((state) => state);
  const { getNow: getWeatherNow } = useWeatherNowStore((state) => state);
  const { getForcast } = useForcastStore((state) => state);
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);
  useEffect(() => {
    getWeatherNow(locationId);
    getForcast(locationId, 7);
  }, []);

  useAsync(async () => {
    const [result, ok] = await getWeatherForcastHourly(locationId);
    if (ok) {
      setHourly(result?.hourly as IWeatherHourly[]);
    }
  });

  return (
    <div className={cx('home')}>
      <BriefWeather />
      <HourlyForcast className={cx('home__hourly')} options={hourly} />
      <div className={cx('home__info-panels')}>
        <BodyTempPanel text="123" />
        <BodyTempPanel text="234" />
      </div>
    </div>
  );
};

export default Home;
