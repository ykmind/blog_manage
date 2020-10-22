import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: 'favicon.ico',
  layout: {
    name: '扬帆，起航',
    locale: true,
    logo: 'logo.svg',
  },
  routes: [
    {
      path: '/login',
      exact: true,
      component: '@/pages/login/login',
      title: '登录页',
      layout: {
        hideNav: true,
        hideMenu: true,
      },
    },
    {
      path: '/',
      component: '@/pages/index',
      menu: {
        name: '待办事项',
        icon: 'Calendar',
      },
    },
    {
      path: '/workspace',
      component: '@/pages/workspace/index',
      menu: {
        name: '工作台',
        icon: 'edit',
      },
    },
    {
      path: '/notes',
      component: '@/pages/notelist/index',
      menu: {
        name: '笔记列表',
        icon: 'UnorderedList',
      },
    },
  ],
});
