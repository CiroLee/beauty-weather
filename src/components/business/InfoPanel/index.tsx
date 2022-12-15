import React, { FC } from 'react';
import Icon from '@/components/Icon';
import classNames from 'classnames/bind';
import { tempMap, HumidityMap, InfoConfig } from '@/config/weather.config';
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
  value?: string;
  panelClassName?: string;
}
// 体感温度
export const BodyTempPanel: FC<PanelItem> = (props: PanelItem) => {
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
        <div className={cx('panel-main__content', 'num-font')}>{props.value}°C</div>
      </div>
      <div className={cx('panel-rest')}>{props.value && extractTips(props.value, tempMap)}</div>
    </Panel>
  );
};

// 湿度
export const HumidityPanel: FC<PanelItem> = (props: PanelItem) => {
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
        <div className={cx('panel-main__content', 'num-font')}>{props.value}%</div>
      </div>
      <div className={cx('panel-rest')}>{props.value && extractTips(props.value, HumidityMap)}</div>
    </Panel>
  );
};
interface IAirQualityPanel extends PanelItem {
  category?: string;
}

export const AirQualityPanel: FC<IAirQualityPanel> = (props: IAirQualityPanel) => {
  function calcPercent(value?: number) {
    if (!value) {
      return '0%';
    }
    if (value > 300) {
      return '82%';
    }
    return `${Math.round(value / 3)}%`;
  }
  return (
    <Panel panelClassName={props.panelClassName}>
      <div className={cx('panel-main')}>
        <div className={cx('panel-main__head')}>
          <Icon
            type="ri"
            name="hearts-line"
            gradient="linear-gradient(180deg, rgba(222, 4, 4, 1) 0%, rgba(247, 156, 52, 1) 98.93%)"
            size="18px"
          />
          <span>空气质量</span>
        </div>
        <div className={cx('panel-main__content', 'num-font', 'ellipsis-one')}>
          <span>{props.value}</span>
          <span className={cx('panel-main__sub-text')}>{props.category}</span>
        </div>
      </div>
      <div className={cx('panel-rest')}>
        <div className={cx('panel-rest__quality-bar')}>
          <Icon
            type="ri"
            name="drop-fill"
            size="12px"
            style={{ top: calcPercent(Number(props.value)) }}
            className={cx('panel-rest__quality-pointer')}
          />
        </div>
      </div>
    </Panel>
  );
};

// 风力
interface WindyPanelProps extends PanelItem {
  winDir?: string;
  windSpeed?: string;
  wind360?: string;
}
export const WindyPanel: FC<WindyPanelProps> = (props) => {
  return (
    <Panel panelClassName={props.panelClassName}>
      <div className={cx('panel-main')}>
        <div className={cx('panel-main__head')}>
          <Icon
            type="ri"
            name="windy-line"
            gradient="linear-gradient(90deg, rgba(20, 114, 168, 1) 0%, rgba(65, 154, 232, 1) 78.3%"
            size="18px"
          />
          <span>风</span>
        </div>
        <div className={cx('panel-main__content')}>
          <span className="'number-font'">{props.value}级</span>
          <span className={cx('panel-main__sub-text')}>/{props.winDir}</span>
        </div>
      </div>
      <div className={cx('panel-rest')}>
        <div className={cx('panel-rest__wind')}>
          <i
            className={cx('panel-rest__direction-icon')}
            style={{ transform: `rotate(${Number(props.wind360) + 180}deg)` }}></i>
          <p>{props.windSpeed}km/h</p>
        </div>
      </div>
    </Panel>
  );
};
