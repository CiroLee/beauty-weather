import { FC, useEffect, useMemo, useState } from 'react';
import { useCityStore, useForecastStore, useWeatherNowStore } from '@/store/weather';
import { differenceInMinutes, format } from 'date-fns';
import { iconToBgMap } from '@/config/weather.config';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import Icon from '../../Icon';
import { useNavigate } from 'react-router-dom';

interface BriefWeatherProps {
  location?: string | null;
  onUpdate: () => void;
}
const cx = classNames.bind(style);
export const BriefWeather: FC<BriefWeatherProps> = (props: BriefWeatherProps) => {
  const navigate = useNavigate();
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

  const updateTime = useMemo(() => {
    if (!now?.updateTime) {
      return '';
    }
    const diff = Math.abs(differenceInMinutes(new Date(now.updateTime), new Date()));
    if (diff < 1) {
      return '刚刚更新';
    } else if (diff >= 1 && diff < 60) {
      return `${diff}分钟前更新`;
    }

    return `${format(new Date(now.updateTime), 'MM-dd HH:mm:ss')}`;
  }, [now?.updateTime]);

  useEffect(() => {
    if (now?.icon) {
      transIconCode(now?.icon);
    }
  }, [now?.icon]);

  return (
    <div className={cx('brief-weather', bg)}>
      <div className={cx('brief-weather__data')}>
        <h2 className={cx('brief-weather--location')} onClick={() => navigate('/list')}>
          <span>{current(props.location).name}</span>
          <Icon type="ri" name="search-line" size="20px" />
        </h2>
        <Icon type="qi" name={`${now?.icon}-fill`} size="120px" color="#fff" />
        <p className={cx('name')}>{now?.text}</p>
        <p className={cx('temperature', 'num-font')}>
          {daily[0]?.tempMin}~{daily[0]?.tempMax}°C
        </p>
        <p className={cx('brief-weather__update')} onClick={props.onUpdate}>
          <Icon type="ri" name="refresh-line" />
          <span>{updateTime}</span>
        </p>
      </div>
    </div>
  );
};
