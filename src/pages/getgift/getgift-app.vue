<template>
  <div id="app" class="container">
    <div v-if="!giftData">
      <loading></loading>
    </div>

    <transition name="fade">
      <div v-if="giftData!==null">
        <!-- 倒计时插件 -->
        <counter :isShowTimer="isShowTimer" :second="second" :countType="countType"></counter>
      
        <!--图片-->
        <div class="game-img">
          <img :src="giftData.bannerImg" />
        </div>

        <!--详情-->
        <div class="game-info">
          <h4 class="game-title clearfix">
            <span class="pull-right game-title-desc">剩余：{{giftData.remainderNum}}</span>
            <span class="pull-left game-title-info">【{{giftData.title}}】新手礼包</span>
            </h4>
          <div class="info-content">
            <h4 class="info-title">礼包内容：</h4>
            <ul class="info-item">
              <li>{{giftData.description}}</li>
            </ul>
            <p class="tip">
              温馨提示：同类型礼包兑换码，每个角色只可使用一次。
            </p>
          </div>
        </div>
        <!-- 未领取 -->
        <div class="btn-group mt-10" v-if="giftData.isReceive===0">
          <!--领取按钮[免费领取]-->
          <span class="btn btn-red" v-if="giftData.exchangeValue=='0'" @click="getGift">立即领取</span>

          <!--另一种情况，扣取米券[扣取米券]-->
          <span class="btn btn-green" @click="getGift" v-else>扣减{{giftData.exchangeValue}}米券</span>
        </div>
        <!-- 已领取 -->
        <div class="btn-group mt-10" v-if="giftData.isReceive===1">
          <span class="btn btn-red" disabled>已领取</span>
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
      giftData: null,
      isShowTimer: false,
      second: null,
      countType: 'load'
    }
  },
  created () {
    var _this = this
    _this.getGiftData()
  },
  methods: {
    /**
     * @desc 拿到对应礼包数据
     */
    getGiftData () {
      var _this = this
      var searchData = window.tools.parseSearch() ? window.tools.parseSearch() : {id: 17, uid: '1'}
      if (!searchData || !searchData.id) return
      var id = searchData.id
      var uid = searchData.uid
      _this.$http.get('/api/gift/assistant/show', {params: {id: id, uid: uid}})
      .then(function (data) {
        var curData = data.data
        _this.setTimerStatus()
        if (curData.returnCode === '200') {
          _this.giftData = curData.data
          _this.second = _this.giftData.remainTime
          _this.setTimerStatus()
        } else {
          console.log(curData.returnCode)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /**
     * @desc 领取礼包
     */
    getGift () {
      var _this = this
      var extn = window.external
      if (!extn || !extn.receiveGift || !window.tools.parseSearch()) return
      var searchData = window.tools.parseSearch()
      var couponNum = _this.giftData.exchangeValue
      var scheduleId = searchData.id
      var param = JSON.stringify({couponNum: couponNum, scheduleId: scheduleId})
      extn.receiveGift(param)
    },
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
    setTimerStatus () {
      var _this = this
      if (_this.second > 0) {
        _this.isShowTimer = true
        setTimeout(function () {
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
  .mt-10{
    margin-top: .34rem;
  }
  .game-info .info-title {
    margin-top: 10px;
  }
  .game-info .info-item {
    margin-top: 8px;
  }
  .game-info .info-item li {
    line-height: .3rem;
    height: .35rem;
    font-size: .16rem;
    color: #838383;
  }
</style>
