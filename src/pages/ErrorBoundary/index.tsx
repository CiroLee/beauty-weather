import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import style from './style/index.module.scss';

const NotFound = () => (
  <div className={style['error-404']}>
    <div className={style.svg}></div>
    <p>page not found</p>
    <Link to="/">go home</Link>
  </div>
);
const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
    return (
      <div className={style.error}>
        <div>{error.status}</div>
        <div>{error.data.sory}</div>
      </div>
    );
  }
  throw error;
};

export default ErrorBoundary;
