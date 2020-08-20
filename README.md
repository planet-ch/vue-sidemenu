# vue-sidemenu

## Introduction 

`中文说明`
> vue-sidemenu 是类似于美团与饿了么的移动端 商品列表， 侧边菜单， 点击菜单定位内容 和 左边内容区域滑动选定菜单

## Install
``` bash
npm  install vue-sidemenu-com --save
```

## Usage
``` js
// register the plugin on vue

import vueSidemenu from 'vue-sidemenu-com'
Vue.use(vueSidemenu)
import 'vue-sidemenu-com/lib/vue-sidemenu.css';
```
### template
``` 
<template>
  <vue-sidemenu :data="data">
    <template slot="right-item-module" scope="props">
      <div class="content-box">
        <div class="module-title">
          {{props.data.title}}
          <span>共{{props.data.count}}个英雄</span>
        </div>
        <div class="module-list">
          <div class="module-item" :style="`height: ${(index2 + 1) * 6}rem`" v-for="(item2, index2) in props.data.list" :key="index2" @click="select(props.data)">
            <p>{{item2}}</p>
          </div>
        </div>
      </div>
    </template>
  </vue-sidemenu>
</template>
```

### js
``` js
      export default {
        name: 'sideMenuDemo',
        data () {
          return {
            data: [
             {
                id: -1,
                title: '所有英雄',
                count: 0,
                list: [
                  
                ]
              },
              {
                id: 1,
                title: '法师',
                count: 3,
                list: [
                  '王昭君', '上官婉儿', '蔡文姬'
                ]
              },
              {
                id: 2,
                title: '射手',
                count: 3,
                list: [
                  '后羿', '马可波罗', '公孙离'
                ]
              },
              {
                id: 3,
                title: '战士',
                count: 3,
                list: [
                  '程咬金', '项羽', '马超'
                ]
              }
            ]
          }
        },
        created () {
        },
        methods: {
          // 选择 内容事件
          select (item) {
            console.log(item)
          }
        },
        filters: {}
      }
```


All Good Now you have this cool toast in your project..
