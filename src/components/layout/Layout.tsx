import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import Header from './Header';

const RelativeContainer = styled(Container)`
  && {
    position: relative;
  }
`;

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Header />
      <RelativeContainer>
        {children}
      </RelativeContainer>
    </React.Fragment>
  )
};

export default Layout;