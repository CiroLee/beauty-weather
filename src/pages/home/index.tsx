import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '@/components/Icon';
import Loading from '@/components/Loading';
import HourlyForecast from '@/components/business/HourlyForecast';
import { BriefWeather } from '@/components/business/BriefWeather';
import { AirQualityPanel, BodyTempPanel, HumidityPanel, SunsetPanel } from '@/components/business/InfoPanel';
import ForecastList from '@/components/business/ForecastList';
import IndicesPanel from '@/components/business/IndicesPanel';
import WeatherWarnModal from '@/components/business/WeatherWarnModal';
import {
  useAirQualityNow,
  useCityStore,
  useDayTimeStore,
  useForecastStore,
  useWeatherIndicesStore,
  useWeatherNowStore,
  useWeatherWarnStore,
} from '@/store/weather';
import { getWeatherForecastHourly } from '@/services/weather-service';
import { IWeatherHourly } from '@/types/weather';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import { getSeverityColor } from '@/utils/utils';

const loading = new Loading();
const cx = classNames.bind(style);
const Home: FC = () => {
  const [searchParams] = useSearchParams();
  const [cityName, setCityName] = useState('');
  const [selectedWarnId, setSelectedWarnId] = useState('');
  const [showWarnModal, setShowWarnModal] = useState(false);
  const [hourly, setHourly] = useState<IWeatherHourly[]>([]);
  const { current } = useCityStore((state) => state);
  const { now, getNow } = useWeatherNowStore((state) => state);
  const { now: qualityNow, getAirQualityNow } = useAirQualityNow((state) => state);
  const { judgeDayTime } = useDayTimeStore((state) => state);
  const { daily, getForecast } = useForecastStore((state) => state);
  const { getIndices } = useWeatherIndicesStore((state) => state);
  const { warns, getDisasterWarning } = useWeatherWarnStore((state) => state);

  const getForecastHourly = async (location: string) => {
    const [result, ok] = await getWeatherForecastHourly(location);
    if (ok) {
      setHourly(result?.hourly as IWeatherHourly[]);
    }
  };

  const fetchDataAll = async (location: string) => {
    loading.start();
    getNow(location);
    getForecast(location, 7);
    getAirQualityNow(location);
    getIndices(location, ['0']);
    await getForecastHourly(location);
    getDisasterWarning(location);
    loading.stop();
  };

  const updateWeather = () => {
    const location = searchParams.get('location');
    if (location) {
      fetchDataAll(location);
    } else {
      fetchDataAll(current().location);
    }
  };
  const updateCityName = () => {
    const location = searchParams.get('location');
    setCityName(current(location).name);
  };
  // 获取数据
  useEffect(() => {
    updateWeather();
    updateCityName();
  }, [searchParams.get('location')]);

  useEffect(() => {
    judgeDayTime(daily[0]?.sunrise, daily[0]?.sunset);
  }, [daily[0]?.sunrise, daily[0]?.sunset]);

  return (
    <div className={cx('home')}>
      {warns?.length ? (
        <div className={cx('home__warns')}>
          {warns.map((item) => (
            <div
              className={cx('home__warns--item')}
              key={item.id}
              style={{ backgroundColor: getSeverityColor(item.severityColor) }}
              onClick={() => {
                setSelectedWarnId(item.id);
                setShowWarnModal(true);
              }}>
              <Icon type="ri" name="alarm-warning-line" color="#fff" />
              <span>{item.typeName}</span>
            </div>
          ))}
        </div>
      ) : null}
      <BriefWeather onUpdate={updateWeather} city={cityName} />
      <HourlyForecast className={cx('home__hourly')} options={hourly} />
      <div className={cx('home__info-panels')}>
        <BodyTempPanel value={now?.feelsLike} />
        <HumidityPanel value={now?.humidity} />
        <SunsetPanel sunrise={daily[0]?.sunrise} sunset={daily[0]?.sunset} />
        <AirQualityPanel value={qualityNow?.aqi} category={qualityNow?.category} />
      </div>
      <ForecastList options={daily} />
      <IndicesPanel />
      {showWarnModal ? (
        <WeatherWarnModal id={selectedWarnId} city={cityName} onClose={() => setShowWarnModal(false)} />
      ) : null}
    </div>
  );
};

export default Home;
