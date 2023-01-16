import { FC, memo } from 'react';
import { useWeatherIndicesStore, useForecastStore } from '@/store/weather';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import Icon from '@/components/Icon';

const cx = classNames.bind(style);
const IndicesPanel: FC = () => {
  const { indices } = useWeatherIndicesStore((state) => state);
  const { daily } = useForecastStore((state) => state);
  function indicesData(type: string) {
    return indices.find((item) => item.type === type);
  }

  return (
    <div className={cx('indices')}>
      <div className={cx('indices__item')}>
        <Icon
          type="ri"
          name="leaf-fill"
          size="32px"
          gradient="linear-gradient(180deg, rgba(71, 227, 9, 1) 0%, rgba(40, 145, 4, 1) 100%)"
        />
        <div className={cx('indices__item-text')}>
          <h4>舒适度</h4>
          <p>{indicesData('8')?.category}</p>
        </div>
      </div>
      <div className={cx('indices__item')}>
        <Icon
          type="ri"
          name="sun-fill"
          size="32px"
          gradient="linear-gradient(0, rgb(249 181 45) 0%, rgb(237 133 31) 80%)"
        />
        <div className={cx('indices__item-text')}>
          <h4>日出/日落</h4>
          <p>
            {daily[0]?.sunrise}/{daily[0]?.sunset}
          </p>
        </div>
      </div>
      <div className={cx('indices__item')}>
        <Icon
          type="ri"
          name="t-shirt-fill"
          size="32px"
          gradient="linear-gradient(180deg, #1DC4C2 0.18%, #65BAF0 100%)"
        />
        <div className={cx('indices__item-text')}>
          <h4>穿衣指数</h4>
          <p>{indicesData('3')?.category}</p>
        </div>
      </div>
      <div className={cx('indices__item')}>
        <Icon
          type="ri"
          name="capsule-fill"
          size="32px"
          gradient="linear-gradient(180deg, rgb(240, 137, 185) 0%, rgb(224, 31, 86) 100%)"
        />
        <div className={cx('indices__item-text')}>
          <h4>感冒指数</h4>
          <p>{indicesData('9')?.category}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(IndicesPanel);
