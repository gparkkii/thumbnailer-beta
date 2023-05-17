import React from 'react';
import { ThemeProvider } from 'styled-components';
import BaseLayout from './layout/BaseLayout';
import Main from './pages/Main';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BaseLayout>
        <Main />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default App;
