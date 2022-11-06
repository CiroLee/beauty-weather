import { FC } from 'react';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
const cx = classNames.bind(style);
import Icon from '../Icon';
const BriefWeather: FC = () => {
  return (
    <div className={cx('brief-weather')}>
      <div className={cx('brief-weather__data')}>
        <h2 className={cx('brief-weather--location')}>北京</h2>
        <Icon type="qi" name="100-fill" size="120px" color="#fff" />
        <p className={cx('name')}>晴</p>
        <p className={cx('temprature')}>12~22°C</p>
      </div>
    </div>
  );
};

export default BriefWeather;
