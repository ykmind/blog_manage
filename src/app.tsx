/**
 * @description: 约定src/app.tsx为运行时配置
 * @date   2020-10-21 13:24:08
 * @author yk
 */
// import { merge } from 'umi';
let extraRoutes;

export function patchRoutes({ routes }: { routes: any }) {
  //   routes.unshift({
  //     path: '/foo',
  //     exact: true,
  //     component: require('./pages/test/index').default,
  //   });
  //   merge(routes, extraRoutes);
}

// export function render() {
//   fetch('/api/routes').then((res: any) => {
//     extraRoutes = res.routes;
//   });
// }
