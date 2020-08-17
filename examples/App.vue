<template>
  <div id="app">
    <sideMenu :data="data">
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
    </sideMenu>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      data: [
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
  methods: {
    // 选择 内容事件
    select (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  $fsz:50;
  @function rem($val){
    @return $val/$fsz*1rem;
  }
  .content-box{
    margin-top: rem(40);
    .module-title{
      color: #262626;
      font-size: rem(32);
      span{
        font-size: rem(28);
      }
    }
    .module-list{
      .module-item{
        width: 100%;
        background: #1c8dfe;
      }
    }
  }
</style>
