import React from 'react';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="thumbnailer">
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
