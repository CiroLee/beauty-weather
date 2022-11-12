import { FC, useState } from 'react';
import { useAsync } from 'react-use';
import Icon from '@/components/Icon';
import HourlyForcast from '@/components/business/HourlyForcast';
import BriefWeather from '@/components/business/BriefWeather';
import { BodyTempPanel, HumidityPanel, SunsetPanel, AirQualityPanel } from '@/components/business/InfoPanel';
import ForcastList from '@/components/business/ForcastList';
import IndicesPanel from '@/components/business/IndicesPanel';
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
        <BodyTempPanel value={now?.feelsLike} />
        <HumidityPanel value={now?.humidity} />
        <SunsetPanel sunrize={daily[0]?.sunrise} sunset={daily[0]?.sunset} />
        <AirQualityPanel value={qualityNow?.aqi} category={qualityNow?.category} />
      </div>
      <ForcastList options={daily} />
      <IndicesPanel />
    </div>
  );
};

export default Home;
