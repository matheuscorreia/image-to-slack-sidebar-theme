import React, { useState, useEffect } from 'react';
import Vibrant from 'node-vibrant';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import idx from 'idx';

import PaletteColors from '../components/PaletteColors';
import SlackPreview from '../components/SlackPreview';
import Button from '../components/Button';

import useClipboard from '../hooks/useClipboard';

import { PalleteNames, SlackPalette } from '../helpers/types';

import { darkMutedAndVibrant, formatToSlack, logPallete } from '../helpers/colorExtractionMethods';

type Props = {
  path: string;
  location?: {
    state?: {
      base64Image?: string
    }
  }
}

const paletteKeys = Object.keys(PalleteNames);

const generateSlackPalette = async (base64Image: string, onSuccess: (s: SlackPalette) => void, onError?: () => void) => {  
  const vibrantBuilder = Vibrant.from(base64Image);

  try {
    const palette = await vibrantBuilder.getPalette();

    logPallete(palette);

    const slackColors = darkMutedAndVibrant(palette);

    const slackPalette = formatToSlack(slackColors).reduce((palette, color, idx) => {
      const colorKey = paletteKeys[idx];

      return {
        ...palette,
        [colorKey]: color,
      }
    }, {}) as SlackPalette;

    return onSuccess(slackPalette);
  } catch (error) {
    return onError && onError();
  }
}

const ResultPage: React.SFC<Props> = ({ location }) => {
  const base64Image = idx(location, _ => _.state.base64Image);

  const onCopy = (text: string) => {
    console.log(text);
  }

  const clipboard = useClipboard({ onCopy, });

  const [ slackPalette, setSlackPalette ] = useState<SlackPalette | null>(null);

  useEffect(() => {
    if(!base64Image) return;

    generateSlackPalette(base64Image, slackPallete => setSlackPalette(slackPallete));
  }, [base64Image])

  if(!base64Image) {
    navigate('/');

    return null;
  }

  if(!slackPalette) return null;

  const handleClipboardCopy = () => {
    const text = Object.values(slackPalette).join(',');

    clipboard.copy(text);
  }

  return (
    <Box display='flex' flexDirection='column' flex={1} alignItems='center' paddingTop='70px'>
      <PaletteColors palette={slackPalette} />
      <Box display='flex' flex={1} justifyContent='center' marginY='70px'>
        <Button text='Copy to clipboard' icon='assignment' boxProps={{ marginRight: '10px' }} onClick={handleClipboardCopy} />
        <Button icon='add_photo_alternate' onClick={() => navigate('/')} />
      </Box>
      {/* <SlackPreview palette={slackPalette} /> */}
    </Box>
  );
}

export default ResultPage;