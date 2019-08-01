import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MUIThemeProvider} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { styledTheme, muiTheme } from './theme';

import Layout from './components/layout/Layout';
import Router from './Router';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline />
        <StyledThemeProvider theme={styledTheme}>
          <Layout>
            <Router />
          </Layout>
        </StyledThemeProvider>
      </MUIThemeProvider>
    </React.Fragment>
  );
}

export default App;
