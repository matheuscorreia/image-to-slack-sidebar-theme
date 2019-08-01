import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const SwatchWrapper = styled(Box)`
  && {
    width: 58px;
    margin-left: 25px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const SwatchColor = styled.div`
  margin-bottom: 5px;
  border-radius: 3px;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(255,255,255,0.3);
`;

type Props = {
  color: string;
}

const ColorSwatch = ({ color }: Props) => {
  return (
    <SwatchWrapper display='flex' flexDirection='column' alignItems='center'>
      <SwatchColor color={color} style={{ backgroundColor: color }} />
      <Typography>
        {color}
      </Typography>
    </SwatchWrapper>
  )
}

export default ColorSwatch;