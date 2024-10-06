import React, { Component } from 'react';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';
import HomePage from './customer/pages/homePage/HomePage';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <HomePage/>
      </ThemeProvider>
     
    );
  }
}

export default App;
