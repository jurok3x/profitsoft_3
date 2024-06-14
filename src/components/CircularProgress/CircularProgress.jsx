import CircularProgressMUI from '@mui/material/CircularProgress';
import useTheme from 'misc/hooks/useTheme';
import React from 'react';
import styles from './style.module.css';

function CircularProgress({
  size = 36,
}) {
  const { theme } = useTheme();
  return (
    <div className={styles.spinner}>
      <CircularProgressMUI
      size={size}
      sx={{
        colorPrimary: theme.circularProgress.color,
      }}
      thickness={3}
    />
    </div>
    
  );
}

export default CircularProgress;
