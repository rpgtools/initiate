var moment = require('moment')

export const time = (state = moment('1991-07-27 08:32'), action) => {
  switch(action.type){
    case 'TIME_UPDATE': {
      return action.time;
    }
    default:{
      return state;
    }
  }
};