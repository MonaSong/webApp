<template>
  <div class="toast" v-show="isToastShow">
    <span class="">{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
    }
  },
  props: {
    isToastShow: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '提示信息'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toast{
    position: fixed;
    width: 100px;
    height: 50px;
    left: 50%;
    top: 50%;
    line-height: 50px;
    text-align: center;
    font-size: .15rem;
    background-color: rgba(0,0,0,.8);
    color: #fff;
    border-radius: 5px;
    -webkit-transition: all .2s linear;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
</style>
