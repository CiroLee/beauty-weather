import { FC } from 'react';
import classnames from 'classnames/bind';
import style from './style/index.module.scss';
import Icon from '@/components/Icon';

const cx = classnames.bind(style);

const WarnSymbol = () => {
  return (
    <div className={cx('warn-symbol')}>
      <div className={cx('warn-symbol__icon-box')}>
        <Icon type="qi" name="151-fill" size="28px" color="yellow" />
      </div>
      <div style={{ backgroundColor: 'yellow' }} className={cx('warn-symbol__desc')}>
        <span>大风</span>
      </div>
    </div>
  );
};

const WeatherWarnModal: FC = () => {
  return (
    <div className={cx('warn')}>
      <div className={cx('warn__modal')}>
        <h4>北京市</h4>
        <div className={cx('warn__brief')}>
          <WarnSymbol />
          <div className={cx('warn__brief-info')}>
            <p>北京市气象台2021年10月09日15时40分发布大风蓝色预警信号 </p>
            <p className={cx('warn__brief-info--sub')}>发布于2022年12月12日</p>
          </div>
        </div>
        <div className={cx('warn__detail')}>
          厦门市气象台2022年12月05日21时42分继续发布大风黄色预警信号
          ：受冷空气影响，未来12小时思明区、湖里区、集美区、海沧区及海上风力持续较大，预计厦门内海及各大桥、高海拔山区东北风最大可达5～6级、阵风7～8级；崇武到东山沿海可达6～7级、阵风8～9级；台湾海峡南部可达7～8级、阵风9～10级。请注意防范。同安区、翔安区请关注属地的预警信号发布情况。
        </div>
      </div>
    </div>
  );
};

export default WeatherWarnModal;
