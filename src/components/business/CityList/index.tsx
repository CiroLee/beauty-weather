import React, { FC, useEffect, useState } from 'react';
import { useLongPress } from 'react-use';
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
}

const longPressOptions = {
  isPreventDefault: true,
  delay: 300,
};
const CityItem: FC<CityItemProps> = (props: CityItemProps) => {
  const [bg, setBg] = useState<string | null>(null);
  const transIconCode = (icon?: string): void => {
    const item = iconToBgMap.find((item) => Number(icon) >= item.range[0] && Number(icon) <= item.range[1]);
    if (item) {
      setBg(`bg-${item?.text}`);
    }
  };
  const longPressHandler = (event: TouchEvent | MouseEvent) => {
    console.log((event.target as HTMLDivElement).dataset);
    // console.log((event.target);
  };
  const longPressEvent = useLongPress(longPressHandler, longPressOptions);

  useEffect(() => {
    if (props?.icon) {
      transIconCode(props.icon);
    }
  }, [props?.icon]);
  return (
    <div className={cx('city-item', bg)} {...longPressEvent} data-location={props.location}>
      <div className={cx('city-item__name')}>{props.name}</div>
      <div className={cx('city-item__brief')}>
        <Icon type="qi" name={`${props.icon}-fill`} size="30px" color="#fff" />
        <p>{`${props.tempMin}°C~${props.tempMax}°C`}</p>
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
