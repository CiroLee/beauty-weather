import { FC } from 'react';
import cn from 'classnames';
import './style/index.scss';
interface IConProps {
  type: 'ri' | 'qi';
  name: string;
  size?: string;
  color?: string;
  gradient?: string;
  style?: string;
  className?: string;
}
const Icon: FC<IConProps> = (props: IConProps) => {
  const size = props.size ?? 'inherit';
  const color = props.color ?? '#000';
  const styleVars = {
    '--icon-size': size,
    '--icon-color': color,
    '--icon-gradient': props.gradient ? props.gradient : '',
  } as React.CSSProperties;
  return (
    <i
      style={styleVars}
      className={cn('icon', props.className, `${props.type}-${props.name}`, {
        'use-gradient': !!props.gradient,
      })}></i>
  );
};

export default Icon;
