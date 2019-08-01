import React from 'react';
import Box from '@material-ui/core/Box';

import FileUpload from '../components/FileUpload';

type Props = {
  path: string;
}

const UploadPage: React.SFC<Props> = () => {
  return (
    <Box display='flex' flex={1} justifyContent='center'>
      <FileUpload />
    </Box>
  );
}

export default UploadPage;