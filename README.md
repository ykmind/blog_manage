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

1. 数据持久化有问题, umi3中redux-persist配置失效, 手动在ruducer的时候存储到了localstorage.