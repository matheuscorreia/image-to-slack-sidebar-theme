import React from 'react';

import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import Box from '@material-ui/core/Box';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';

import { navigate } from '@reach/router';
import { useDropzone }  from 'react-dropzone';
import usePasteImage from '../hooks/usePasteImage';

import Button from './Button';

type DragWrapperProps = {
  isDragging: boolean;
  isAccepted: boolean;
}

const draggingMixin = css<DragWrapperProps>`
  border-radius: 5px;

  ${props => props.isAccepted ? `
    background-color: ${transparentize(0.5, props.theme.green)};
    border: 5px dashed ${transparentize(0.5, props.theme.green)};
  ` : `
    border: 5px dashed ${transparentize(0.5, '#F00')};
  `}
`;

const DragWrapper = styled(({ isDragging, isAccepted, ...props }) => <Box {...props} />)<DragWrapperProps>`
  && {
    box-sizing: border-box;
    transition: background-color .5s ease-in-out;
    height: calc(100vh - 64px);
    ${props => props.isDragging ? draggingMixin : ''}
  }
`;

const mimeTypesAccepted = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
]

const FileUpload: React.FC = () => {
  const onFileUpload = (files: File[]) => {
    if(!files.length) return;

    const referenceImage = files[0]; 

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

  const {
    open,
    getInputProps,
    getRootProps,
    isDragActive,
    isDragAccept,
  } = useDropzone({
    accept: mimeTypesAccepted,
    multiple: false,
    preventDropOnDocument: true,
    onDrop: onFileUpload,
  });

  usePasteImage({ onPaste: onFileUpload });

  const { ref , ...rootProps } = getRootProps();

  return (
    <RootRef rootRef={ref} >
      <DragWrapper
        display='flex'
        flex={1}
        flexDirection='column'
        alignItems='center'
        paddingTop='70px'
        isDragging={isDragActive}
        isAccepted={isDragAccept}
        {...rootProps}
        // disable click on drag area to open upload
        onClick={undefined}
      >
        <input {...getInputProps()}/>
        <Button
          icon='add_photo_alternate'
          onClick={open}
        >
          Convert Image
        </Button>
        <Typography variant='caption' align='center'>
          Click the button to upload
        </Typography>
      </DragWrapper>
    </RootRef>

  );
}

export default FileUpload;
