import useTheme from 'misc/hooks/useTheme';
import React from 'react';
import { createUseStyles } from 'react-jss';

const getClasses = createUseStyles(theme => ({
  container: {
    fontSize: '2rem',
    fontWeight: '400',
    cursor: 'pointer',
    alignItems: 'center',
    display: 'flex',
    gap: `${theme.spacing(2)}px`,
    justifyContent: 'space-between',
    padding: `0px ${theme.spacing(2)}px`,
  },
}));

function CardTitle({
  children,
}) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
}

export default CardTitle;
