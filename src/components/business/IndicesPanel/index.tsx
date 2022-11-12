import { FC } from 'react';
import { useWeatherIndices } from '@/store/weather';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import Icon from '@/components/Icon';
const cx = classNames.bind(style);
const IndicesPanel: FC = () => {
  const { indices } = useWeatherIndices((state) => state);
  function indicesData(type: string) {
    return indices.find((item) => item.type === type);
  }

  console.log(indices);

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
          name="umbrella-fill"
          size="32px"
          gradient="linear-gradient(45deg, rgb(68, 26, 196) 0%, rgb(173, 125, 255) 80%)"
        />
        <div className={cx('indices__item-text')}>
          <h4>紫外线指数</h4>
          <p>{indicesData('5')?.category}</p>
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

export default IndicesPanel;
