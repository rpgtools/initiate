export const updateTime = time => {
  return {
    type: 'TIME_UPDATE',
    time
  };
};

export const addSeconds = seconds => {
  return {
    type: 'TIME_ADD_SECONDS',
    seconds
  };
};