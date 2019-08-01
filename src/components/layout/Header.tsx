import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

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
        <IconButton>
          <Icon color='action'>help_outline</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;