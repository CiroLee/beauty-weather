import { FC, useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import Icon from '@/components/Icon';
import { iconToBgMap } from '@/config/weather.config';
import { useCityStore } from '@/store/weather';
import { getWeatherNow } from '@/services/weather-service';

const cx = classNames.bind(style);
interface WeatherPreviewModalProps {
  location: string;
  name: string;
  onShow?: (show: boolean) => void;
}
const WeatherPreviewModal: FC<WeatherPreviewModalProps> = (props: WeatherPreviewModalProps) => {
  const [bg, setBg] = useState<string | null>(null);
  const [icon, setIcon] = useState('');
  const [temp, setTemp] = useState('');
  const { addLocation } = useCityStore((state) => state);
  const transIconCode = (icon?: string): void => {
    const item = iconToBgMap.find((item) => Number(icon) >= item.range[0] && Number(icon) <= item.range[1]);
    if (item) {
      setBg(`bg-${item?.text}`);
    }
  };

  const fetchWeather = async (location: string) => {
    const [result, ok] = await getWeatherNow(location);
    if (ok && result) {
      setIcon(result.now.icon);
      setTemp(result.now.temp);
    }
  };

  const closeModal = () => {
    if (props.onShow) {
      props.onShow(false);
    }
  };

  const addCity = (location: string, name: string) => {
    addLocation(location, name);
    closeModal();
  };

  useAsync(async () => {
    fetchWeather(props.location);
  }, []);
  useEffect(() => {
    transIconCode(icon);
  }, [icon]);

  return (
    <div className={cx('preview-modal')}>
      <div className={cx('preview-modal__content')}>
        <div className={cx('preview-modal__operate-btn')}>
          <div className={cx('button', 'add')} onClick={() => addCity(props.location, props.name)}>
            <Icon type="ri" name="add-line" />
            <span>添加</span>
          </div>
          <div className={cx('button', 'close')} onClick={closeModal}>
            <Icon type="ri" name="close-circle-line" />
            <span>取消</span>
          </div>
        </div>
        <div className={cx('preview-modal__inner', bg)}>
          <div className={cx('preview-modal__city')}>{props.name}</div>
          <div className={cx('preview-modal__info')}>
            <Icon type="qi" name={`${icon || ''}-fill`} size="80px" color="#fff" />
            <div className={cx('preview-modal__temp')}>{temp}°C</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPreviewModal;
