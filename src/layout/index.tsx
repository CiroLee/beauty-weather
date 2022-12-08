import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useMedia } from 'react-use';

const Layout: FC = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)');
  // 监听深色模式变化
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div>
      <Outlet />
      <a href="https://www.qweather.com" className="power-by" target="_blank" rel="noreferrer">
        power by Qweather
      </a>
    </div>
  );
};

export default Layout;
