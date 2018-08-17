import moment from 'moment';

const start = moment('1991-07-27 08:32');

export const timeReducer = (state = start, action) => {
  switch (action.type) {
    case 'TIME_ADD_SECONDS':
      return moment(state).add(action.seconds, 's')
    case 'TIME_UPDATE':
      return action.time;
    default:
      return state;
  }
};

export const actions {
  updateTime: time => {
    return {
      type: 'TIME_UPDATE',
      time
    };
  }
  addSeconds: seconds => {
    return {
      type: 'TIME_ADD_SECONDS',
      seconds
    };
  },
};
