import { Location, Route, history } from 'umi';

interface RouteType {
  location: Location;
  routes: Route;
}

export function onRouteChange({ location, routes }: RouteType) {
  const UserInfo = JSON.parse(localStorage.getItem('user') as string);
  const isLogin = UserInfo.token.length > 0;
  if (!isLogin) {
    history.push('/login');
  }
  if (location.pathname === '/login' && isLogin) {
    history.push('/');
  }
}

// 数据持久化失效
// import { getDvaApp } from 'umi';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// export const dva = {
//   config: {
//     onError(e: any) {
//       e.preventDefault();
//     },
//     onReducer(reducer: any) {
//       const persistConfig = {
//         key: 'root',
//         storage,
//         whitelist: ['global'],
//       };
//       return persistReducer(persistConfig, reducer);
//     },
//   },
// };

// window.addEventListener('DOMContentLoaded', () => {
//   const app = getDvaApp();
//   persistStore(app._store);
// });
