import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { navigate } from '@reach/router';

import Button from './Button';

const InvisibleInput = styled.input`
  cursor: pointer;
  position: absolute;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const mimeTypesAccepted = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
]

const FileUpload: React.FC = () => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;

    const referenceImage = e.target.files[0]; 

    const fileReader = new FileReader();

    fileReader.addEventListener('loadend', () => {
      const base64Image = fileReader.result;

      navigate('/result', {
        state: {
          base64Image, 
        },
      });
    });

    fileReader.readAsDataURL(referenceImage)
  }

  return (
    <Box display='flex' flexDirection='column'>
      <Button
        text='Convert Image'
        icon='add_photo_alternate'
      >
        <InvisibleInput
          type='file'
          name='reference'
          accept={mimeTypesAccepted.join(',')}
          onChange={onInputChange}
        />
      </Button>
      <Typography variant='caption' align='center'>
        Click the button to upload
      </Typography>
    </Box>
  );
}

export default FileUpload;
