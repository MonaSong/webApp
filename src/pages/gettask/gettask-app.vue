<template>
  <div id="app" class="container">

     <div v-if="!taskInfo">
      <loading></loading>
    </div> 

    <transition name="fade">
      <div v-if="taskInfo">
        <!-- 倒计时插件 -->
        <counter :isShowTimer="isShowTimer" :second="second" :countType="countType"></counter>

        <!--详情-->
        <div class="game-info mt-10">
          <h4 class="game-title clearfix">
            <span class="pull-right game-title-desc">剩余：{{taskInfo.last}}</span>
            <span class="pull-left game-title-info">【{{taskInfo.app_name}}】{{taskInfo.title}}</span>
          </h4>
        </div>

        <!--图片-->
        <div class="game-img mt-40">
          <i class="bg-lft" :style="{backgroundImage:couponBgLeft}"></i>
          完成任务即可+
          <strong>{{taskInfo.reward}}券</strong>
          <i class="bg-rgt"></i>
        </div>
      
        <p class="split-line"></p>
        <!--任务说明-->
        <div class="game-info mt-30">
          <div class="info-content">
            <h4 class="info-title">任务要求：</h4>
            <ul class="info-item">
              <li v-for="(item, $index) in gameInfoList" :key="$index">
                {{item}}
              </li>
            </ul>
            <p class="tip">
              温馨提示：每次只能领取一个任务，完成或取消任务后才能领取其他任务
            </p>
          </div>
        </div>

        <div class="btn-group mt-20 text-center">
          <!--未领取-->
          <span class="btn btn-red" ref="receiveTaskDom"  @click="receiveTask">领取任务</span>
          <!--已领取 -->
          <div class="get-task" v-if="showAllStatus">
            <!--另一种情况，扣取券-->
            <span class="btn btn-green" ref="receiveTaskRewardDom" @click="receiveTaskReward">我已完成，+{{taskInfo.reward}}券</span>

            <!--放弃-->
            <span class="give-up disable-select" ref="receiveAbandonDom" @click="receiveAbandon">我要放弃</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
