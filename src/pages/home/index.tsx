import { FC, useEffect } from 'react';
import BriefWeather from '@/components/BriefWeather';
import style from './styles/index.module.scss';
import { useMedia } from 'react-use';
import classNames from 'classnames/bind';
import useWeatherStore from '@/store/weather';
const cx = classNames.bind(style);
const Home: FC = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const getWeatherNow = useWeatherStore((state) => state.getNow);
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);
  useEffect(() => {
    getWeatherNow('101010100');
  }, []);

  return (
    <div className={cx('home')}>
      <BriefWeather />
    </div>
  );
};

export default Home;
