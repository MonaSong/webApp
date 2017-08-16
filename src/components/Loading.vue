<template>
  <div class="loading">
    <img :src="loadingImg" alt="" class="load-img">
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  data () {
    return {
      loadingImg: require('@/assets/img/loading.png'),
      msg: '正在加载中'
    }
  }
}
</script>
<style lang="less">
  @import '../assets/style/variable.less';
  .loading{
    text-align: center;
    .load-img{
      animation:cicle 1s infinite;
      -webkit-animation:cicle 1s linear infinite;
      -moz-animation:cicle 1s linear infinite;
      -ms-animation:cicle 1s linear infinite
    }
    p{
      font-size: .2rem;
      color: @desc-color;
    }
  }

  @-webkit-keyframes cicle {
    from {
      -webkit-transform:rotate(0deg)
    }
    to {
      -webkit-transform:rotate(360deg)
    }
  }
  @-moz-keyframes cicle {
    from {
      -moz-transform:rotate(0deg)
    }
    to {
      -moz-transform:rotate(360deg)
    }
  }
  @-ms-keyframes cicle {
    from {
      -ms-transform:rotate(0deg)
    }
    to {
      -ms-transform:rotate(360deg)
    }
  }
  @keyframes cicle {
    from {
      transform:rotate(0deg)
    }
    to {
      transform:rotate(360deg)
    }
  }
</style>
