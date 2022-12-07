import React, { FC, useRef } from 'react';
import Icon from '@/components/Icon';
import { useDayTimeStore } from '@/store/weather';
import classNames from 'classnames/bind';
import { isSameDay } from 'date-fns';
import { week } from 'mew-utils';
import style from './style/index.module.scss';
import { IWeatherForecast } from '@/types/weather';

const cx = classNames.bind(style);

interface IForecastProps {
  options: IWeatherForecast[];
}
interface TempBarProps {
  tempMin?: number;
  tempMax?: number;
}
const TempBar = (props: TempBarProps) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const { tempMin = 0, tempMax = 0 } = props;
  const threshold = 50;
  let tempRange: 'negative' | 'positive' | '' = '';
  function renderInnerBar() {
    let _offsetLeft = 0;
    let _offsetRight = 0;
    if (tempMin < 0 && tempMax < 0) {
      tempRange = 'negative';
    } else if (tempMin > 0 && tempMax > 0) {
      tempRange = 'positive';
    }
    if (barRef.current) {
      const parentLen = barRef.current.offsetWidth;
      // 缩放到60%， 100%的话，太小了...
      _offsetLeft = ((0.5 * parentLen * (1 + tempMin / threshold)) / parentLen) * 60;
      _offsetRight = ((0.5 * parentLen * (1 - tempMax / threshold)) / parentLen) * 60;
    }
    return {
      '--offset-left': `${_offsetLeft}%`,
      '--offset-right': `${_offsetRight}%`,
    } as React.CSSProperties;
  }
  return (
    <div ref={barRef} className={cx('forecast-list__item-temp-bar')}>
      <div style={renderInnerBar()} className={cx('forecast-list__item-temp-bar--inner', tempRange)}></div>
    </div>
  );
};
const ForecastList: FC<IForecastProps> = (props: IForecastProps) => {
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
            <TempBar tempMin={Number(item.tempMin)} tempMax={Number(item.tempMax)} />
            <span>{item.tempMax}°C</span>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ForecastList;
