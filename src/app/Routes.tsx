import {FC, memo} from 'react';
import {Navigate, Route, Routes as ReactRoutes} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from '@/shared/constants';
import {useAuth} from '@/features/auth';
import Login from '@/pages/Login';
import Main from '@/pages/Main';

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
