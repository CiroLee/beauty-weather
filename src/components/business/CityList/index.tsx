import React, { FC, useEffect, useState } from 'react';
import { getWeatherForecast } from '@/services/weather-service';
import { useCityStore, useDayTimeStore } from '@/store/weather';
import { IWeatherForecast } from '@/types/weather';
import { iconToBgMap } from '@/config/weather.config';
import style from './style/index.module.scss';
import classNames from 'classnames/bind';
import Icon from '@/components/Icon';
const cx = classNames.bind(style);

interface CityItemProps {
  name: string;
  icon?: string;
  tempMin?: string;
  tempMax?: string;
}
interface Pointer {
  x: number;
  y: number;
}
const CityItem: FC<CityItemProps> = (props: CityItemProps) => {
  const [bg, setBg] = useState<string | null>(null);
  const [{ x: startX, y: startY }, setStartPos] = useState<Pointer>({ x: 0, y: 0 });
  const transIconCode = (icon?: string): void => {
    const item = iconToBgMap.find((item) => Number(icon) >= item.range[0] && Number(icon) <= item.range[1]);
    if (item) {
      setBg(`bg-${item?.text}`);
    }
  };

  const handleOnTouchStart = (event: React.TouchEvent) => {
    // console.log(event);
    setStartPos({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };
  const handleOnTouchMove = (event: React.TouchEvent) => {
    const endX = event.touches[0].clientX;
    const endY = event.touches[0].clientY;
    console.log(startX, startY, endX, endY);
  };

  useEffect(() => {
    if (props?.icon) {
      transIconCode(props.icon);
    }
  }, [props?.icon]);
  return (
    <div className={cx('city-item')}>
      <div
        className={cx('city-item__main', bg)}
        onTouchStart={(event) => handleOnTouchStart(event)}
        onTouchMove={(event) => handleOnTouchMove(event)}>
        <div className={cx('city-item__main--name')}>{props.name}</div>
        <div className={cx('city-item__main--brief')}>
          <Icon type="qi" name={`${props.icon}-fill`} size="30px" color="#fff" />
          <p>{`${props.tempMin}°C~${props.tempMax}°C`}</p>
        </div>
      </div>
      <div className={cx('city-item__delete')}>
        <Icon type="ri" name="delete-bin-fill" size="20px" color="#fff" />
      </div>
    </div>
  );
};
interface IWeatherForecastWithId extends IWeatherForecast {
  location: string;
  name: string;
  icon?: string;
}
const CityList: FC = () => {
  const [list, setList] = useState<IWeatherForecastWithId[]>([]);
  const { locations } = useCityStore((state) => state);
  const { isDayTime } = useDayTimeStore((state) => state);
  const getForecastByLocations = async () => {
    const result = await Promise.all(
      locations.map((item) => {
        return getWeatherForecast(item.location, 3);
      }),
    );
    if (result.every(([, ok]) => ok)) {
      const list = result.map(([res]) => {
        return {
          ...res?.daily[0],
          location: res?.location,
          name: locations.find((item) => item.location === res?.location)?.name,
          icon: isDayTime ? res?.daily[0].iconDay : res?.daily[0].iconNight,
        };
      });
      setList(list as IWeatherForecastWithId[]);
    }
  };

  useEffect(() => {
    getForecastByLocations();
  }, []);

  return (
    <div className={cx('city-list')}>
      {list.map((item) => (
        <CityItem key={item.location} {...item} />
      ))}
    </div>
  );
};

export default CityList;
