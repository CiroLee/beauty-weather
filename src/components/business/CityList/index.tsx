import React, { FC, useEffect, useState } from 'react';
import { getWeatherForecast } from '@/services/weather-service';
import Icon from '@/components/Icon';
import { useCityStore, useDayTimeStore } from '@/store/weather';
import { IWeatherForecast } from '@/types/weather';
import { iconToBgMap } from '@/config/weather.config';
import style from './style/index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

interface CityItemProps {
  location: string;
  name: string;
  icon?: string;
  tempMin?: string;
  tempMax?: string;
  onClick?: (location: string, name: string) => void;
}
interface IWeatherForecastWithId extends IWeatherForecast {
  location: string;
  name: string;
  icon?: string;
}

const CityList: FC<Pick<CityItemProps, 'onClick'>> = (props: Pick<CityItemProps, 'onClick'>) => {
  const [list, setList] = useState<IWeatherForecastWithId[]>([]);
  const { locations } = useCityStore((state) => state);
  const { isDayTime } = useDayTimeStore((state) => state);
  const transIconCode = (icon?: string): string => {
    const item = iconToBgMap.find((item) => Number(icon) >= item.range[0] && Number(icon) <= item.range[1]);
    if (item) {
      return `bg-${item.text}`;
    }
    return '';
  };
  // 长按事件
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.onClick) {
      const dataset = (event.target as HTMLDivElement).dataset;
      props.onClick(dataset.location as string, dataset.name as string);
    }
  };

  // 组件内，读取local的列表，拉取天气信息
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
        <div
          key={item.location}
          className={cx('city-item', transIconCode(item.icon))}
          onClick={(event) => handleOnClick(event)}
          data-location={item.location}
          data-name={item.name}>
          <div className={cx('city-item__name')}>{item.name}</div>
          <div className={cx('city-item__brief')}>
            <Icon type="qi" name={`${item.icon}-fill`} size="30px" color="#fff" />
            <p>{`${item.tempMin}°C~${item.tempMax}°C`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CityList;
