import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelState {
  nickname: string;
  token: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    logout: Effect;
  };
  reducers: {
    setUser: Reducer<UserModelState>;
  };
  // subscriptions: { setup: Subscription };
}

const IndexModel: UserModelType = {
  namespace: 'user',

  state: {
    nickname: '',
    token: '',
  },

  effects: {
    *logout(action, { call, put }) {},
  },
  reducers: {
    setUser(state, action) {
      let newState = { ...state, ...action.payload };
      localStorage.setItem('user', newState);
      return newState;
    },
  },
};

export default IndexModel;
