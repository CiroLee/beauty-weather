import { FC } from 'react';
import Icon from '@/components/Icon';
import { useDayTimeStore } from '@/store/weather';
import classNames from 'classnames/bind';
import { isSameDay } from 'date-fns';
import { week } from 'mew-utils';
import style from './style/index.module.scss';
import { IWeatherForecast } from '@/types/weather';
const cx = classNames.bind(style);

interface IForcastProps {
  options: IWeatherForecast[];
}
const ForcastList: FC<IForcastProps> = (props: IForcastProps) => {
  const { isDayTime } = useDayTimeStore((state) => state);
  function getWeek(date: string): string {
    const _date = date.replaceAll('-', '/');
    if (isSameDay(Date.now(), new Date(_date))) {
      return '今天';
    }
    return `周${week(_date)}`;
  }

  return (
    <div className={cx('forecast-list')}>
      {props.options.map((item) => (
        <li key={item.fxDate} className={cx('forecast-list__item')}>
          <div className={cx('forecast-list__item-date')}>
            <p> {getWeek(item.fxDate)}</p>
            <p>{item.fxDate.slice(5)}</p>
          </div>
          <Icon
            type="qi"
            name={isDayTime ? `${item.iconDay}-fill` : `${item.iconNight}-fill`}
            size="24px"
            color="#1a8cff"
          />
          <div className={cx('forecast-list__item-temp')}>
            <span>{item.tempMin}°C</span>
            <div className={cx('forecast-list__item-temp-bar')}></div>
            <span>{item.tempMax}°C</span>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ForcastList;
