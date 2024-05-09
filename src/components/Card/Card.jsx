import CardMUI from '@mui/material/Card';
import useTheme from 'misc/hooks/useTheme';
import React from 'react';

const variants = {
  paper: 'paper',
  edit: 'edit',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
};

function Card({
  customBackground,
  children,
  disablePaddings = false,
  variant = variants.paper,
}) {
  const { theme } = useTheme();
  return (
    <CardMUI
      sx={{
        background: customBackground || theme.card.color.background[variant],
        borderRadius: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(2)}px`,
        margin: `20px 0`,
        padding: disablePaddings
          ? 'none'
          : `${theme.spacing(2)}px 10px`,
        transition: 'all 0.2s ease-out',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </CardMUI>
  );
}

export default Card;
