import { FC } from 'react';
import classnames from 'classnames/bind';
import style from './style/index.module.scss';
import Icon from '@/components/Icon';
import { getSeverityColor } from '@/utils/utils';
import { useCityStore, useWeatherWarnStore } from '@/store/weather';

const cx = classnames.bind(style);

interface WarnSymbolProps {
  color?: string;
  icon?: string;
  name?: string;
}

const WarnSymbol: FC<WarnSymbolProps> = (props: WarnSymbolProps) => {
  return (
    <div className={cx('warn-symbol')}>
      <div className={cx('warn-symbol__icon-box')}>
        <Icon type="qi" name={props.icon as string} size="28px" color={getSeverityColor(props.color)} />
      </div>
      <div style={{ backgroundColor: getSeverityColor(props.color) }} className={cx('warn-symbol__desc')}>
        <span>{props.name}</span>
      </div>
    </div>
  );
};

interface IWeatherWarnModalProps {
  city: string;
  id: string;
  onClose: () => void;
}

const WeatherWarnModal: FC<IWeatherWarnModalProps> = (props: IWeatherWarnModalProps) => {
  const { getDisasterById } = useWeatherWarnStore((state) => state);
  const { current } = useCityStore((state) => state);
  return (
    <div className={cx('warn')}>
      <div className={cx('warn__modal')}>
        <Icon
          className={cx('warn__close')}
          type="ri"
          name="close-circle-line"
          size="30px"
          color="#fff"
          onClick={props.onClose}
        />
        <h4>{props.city}</h4>
        <div className={cx('warn__brief')}>
          <WarnSymbol
            color={getDisasterById(props.id)?.severityColor}
            icon={getDisasterById(props.id)?.type}
            name={getDisasterById(props.id)?.typeName}
          />
          <div className={cx('warn__brief-info')}>
            <p>{getDisasterById(props.id)?.title}</p>
            <p className={cx('warn__brief-info--sub')}>
              发布时间: {new Date(getDisasterById(props.id)?.pubTime as string).toLocaleString().replace(/\//g, '-')}
            </p>
          </div>
        </div>
        <div className={cx('warn__detail')}>{getDisasterById(props.id)?.text}</div>
      </div>
    </div>
  );
};

export default WeatherWarnModal;
