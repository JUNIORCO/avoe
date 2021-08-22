import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      setSeconds(0);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <Box>
      <Typography>{`${seconds}s`}</Typography>
    </Box>
  );
};

export default Timer;
