export function scrollTopAnimate (element, value, dis, time) {
  /**
   * 将元素滚动到可见位置
   * @param element 要滚动的元素
   * @param value 目标高度
   * @param dis 一次滑动距离
   * @param flag 如果当前高度小于目标高度 下滑 +  如果大于  上滑 -
   * @param 50 顶部导航栏高度影响
   */
  return new Promise((resolve, reject) => {
    let flag = element.scrollTop < value
    // value 目标高度
    function step () {
      let initTop = element.scrollTop
      if (flag) {
        if (initTop > value) {
          element.scrollTop = value - 50
          resolve()
          return false
        }
        element.scrollTop = initTop + dis
      } else {
        if (initTop < value) {
          element.scrollTop = value - 50
          resolve()
          return false
        }
        element.scrollTop = initTop - dis
      }
      window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  })
}

export function scrollTopAnimateTime (element, value, time) {
  /**
   * 将元素滚动到可见位置
   * @param element 要滚动的元素
   * @param value 目标高度
   * @param time 单次滑动时间 动画间隔
   */
  if (element.timer) {
    clearInterval(element.timer)
  }
  return new Promise((resolve) => {
    element.timer = setInterval(function () {
      let flag = true
      value = value < 0 ? 0 : value
      let leader = parseInt(element.scrollTop) || 0
      let step = (value - leader) / 10
      if (step > 0) {
        step = Math.ceil(step)
      } else {
        step = Math.floor(step)
      }
      leader = leader + step
      element.scrollTop = leader

      if (leader !== value) {
        flag = false
      }
      if (flag) {
        clearInterval(element.timer)
        resolve()
      }
    }, time)
  })
}
