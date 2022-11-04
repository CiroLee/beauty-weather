import { FC } from 'react';
import BriefWeather from '@/components/BriefWeather';
import style from './styles/index.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
const Home: FC = () => {
  return (
    <div className={cx('hone')}>
      <BriefWeather />
    </div>
  );
};

export default Home;
