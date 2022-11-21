import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import './style/index.scss';
import Icon from '@/components/Icon';

interface ActionSheetProps {
  show: boolean;
  title?: string;
  actions: {
    id: string;
    text: string;
    icon?: string;
  }[];
  toggleActionSheet: (show: boolean) => void;
  selected: (id: string) => void;
}

const ActionSheet: FC<ActionSheetProps> = (props: ActionSheetProps) => {
  const [transY, setTransY] = useState(0);
  const [isOut, setIsOut] = useState(false);
  const actionSheetRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLLIElement | null>(null);
  const handleOnClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const parent = target.parentNode as HTMLElement;
    if (Array.from(target.classList).includes('in') || (parent && Array.from(parent.classList).includes('in'))) {
      setIsOut(true);
      if (target.className === 'action-sheet__sheet-item') {
        props.selected(target.dataset.id as string);
      }
    }
  };
  // 组件挂载时计算actionsheet的高度
  useEffect(() => {
    setTransY((titleRef.current?.clientHeight as number) * (props.actions.length + 1));
  }, []);
  // 动画结束后再隐藏
  useEffect(() => {
    if (isOut) {
      const animationEndHandler = () => {
        setIsOut(false);
        props.toggleActionSheet(false);
      };
      actionSheetRef.current?.addEventListener('animationend', animationEndHandler);
      return () => {
        actionSheetRef.current?.removeEventListener('animationend', animationEndHandler);
      };
    }
  }, [isOut]);

  return (
    <div
      style={{ '--trans-y': `${transY}px`, visibility: props.show ? 'visible' : 'hidden' } as React.CSSProperties}
      ref={actionSheetRef}
      className={cx('action-sheet')}
      onClick={(event) => handleOnClick(event)}>
      <div className={cx('action-sheet__mask', { out: isOut, in: props.show })}></div>
      <div className={cx('action-sheet__sheet', { out: isOut, in: props.show })}>
        <li className={cx('action-sheet__sheet-title')} ref={titleRef}>
          {props.title || '提示'}
        </li>
        {props.actions.map((item) => (
          <li key={item.id} className={cx('action-sheet__sheet-item')} data-id={item.id}>
            {item.icon ? <Icon type="ri" name={item.icon} size="20px" /> : null}
            <span>{item.text}</span>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ActionSheet;
