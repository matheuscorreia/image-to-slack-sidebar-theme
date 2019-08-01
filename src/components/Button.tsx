import React from 'react';
import styled from 'styled-components';
import MUIButton, { ButtonProps as MUIButtonProps } from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Box, { BoxProps } from '@material-ui/core/Box';

const ButtonWrapper = styled(Box)`
  && {
    position: relative;
    overflow: hidden;
  }
`;

const StyledButton = styled(MUIButton)`
  && {
    padding: 13px 16px;
    text-transform: none;
    border-radius: 2px;
  }
`;

const ButtonIcon = styled(Icon)`
  && {
    margin-right: 0px;
  }
`;

export enum ButtonState {
  DEFAULT = 'DEFAULT',
  LOADING = 'LOADING',
}

type Props = {
  boxProps?: BoxProps;
  onClick?: () => void;
  text?: string;
  icon?: string;
  children?: React.ReactNode;
} & MUIButtonProps;

const Button = ({ children, icon, text, onClick, boxProps = {}, ...props }: Props) => {
  return (
    <ButtonWrapper
      {...boxProps}
    >
      <StyledButton
        onClick={onClick}
        color='secondary'
        variant='contained'
        {...props}
      >
        {icon && (
          <ButtonIcon>
            {icon}
          </ButtonIcon>
        )}
        {text && (
          <Typography>
            {text}
          </Typography>
        )}
      </StyledButton>
      {children}
    </ButtonWrapper>
  );
}

export default Button;