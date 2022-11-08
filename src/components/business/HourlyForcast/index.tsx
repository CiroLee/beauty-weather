import { FC } from 'react';
import Icon from '@/components/Icon';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
const cx = classNames.bind(style);

interface HourlyOption {
  icon: string;
  text: string;
  temp: string;
  fxTime: string; // 预报时间
}
interface HourlyForcastOptions {
  options: HourlyOption[];
  className?: string;
}
const HourlyItem: FC<HourlyOption> = (props: HourlyOption) => {
  return (
    <div className={cx('hourly-item')}>
      <Icon className={cx('hourly-item__icon')} type="qi" name={`${props.icon}-fill`} color="#fff" size="20px" />
      <p className={cx('hourly-item__sub')}>{props.text}</p>
      <p className={cx('hourly-item__temp', 'num-font')}>{props.temp}°C</p>
      <p className={cx('hourly-item__sub', 'num-font')}>{new Date(props.fxTime).getHours()}:00</p>
    </div>
  );
};
const HourlyForcast: FC<HourlyForcastOptions> = (props: HourlyForcastOptions) => {
  return (
    <div className={cx('hourly', props.className)}>
      {props.options.map((item) => (
        <HourlyItem icon={item.icon} text={item.text} temp={item.temp} fxTime={item.fxTime} key={item.fxTime} />
      ))}
    </div>
  );
};

export default HourlyForcast;
