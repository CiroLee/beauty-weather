import React, { FC } from 'react';
import cn from 'classnames';
import { px2vw } from '@/utils/utils';
import './style/index.scss';
interface IConProps {
  type: 'ri' | 'qi';
  name: string;
  size?: string;
  color?: string;
  gradient?: string;
  style?: React.CSSProperties;
  className?: string;
  autoVw?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}
const Icon: FC<IConProps> = (props: IConProps) => {
  const size = props.size ?? 'inherit';
  const color = props.color ?? 'inherit';
  const autoVw = props.autoVw ?? true;
  const _style = props.style || {};
  const styleVars = {
    '--icon-size': autoVw ? px2vw(size, 375) : size,
    '--icon-color': color,
    '--icon-gradient': props.gradient ? props.gradient : '',
    ..._style,
  } as React.CSSProperties;
  const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (props.onClick) {
      (props.onClick as React.MouseEventHandler<HTMLElement>)?.(event);
    }
  };
  return (
    <i
      onClick={handleOnClick}
      style={styleVars}
      className={cn('icon', props.className, `${props.type}-${props.name}`, {
        'use-gradient': !!props.gradient,
      })}></i>
  );
};

export default Icon;
