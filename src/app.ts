import { getDvaApp } from 'umi';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const dva = {
  config: {
    onError(e: any) {
      e.preventDefault();
    },
    onReducer(reducer: any) {
      const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['global'],
      };
      return persistReducer(persistConfig, reducer);
    },
  },
};

window.addEventListener('DOMContentLoaded', () => {
  const app = getDvaApp();
  console.log('app', app);
  persistStore(app._store);
});
