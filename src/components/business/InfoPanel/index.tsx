import React, { FC } from 'react';
import Icon from '@/components/Icon';
import classNames from 'classnames/bind';
import { tempMap, HumidityMap, InfoConfig } from './config';
import style from './style/index.module.scss';
const cx = classNames.bind(style);

interface PanelProps {
  panelClassName?: string;
  children?: React.ReactNode;
}

// panel 父组件模板
const Panel: FC<PanelProps> = (props: PanelProps) => {
  return <div className={cx('panel', props.panelClassName)}>{props.children}</div>;
};

const extractTips = (text: string, config: InfoConfig[]) => {
  const temp = Number(text);
  const option = config.find((item) => temp >= item.range[0] && temp <= item.range[1]);
  if (option) {
    const textArr = option.text.split(',');
    return (
      <div className={cx('panel-rest__tips')}>
        {textArr[0] && <p>{textArr[0]}</p>}
        {textArr[1] && <p>{textArr[1]}</p>}
      </div>
    );
  }
  return null;
};

interface PanelItem {
  text?: string;
  panelClassName?: string;
}
// 体感温度
export const BodyTempPanel: FC<PanelItem> = (props: PanelItem) => {
  console.log(props.text);
  return (
    <Panel panelClassName={props.panelClassName}>
      <div className={cx('panel-main')}>
        <div className={cx('panel-main__head')}>
          <Icon
            type="ri"
            name="temp-cold-line"
            gradient="linear-gradient(180deg, rgba(250, 214, 10, 0.89) 9.45%, rgba(97, 240, 250, 1) 100%)"
            size="18px"
          />
          <span>体感温度</span>
        </div>
        <div className={cx('panel-main__content', 'num-font')}>{props.text}°C</div>
      </div>
      <div className={cx('panel-rest')}>{props.text && extractTips(props.text, tempMap)}</div>
    </Panel>
  );
};

// 湿度
export const HumidityPanel: FC<PanelItem> = (props: PanelItem) => {
  console.log(props.text);

  return (
    <Panel panelClassName={props.panelClassName}>
      <div className={cx('panel-main')}>
        <div className={cx('panel-main__head')}>
          <Icon
            type="ri"
            name="contrast-drop-line"
            gradient="linear-gradient(90deg, rgba(119, 203, 242, 1) 0%, rgba(51, 114, 196, 1) 100%)"
            size="18px"
          />
          <span>湿度</span>
        </div>
        <div className={cx('panel-main__content', 'num-font')}>{props.text}%</div>
      </div>
      <div className={cx('panel-rest')}>{props.text && extractTips(props.text, HumidityMap)}</div>
    </Panel>
  );
};
interface ISunsetPanelProps extends Omit<PanelItem, 'text'> {
  sunrize: string;
  sunset: string;
}
export const SunsetPanel: FC<ISunsetPanelProps> = (props: ISunsetPanelProps) => {
  function isDayTime(sunrize?: string, sunset?: string): { time: string; isDay: boolean } {
    const currentTime = Date.now();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const sunrizeTime = new Date(`${year}/${month}/${day} ${sunrize}`).getTime();
    const sunsetTime = new Date(`${year}/${month}/${day} ${sunset}`).getTime();

    // 白天， 返回日落时间
    if (currentTime >= sunrizeTime && currentTime <= sunsetTime) {
      return {
        time: sunset || '',
        isDay: true,
      };
    }
    return {
      time: sunrize || '',
      isDay: false,
    };
  }

  return (
    <Panel panelClassName={props.panelClassName}>
      <div className={cx('panel-main')}>
        <div className={cx('panel-main__head')}>
          <Icon
            type="ri"
            name="haze-line"
            gradient="linear-gradient(180deg, rgba(255, 101, 5, 1) 0%, rgba(255, 216, 77, 1) 100%)"
            size="18px"
          />
          <span>{isDayTime(props.sunrize, props.sunset).isDay ? '日落' : '日出'}</span>
        </div>
        <div className={cx('panel-main__content', 'num-font')}>{isDayTime(props.sunrize, props.sunset).time}</div>
      </div>
      <div className={cx('panel-rest')}>
        {isDayTime(props.sunrize, props.sunset).isDay ? (
          <Icon type="ri" name="sun-fill" size="28px" className={cx('panel-rest__icon', 'sun')} />
        ) : (
          <Icon type="ri" name="moon-fill" size="28px" className={cx('panel-rest__icon', 'moon')} />
        )}
      </div>
    </Panel>
  );
};
