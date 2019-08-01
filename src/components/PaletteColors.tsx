import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

import ColorSwatch from './ColorSwatch';

import { SlackPalette } from '../helpers/types';

const ResponsiveCard = styled(Card)`
  @media only screen and (max-width: 600px) {
    && {
      border-radius: 0;
      box-shadow: none;
      width: 100vw;
      display: flex;
      justify-content: center;
    }
  }
`;

type Props = {
  palette: SlackPalette;
}

const PaletteColors = ({ palette }: Props) => {
  const paletteEntries = Object.entries(palette);

  const paletteTopRow: Partial<SlackPalette> = Object.fromEntries(paletteEntries.slice(0, 4));
  const paletteBottomRow: Partial<SlackPalette> = Object.fromEntries(paletteEntries.slice(4, 8));

  const paletteToSwatches = (p: Partial<SlackPalette>) => {
    return Object.entries(p).map(([name, hex]) => (
      <ColorSwatch key={`${name}-swatch`} color={hex!} />
    ));
  };

  return (
    <ResponsiveCard>
      <Box display='flex' flexDirection='column' padding='30px 20px'>
        <Box display='flex'>
          {paletteToSwatches(paletteTopRow)}
        </Box>
        <Box display='flex' marginTop='35px'>
          {paletteToSwatches(paletteBottomRow)}
        </Box>
      </Box>
    </ResponsiveCard>
  );
};

export default PaletteColors;