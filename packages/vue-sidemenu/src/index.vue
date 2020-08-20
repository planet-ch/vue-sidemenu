<template>
  <div class="slide-menu">
    <div class="menu-left">
      <div class="left-item ellipsis2" v-for="(item, index) in listData" :key="index" :class="[ cueenrIndex === index ? 'current' : '' ]"  @click="menuClick(item, index)">
        {{item.title}}
      </div>
    </div>
    <div class="menu-right" ref="scrollBox" :class="[ disabled ? 'disabled' : '']">
      <div class="right-item-module" v-for="(item, index) in listData" :key="index" :ref="`scrollItem-${index}`" >
        <slot name="right-item-module" :data="item" v-if="item.id !== -1"></slot>
        <div class="all" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { scrollTopAnimateTime } from './utils/scroll.js'
  export default {
    name: 'vue-sidemenu',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        cueenrIndex: 0,
        cureentItem: {},
        clickFlag: false,
        disabled: false
      }
    },
    computed: {
      listData () {
        return [...this.data]
      }
    },
    created () {
      // 监听事件
      this.$nextTick(() => {
        this.$refs.scrollBox.addEventListener('scroll', () => {
          if (this.clickFlag) {
            return
          }
          let arr = []
          this.listData.map((item, index) => {
            let dis = this.$refs[`scrollItem-${index}`][0].offsetTop - this.$refs.scrollBox.scrollTop - this.$refs.scrollBox.clientHeight
            if (dis <= 0) {
              arr.push(index)
            }
            // 所有 单独处理
            if (this.$refs.scrollBox.scrollTop === 0) {
              arr = [0]
            }
          })
          this.cueenrIndex = arr.sort((a, b) => b - a)[0] || 0
        })
      })
    },
    methods: {
      menuClick (item, index) {
        if (this.cueenrIndex === index) {
          return
        }
        this.disabled = true
        setTimeout(() => {
          this.clickFlag = true
          this.cueenrIndex = index
          this.cureentItem = item
          let element = this.$refs.scrollBox
          let errDis = element.scrollHeight - element.clientHeight
          let top = this.$refs[`scrollItem-${index}`][0].offsetTop - 10
          top = top > errDis ? errDis : top
          // 固定速度 时间过长
          // scrollTopAnimate(this.$refs.scrollBox, top, 120, 0.4).then(() => {
          //   this.clickFlag = false
          // })
          // 固定时长  匀减速运动
          scrollTopAnimateTime(element, top, 5).then(() => {
            setTimeout(() => {
              // 定时器保证 js主动滑动  不经过定位方法
              this.clickFlag = false
            }, 200)
          })
          this.disabled = false
        }, 50)
      }
    },
    filters: {}
  }
</script>

<style lang="scss">
  $fsz:50;
  @function rem($val){
    @return $val/$fsz*1rem;
  }
  .slide-menu{
    display: flex;
    justify-content: center;
    height: calc(100vh - 1.8rem);
    overflow: hidden;
    background: #fff;
    .menu-left{
      width: rem(184);
      height: 100%;
      background: #F6F6F6;
      position: relative;
      .current-mask{
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: rem(28);
        background: #fff;
        color: #368DFF;
        width: 100%;
        height: rem(100);
        transition: all .2s ease;
        &::before{
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: rem(4);
          height: rem(32);
          background: #368DFF;
        }
      }
      .left-item{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: rem(28);
        color: #8B8B8B;
        width: 100%;
        height: rem(100);
        &.current{
          position: relative;
          background: #fff;
          color: #368DFF;
          &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: rem(4);
            height: rem(32);
            background: #368DFF;
          }
        }
      }
    }
    .menu-right{
      box-sizing: border-box;
      padding-left: rem(20);
      width: calc(100% - 3.68rem);
      height: calc(100vh - 1.8rem);
      overflow-y: auto;
      background: #fff;
      transition: all .5s ease;
      .all{
        width: 100%;
        height: rem(30);
      }
    }
  }
</style>
