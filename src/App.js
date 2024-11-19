import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './customer/state/authentication/Action';
import { findCart } from './customer/state/cart/Action';
import { getResaurantByUserId } from './customer/state/restaurant/Action';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';
import Routers from './routers/Routers';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
};

export default App;
