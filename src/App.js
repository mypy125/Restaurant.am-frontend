import React, { Component } from 'react';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <h1 className="text-3x1 font-bold underline">
          Hello World!
        </h1>
      </ThemeProvider>
     
    );
  }
}

export default App;
