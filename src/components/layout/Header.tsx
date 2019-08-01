import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';

import ForkCallToAction from '../ForkCallToAction';

const HeaderTitle = styled(Typography)`
  && {
    flex: 1;
  }
`;

const HeaderTitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Header = () => {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <HeaderTitle variant='h6'>
          <HeaderTitleLink to='/'>Image to Slack Theme</HeaderTitleLink>
        </HeaderTitle>
        <ForkCallToAction />
      </Toolbar>
    </AppBar>
  );
};

export default Header;