var gameImg = require('@/assets/img/game.png')
import Loading from '@/components/Loading'
import Counter from '@/components/Counter'
export default {
  name: 'app',
  data () {
    return {
      gameImg: gameImg,
      couponBgLeft: require('@/assets/img/coupon-bg-left.png'),
      couponBgRight: require('@/assets/img/coupon-bg-right.png'),
      gameInfoList: null, // 任务说明列表信息
      taskInfo: null, // 任务详情
      showAllStatus: false, // 是否显示已领取任务之后的按钮状态
      lastTime: null, // 倒计时时间
      isShowTimer: false, // 是否显示倒计时
      second: null, // 倒计时时间，单位秒
      scheduleId: null, // 任务排期id
      countType: 'load'
    }
  },
  created () {
    var _this = this
    _this.getTaskInfo()
  },
  methods: {
    /**
     * @desc 拿到任务信息
     */
    getTaskInfo () {
      var _this = this
      var searchData = window.tools.parseSearch() ? window.tools.parseSearch() : {id: 10, token: '1321'}
      var id = searchData.id
      var token = searchData.token
      if (!searchData || !id) return
      _this.$http.get('/api/task/show', {params: {id: id, token: token}})
      .then(function (data) {
        var curData = data.data.data
        if (data.data.returnCode !== '200') return
        _this.taskInfo = curData
        _this.gameInfoList = _this._parseInfoList(curData.description)
        _this.lastTime = curData.last_time
        _this.scheduleId = curData.id
        _this.second = _this.lastTime
        _this.setTimerStatus()
        // 设置领取任务的按钮的显示状态
        _this.setBtnStatus()
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    /**
     * @desc 格式化详情
     */
    _parseInfoList (str) {
      var arr = str.split('</p>')
      str = arr.join().replace(/\./g, '、')
      str = str.replace(/,/g, '')
      arr = str.split('<p>')
      arr.splice(0, 1)
      return arr
    },
    /**
     * @desc 领取任务
     */
    receiveTask (e) {
      var _this = this
      var dom = e.currentTarget
      var extn = window.external
      if (!extn || !extn.receiveTask || dom.getAttribute('disabled')) return
      extn.receiveTask(_this.scheduleId)
    },
    /**
     * @desc 领取任务奖励
     */
    receiveTaskReward () {
      var _this = this
      var extn = window.external
      if (!extn || !extn.receiveTaskReward) return
      extn.receiveTaskReward(_this.scheduleId)
    },
    /**
     * @desc 放弃任务
     */
    receiveAbandon () {
      var _this = this
      var extn = window.external
      if (!extn || !extn.receiveAbandon) return
      extn.receiveAbandon(_this.scheduleId)
    },
    /**
     * @desc "status": "-1：未领取；0：已领取任务；1：已领取奖励；2：已放弃任务；"
     */
    setBtnStatus () {
      var _this = this
      if (!_this.taskInfo) return
      if (_this.taskInfo.status === -1 || _this.taskInfo.status === 2) { // 未领取 | 放弃
        _this.showAllStatus = false
        if (_this.taskInfo.status === 2) { // 已放弃的
          _this.$nextTick(function () {
            _this.$refs.receiveTaskDom.innerHTML = '重新领取'
          })
        }
      } else { // 已领取
        _this.showAllStatus = true
        _this.$nextTick(function () {
          _this.$refs.receiveTaskDom.setAttribute('disabled', 'disabled')
          _this.$refs.receiveTaskDom.innerHTML = '已领取'
        })
      }
    },
    /**
     * @desc 领取任务后的倒计时
     * @param {Number} s 倒计时时间，单位是秒
     */
    showTime (s) {
      var _this = this
      var myTime = s * 1000
      if (s > 0) {
        _this.isShowTime = true
        _this.$nextTick(function () {
          window.tools.count(s)
        })
        // 倒计时结束之后把时间dom删除
        setTimeout(function () {
          _this.isShowTime = false
        }, myTime)
      }
    },
    /**
     * @desc 开启倒计时
     */
    setTimerStatus () {
      var _this = this
      if (_this.second > 0) {
        _this.isShowTimer = true
        setTimeout(function () { // 倒计时结束后关闭显示
          _this.isShowTimer = false
        }, 1000 * _this.second)
      }
    }
  },
  components: {
    Loading,
    Counter
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/style/variable.less';
  .split-line {
    margin-top: 15px;
  }

  .give-up{
    cursor: pointer;
    color: @desc-color;
    font-size: .2rem;
  }
  .game-img {
    position: relative;
    height: 1.42rem;
    line-height: 1.2rem;
    text-align: center;
    background-color: @coupon-bg-color;
    color: @white;
    font-size: .3rem;
    margin-left: 5px;
    margin-right: 5px;
    strong {
      position: relative;
      top: .06rem;
      font-size: .46rem;
    }
    i{
      width:5px;
      display: block;
      position: absolute;
      top: 0;
      height: 1.42rem;
      &.bg-lft{
        left: -5px;
        background-image: url('../../assets/img/coupon-bg-left.png')
      }
      &.bg-rgt{
        right: -5px;
        background-image: url('../../assets/img/coupon-bg-right.png')
      }
    }
  }

  .mt-10 {
    margin-top: .2rem;
  }

  .mt-20 {
    margin-top: .37rem;
  }

  .mt-30 {
    margin-top: .24rem;
  }

  .mt-40 {
    margin-top: .09rem;
  }

  .game-info .tip {
    margin-top: 0;
    line-height: .25rem;
  }

  .game-info .game-title {
    border-bottom: none;
    // line-height: 25px; test
  }

  @media (max-width:375px) {
    .game-img {
      font-size: .25rem;
      strong {
        font-size: .35rem;
        top: .04rem;
      }
    }
  }
</style>
