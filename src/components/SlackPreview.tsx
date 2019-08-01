import React from 'react';
import styled from 'styled-components';

import { SlackPalette } from '../helpers/types';

const SlackPreviewWrapper = styled.div`
  display: flex;

  position: relative;

  width: 100vw;

  font-family: Lato;
  background-color: ${props => props.theme.lightBlue};

  @media only screen and (min-width: 932px) {
    position: absolute;
    top: 0;
    left: 0px;

    width: 250px;
    height: calc(100vh - 64px);
  }
`;

const SlackSidebarWrapper = styled.div`
  height: 400px;
  width: 250px;

  @media only screen and (min-width: 932px) {
    height: 100%;
  }
`;

const SidebarItem = styled.div<{ bgColor: string, textColor: string }>`
  color: ${props => props.textColor};
  background-color: ${props => props.bgColor};
`;

type Props = {
  palette: SlackPalette;
}

const SlackPreview = ({ palette }: Props) => {
  return (
    <SlackPreviewWrapper>
      <SlackSidebarWrapper style={{ backgroundColor: palette.columnBackground }}>
        <SidebarItem bgColor={palette.hoverItem} textColor={palette.activeTextItem}>
          a
        </SidebarItem>
        <SidebarItem bgColor={palette.columnBackground} textColor={palette.textColor}>
          a
        </SidebarItem>
      </SlackSidebarWrapper>
    </SlackPreviewWrapper>
  );
}

export default SlackPreview;