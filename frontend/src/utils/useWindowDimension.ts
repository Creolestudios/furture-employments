import React, { useEffect, useState, useCallback } from 'react';

// To get size of window dynamically
const GetWindowDimensions = () => {
  const isClient = typeof window === 'object';
  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient],
  );
  const [size, setSize] = useState<any>(getSize);

  useEffect(() => {
    const onHandleResize = () => {
      setSize(getSize);
    };
    window.addEventListener('resize', onHandleResize);
    return () => window.removeEventListener('resize', onHandleResize);
  }, [getSize, isClient]);
  return size;
};
export default GetWindowDimensions;
