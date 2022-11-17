import { FC, useEffect } from 'react';
import {
  useAirQualityNow,
  useCityStore,
  useDayTimeStore,
  useForecastStore,
  useWeatherIndicesStore,
  useWeatherNowStore,
} from '@/store/weather';
import { useMedia } from 'react-use';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const { location: locationId } = useCityStore((state) => state.current());
  const { getNow } = useWeatherNowStore((state) => state);
  const { daily, getForecast } = useForecastStore((state) => state);
  const { getAirQualityNow } = useAirQualityNow((state) => state);
  const { judgeDayTime } = useDayTimeStore((state) => state);
  const { getIndices } = useWeatherIndicesStore((state) => state);
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);
  useEffect(() => {
    getNow(locationId);
    getForecast(locationId, 7);
    getAirQualityNow(locationId);
    getIndices(locationId, ['0']);
  }, []);
  useEffect(() => {
    judgeDayTime(daily[0]?.sunrise, daily[0]?.sunset);
  }, [daily[0]?.sunrise, daily[0]?.sunset]);
  return <Outlet />;
};

export default Layout;
