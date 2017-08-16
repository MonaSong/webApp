<template>
  <!--时间-->
  <div class="tip-time" v-if="isShowTimer">
    <i class="icon-clock"></i>
    <span>
      <strong id="day"></strong>天
      <strong id="hour"></strong>小时
      <strong id="minite"></strong>分
      <strong id="second"></strong>秒
      后结束
    </span>
  </div>
</template>
<script>
export default {
  name: 'counter',
  data () {
    return {
    }
  },
  created () {
    var _this = this
    if (_this.countType === 'load') {
      _this.counts(_this.second)
    }
  },
  props: {
    second: {
      type: Number
    },
    isShowTimer: {
      type: Boolean,
      default: false
    },
    countType: {
      type: String // [load,change]
    }
  },
  watch: {
    isShowTimer (newValue, oldValue) {
      var _this = this
      if (_this.countType === 'change') {
        console.log(oldValue)
        console.log(newValue)
        if ((newValue || newValue === true) && _this.second > 0) {
          _this.$nextTick(function () {
            _this.counts(_this.second)
          })
        }
      }
    }
  },
  methods: {
    counts: function (s) {
      var _this = this
      var old = s // 用于下次递归
      var cS = s // 用于计算
      var day = Math.floor(cS / 60 / 60 / 24)
      cS -= day * 86400
      var hour = Math.floor(cS / 60 / 60)
      cS -= hour * 3600
      var minute = Math.floor(cS / 60)
      cS -= minute * 60
      var second = cS
      // dom 渲染
      var dayDom = document.getElementById('day')
      var hourDom = document.getElementById('hour')
      var miniteDom = document.getElementById('minite')
      var secondDom = document.getElementById('second')
      if (cS >= 0 && dayDom) {
        dayDom.innerHTML = day
        hourDom.innerHTML = hour
        miniteDom.innerHTML = minute
        secondDom.innerHTML = second
      }
      var timer = setTimeout(function () {
        if (old > 0) {
          old--
          console.log(old)
          _this.counts(old)
        } else {
          clearTimeout(timer)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/style/variable.less';
  // 最上面倒计时
.tip-time{
  margin-top: -.05rem;
  margin-bottom: .04rem;
  height: .45rem;
  line-height: 20px;
  text-align: center;
  .icon-clock{
    display: inline-block;
    width: .5rem;
    height: .5rem;
    background: url('../assets/img/clock.png') center center no-repeat;
  }
  span{
    position: relative;
    top: -.2rem;
    left: -.35rem;
    font-size: .16rem;
    color: @clock-color;
  }
}
</style>
