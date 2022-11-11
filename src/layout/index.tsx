import { FC, useEffect } from 'react';
import { useAirQualityNow, useCityStore, useDayTimeStore, useForcastStore, useWeatherNowStore } from '@/store/weather';
import { useMedia } from 'react-use';
import { Outlet } from 'react-router-dom';
const Layout: FC = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const { locationId } = useCityStore((state) => state);
  const { getNow } = useWeatherNowStore((state) => state);
  const { daily, getForcast } = useForcastStore((state) => state);
  const { getAirQualityNow } = useAirQualityNow((state) => state);
  const { judgeDayTime } = useDayTimeStore((state) => state);
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);
  useEffect(() => {
    getNow(locationId);
    getForcast(locationId, 7);
    getAirQualityNow(locationId);
  }, []);
  useEffect(() => {
    judgeDayTime(daily[0]?.sunrise, daily[0]?.sunset);
  }, [daily[0]?.sunrise, daily[0]?.sunset]);
  return <Outlet />;
};

export default Layout;
