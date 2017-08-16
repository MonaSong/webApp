# 安卓内嵌页部分

> 以下是构建前端页面的node scripts

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8181
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 技术栈
`vue 2.0` `webpack 2.0` `less` `eslint` `axios`

# 项目介绍
> 项目为三个内嵌页，h5与安卓的通讯方式为window.external对象上的方法

# 项目文档结构
``` bash
E:.
├─build
├─config
├─dist
│  └─static
│      ├─css
│      ├─img
│      └─js
├─src
│  ├─assets
│  │  ├─img
│  │  ├─js
│  │  ├─lib
│  │  └─style
│  ├─components
│  └─pages
│      ├─activitydetails
│      │  └─router
│      ├─getgift
│      │  └─router
│      └─gettask
│          └─router
└─static
```
## build/config
该目录下是项目配置文件和项目构建文件

## dist
该目录下的文件是webpack构建之后的文件

## src
该目录属于开发目录，vue文件的入口文件和路由文件都放在这个目录下

``` bash
# assets
资源文件

# components
通用组件

# pages
该文件下存放多页[包含当前页面的路由，入口文件，根vue文件]，每一个页面都可以单独构建一个应用
其中，activitydetails 目录下是活动详情页，getgift目录下是领取礼包页, gettask目录下是领取任务页

```
## static
该目录下存放静态文件，不需要webpack打包处理的文件都放在该目录下






