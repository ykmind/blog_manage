# Ykmind的个人博客后台管理

## 启动项目

```bash
$ yarn
$ yarn start
```

## 主要技术栈

umi + dva + react + typescript

### 目录结构

```tex
├── mock
│   └── login.ts
├── package.json
├── public
│   ├── favicon.ico
│   └── logo.svg
├── src
│   ├── app.ts
│   ├── app.tsx
│   ├── assets
│   │   └── login_bg.jpg
│   ├── global.css
│   ├── models
│   ├── pages
│   │   ├── index.tsx
│   │   ├── login
│   │   ├── notelist
│   │   └── workspace
│   └── services
│       └── users.ts
├── tsconfig.json
├── typings.d.ts
└── yarn.lock
```

### Question
1. 拖拽事件中略微有些小问题, 在该demo中, 未采用drag事件, 纯onmouse相关事件完成的. 问题是: 把div从一个框拖拽到另一个框中, 因为div挡住了鼠标, 触发不到目标容器上的事件, 我想到了使用css pointer-events属性来尝试, 结果失败, 因为被拖拽的div自身的事件根本触发不了了... 曲线救国吧, 拖拽开始的时候获取两个div容器的范围阈值, 释放的时候做个判断是删除, 还是数据的移动.  优化: 感觉这个还是太麻烦了, 还是用drag方便点, 我溜了~
