import { FC, useEffect } from 'react';
import BriefWeather from '@/components/business/BriefWeather';
import style from './styles/index.module.scss';
import { useMedia } from 'react-use';
import classNames from 'classnames/bind';
import { useWeatherNowStore, useCityStore } from '@/store/weather';
const cx = classNames.bind(style);
const Home: FC = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const { locationId } = useCityStore((state) => state);
  const getWeatherNow = useWeatherNowStore((state) => state.getNow);
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);
  useEffect(() => {
    getWeatherNow(locationId);
  }, []);

  return (
    <div className={cx('home')}>
      <BriefWeather />
    </div>
  );
};

export default Home;
