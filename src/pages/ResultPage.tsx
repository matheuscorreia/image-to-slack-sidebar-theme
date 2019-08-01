import React, { useState, useEffect } from 'react';
import Vibrant from 'node-vibrant';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import idx from 'idx';

import SourceImage from '../components/SourceImage';
import SelectMode, { ColorExtractionMethodsName, colorExtractionMethods } from '../components/SelectMethod';
import PaletteColors from '../components/PaletteColors';
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

const [ defaultMethod ] = Object.keys(ColorExtractionMethodsName);

const paletteKeys = Object.keys(PalleteNames);

const generateSlackPalette = async (base64Image: string, extractionMethodKey: string, onSuccess: (s: SlackPalette) => void, onError?: () => void) => {  
  const vibrantBuilder = Vibrant.from(base64Image);

  const extractionMethod = colorExtractionMethods[extractionMethodKey];

  try {
    const palette = await vibrantBuilder.getPalette();

    logPallete(palette);

    const extractedColors = extractionMethod(palette);

    const slackPalette = formatToSlack(extractedColors).reduce((palette, color, idx) => {
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
  const [ extractionMethod, setExtractionMethod ] = useState(defaultMethod);

  const onCopy = (text: string) => {
    console.log(text);
  }

  const clipboard = useClipboard({ onCopy, });

  const [ slackPalette, setSlackPalette ] = useState<SlackPalette | null>(null);

  useEffect(() => {
    if(!base64Image) return;

    generateSlackPalette(base64Image, extractionMethod, slackPallete => setSlackPalette(slackPallete));
  }, [base64Image, extractionMethod])

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
      <Typography variant='caption'>Source: </Typography>
      <SourceImage base64={base64Image} />
      <Typography variant='caption'>Extraction Method: </Typography>
      <SelectMode method={extractionMethod} handleMethodChange={setExtractionMethod} marginBottom='25px' />
      <Typography variant='caption'>Resulted Palette: </Typography>
      <PaletteColors palette={slackPalette} />
      <Box display='flex' flex={1} justifyContent='center' marginY='70px'>
        <Button icon='assignment' boxProps={{ marginRight: '10px' }} onClick={handleClipboardCopy}>
          Copy to clipboard
        </Button>
        <Button icon='add_photo_alternate' onClick={() => navigate('/')} />
      </Box>
    </Box>
  );
}

export default ResultPage;