import React, { FC } from 'react';
import Icon from '@/components/Icon';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
const cx = classNames.bind(style);

interface PanelProps {
  panelClassName?: string;
  children?: React.ReactNode;
}
const Panel: FC<PanelProps> = (props: PanelProps) => {
  return <div className={cx('panel', props.panelClassName)}>{props.children}</div>;
};

interface PanelItem {
  text: string;
  panelClassName?: string;
}

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
        <div className={cx('panel-main__content')}>22°</div>
      </div>
      <div className={cx('panel-rest')}>
        <span className={cx('panel-rest__tips')}>温度适宜温度适宜</span>
      </div>
    </Panel>
  );
};
