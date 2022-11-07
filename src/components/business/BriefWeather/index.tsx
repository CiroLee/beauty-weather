import { FC, useEffect } from 'react';
import { useCityStore, useWeatherNowStore, useForcastStore } from '@/store/weather';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
const cx = classNames.bind(style);
import Icon from '../../Icon';
const BriefWeather: FC = () => {
  const { locationName, locationId } = useCityStore((state) => state);
  const { daily, getForcast } = useForcastStore((state) => state);
  const { now } = useWeatherNowStore((state) => state);

  useEffect(() => {
    getForcast(locationId, 3);
  }, []);

  return (
    <div className={cx('brief-weather')}>
      <div className={cx('brief-weather__data')}>
        <h2 className={cx('brief-weather--location')}>{locationName}</h2>
        <Icon type="qi" name={`${now?.icon}-fill`} size="120px" color="#fff" />
        <p className={cx('name')}>{now?.text}</p>
        <p className={cx('temprature')}>
          {daily[0]?.tempMin}~{daily[0]?.tempMax}°C
        </p>
      </div>
    </div>
  );
};

export default BriefWeather;
