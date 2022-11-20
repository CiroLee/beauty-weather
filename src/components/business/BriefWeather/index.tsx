import { FC, useEffect, useState } from 'react';
import { useCityStore, useForecastStore, useWeatherNowStore } from '@/store/weather';
import { iconToBgMap } from '@/config/weather.config';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import Icon from '../../Icon';

interface BriefWeatherProps {
  location?: string | null;
}
const cx = classNames.bind(style);
export const BriefWeather: FC<BriefWeatherProps> = (props: BriefWeatherProps) => {
  const { current } = useCityStore((state) => state);
  const { daily } = useForecastStore((state) => state);
  const { now } = useWeatherNowStore((state) => state);
  const [bg, setBg] = useState<string | null>(null);
  const transIconCode = (icon?: string): void => {
    const item = iconToBgMap.find((item) => Number(icon) >= item.range[0] && Number(icon) <= item.range[1]);
    if (item) {
      setBg(`bg-${item?.text}`);
    }
  };

  useEffect(() => {
    if (now?.icon) {
      transIconCode(now?.icon);
    }
  }, [now?.icon]);

  return (
    <div className={cx('brief-weather', bg)}>
      <div className={cx('brief-weather__data')}>
        <h2 className={cx('brief-weather--location')}>{current(props.location).name}</h2>
        <Icon type="qi" name={`${now?.icon}-fill`} size="120px" color="#fff" />
        <p className={cx('name')}>{now?.text}</p>
        <p className={cx('temprature', 'num-font')}>
          {daily[0]?.tempMin}~{daily[0]?.tempMax}°C
        </p>
      </div>
    </div>
  );
};
