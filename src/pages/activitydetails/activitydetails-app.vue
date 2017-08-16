<template>
  <div id="app" class="container">
    <div v-if="!activeData">
      <loading></loading>
    </div>

    <transition name="fade">
      <div v-if="activeData!==null">
        <p class="active-date">
          <!--2017-04-17-->
          {{activeData.createTime}}
        </p>
      
        <!--图片-->
        <div class="active-img mt-40">
          <img :src="activeData.image" alt="">
        </div>
      
        <!--活动说明-->
        <div class="active-info">
          <p>
            {{activeData.description}}
          </p>
        </div>
      
        <!--参与活动-->
        <div class="btn-group mt-10">
          <span class="btn btn-green">立即参与</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
var gameImg = require('@/assets/img/game.png')
import Loading from '@/components/Loading'
export default {
  name: 'app',
  data () {
    return {
      gameImg: gameImg,
      activeData: null,
      isToastShow: false,
      isShowTimer: false,
      second: 10
    }
  },
  components: {
    Loading
  },
  created () {
    var _this = this
    _this.getAtivetyInfo()
  },
  methods: {
    /**
     * @desc 拿到活动信息
     */
    getAtivetyInfo () {
      var _this = this
      var searchData = window.tools.parseSearch()
      var id = searchData && searchData.id ? searchData.id : 4
      if (!id) return
      _this.$http.get('/api/activity/assistant/show', { params: { id: id } })
      .then(function (data) {
        var curData = data.data
        if (curData.returnCode !== '200') return
        _this.activeData = curData.data
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/variable.less';
.active-date {
  text-align: center;
  color: @clock-color;
  font-size: .15rem;
  padding: .1rem 0 .1rem 0;
}

.active-img {
  img {
    width: 100%;
    height: auto;
  }
}

.active-info {
  p {
    font-size: .15rem;
    letter-spacing: .01rem;
    line-height: .3rem;
    color: @desc-color
  }
}

.btn-group {
  margin-left: .5rem;
  margin-right: .5rem;
}

.mt-10 {
  margin-top: 50px;
}

@media (max-width:375px) {}
</style>
