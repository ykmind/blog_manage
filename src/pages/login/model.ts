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
    saveUser: Reducer<UserModelState>;
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
    saveUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default IndexModel;
