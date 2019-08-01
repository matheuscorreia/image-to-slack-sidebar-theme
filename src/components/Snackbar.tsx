import React from 'react';
import MUISnackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

type Props = {
  open: boolean;
  handleClose: () => void;
  message: string;
}

const Snackbar = ({ open, handleClose, message }: Props) => {
  return (
    <MUISnackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={3000}
      ContentProps={{
        'aria-describedby': 'snackbar-message-id',
      }}
      message={<Typography id='snackbar-message-id'>{message}</Typography>}
      action={(
        <IconButton
          key="close"
          aria-label="close"
          onClick={handleClose}
        >
          <Icon>close</Icon>
        </IconButton>
      )}
    />
  );
};

export default Snackbar;