import {memo, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import AppGlobalStyles from './GlobalStyles';
import AppRoutes from '@/app/Routes';
import {AuthProvider} from '@/features/auth';
import {isProduction} from '@/shared/utils';

const theme = createTheme();

const vitePreloadErrorEvent = 'vite:preloadError';
const vitePreloadErrorHandler = () => {
  window.location.reload();
};

const App = () => {
  // Need to apply the following useEffect only for production
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    if (isProduction) {
      window.addEventListener(vitePreloadErrorEvent, vitePreloadErrorHandler);

      return () => {
        window.removeEventListener(
          vitePreloadErrorEvent,
          vitePreloadErrorHandler,
        );
      };
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <AppGlobalStyles />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default memo(App);
