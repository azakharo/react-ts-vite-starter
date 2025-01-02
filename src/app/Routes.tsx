import {FC, memo} from 'react';
import {Navigate, Route, Routes as ReactRoutes} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from 'src/constants/routes';
import useAuth from 'src/hooks/useAuth';
import Login from 'src/pages/Login';
import Main from 'src/pages/Main';

const Routes: FC = () => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return (
      <ReactRoutes>
        <Route path={ROUTE__LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={ROUTE__LOGIN} replace />} />
      </ReactRoutes>
    );
  }

  return (
    <ReactRoutes>
      <Route path={ROUTE__MAIN} element={<Main />} />
      <Route path="*" element={<Navigate to={ROUTE__MAIN} replace />} />
    </ReactRoutes>
  );
};

export default memo(Routes);
