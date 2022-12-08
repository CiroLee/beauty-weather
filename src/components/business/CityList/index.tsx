import React, { FC, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import Loading from '@/components/Loading';
import { useClickAway } from 'react-use';
import { getWeatherForecast } from '@/services/weather-service';
import { useCityStore, useDayTimeStore } from '@/store/weather';
import { IWeatherForecast } from '@/types/weather';
import { iconToBgMap } from '@/config/weather.config';
import style from './style/index.module.scss';
import classNames from 'classnames/bind';
import { MAX_CITY_NUN } from '@/utils/constants';

const cx = classNames.bind(style);
const loading = new Loading();

interface CityListProps {
  onClick?: (location: string, name: string) => void;
}
interface IWeatherForecastWithId extends IWeatherForecast {
  location: string;
  name: string;
  icon?: string;
}

interface CityItemProps {
  location: string;
  name?: string;
  icon?: string;
  tempMin?: string;
  tempMax?: string;
  onClick: (location: string, name: string) => void;
}

const CityItem: FC<CityItemProps> = (props: CityItemProps) => {
  const [clickedItem, setClickItem] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  // 点击
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const dataset = (event.target as HTMLDivElement).dataset;
    setClickItem(dataset.location as string);
    if (props.onClick) {
      setClickItem(dataset.location as string);
      props.onClick(dataset.location as string, dataset.name as string);
    }
  };

  useClickAway(
    ref,
    () => {
      setClickItem('');
    },
    ['click'],
  );
  const transIconCode = (icon?: string): string => {
    const config = iconToBgMap.find((item) => Number(icon) >= item.range[0] && Number(icon) <= item.range[1]);
    if (config) {
      return `bg-${config.text}`;
    }
    return '';
  };
  return (
    <div
      key={props.location}
      ref={ref}
      className={cx('city-item', transIconCode(props.icon), { 'city-item--active': clickedItem === props.location })}
      onClick={(event) => handleOnClick(event)}
      data-location={props.location}
      data-name={props.name}>
      <div className={cx('city-item__name')}>{props.name}</div>
      <div className={cx('city-item__brief')}>
        <Icon type="qi" name={`${props.icon}-fill`} size="30px" color="#fff" />
        <p>{`${props.tempMin}°C~${props.tempMax}°C`}</p>
      </div>
    </div>
  );
};

const CityList: FC<CityListProps> = (props: CityListProps) => {
  const [list, setList] = useState<IWeatherForecastWithId[]>([]);
  const { locations } = useCityStore((state) => state);
  const { isDayTime } = useDayTimeStore((state) => state);

  // 点击
  const handleOnClick = (location: string, name: string) => {
    if (props.onClick) {
      props.onClick(location, name);
    }
  };

  // 组件内，读取local的列表，拉取天气信息
  const getForecastByLocations = async () => {
    // loading.start();
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
    loading.stop();
  };

  useEffect(() => {
    if (locations.length) {
      getForecastByLocations();
    }
  }, [locations]);

  return (
    <div className={cx('city-list')}>
      <div className={cx('city-list__num')}>{`${list.length}/${MAX_CITY_NUN}`}</div>
      {list.map((item) => (
        <CityItem
          key={item.location}
          location={item.location}
          name={item.name}
          icon={item.icon}
          tempMax={item.tempMax}
          tempMin={item.tempMin}
          onClick={handleOnClick}
        />
      ))}
    </div>
  );
};

export default CityList;
