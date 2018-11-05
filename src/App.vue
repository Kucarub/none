<template>
  <div id="app">
    <button @click="goto" v-if="hideItem">go</button>
    <router-view></router-view>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    components: {

    },
    name: 'app',
    data () {
      return {
        hideItem:false,
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){

        },
        // 深度观察监听
        deep: true,
        immediate:true
      }
    },
    mounted() {
      let wh = $(window).width();
      let whChange = function (width) {
        let whdef = 100 / 1920;// 表示1920的设计图,使用100rem的默认值
        let wW = window.innerWidth;// 当前窗口的宽度
        let rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
        $('html').css('font-size', rem + "px");
      };
      whChange(wh);
      $(window).resize(function () {
        let wh = $(window).width();
        whChange(wh)
      });
    },
    updated(){

    },
    methods: {
      goto:function(){
           this.$router.replace({name:'one'})
        },
    }
  }
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    font-size: 100px;
  }
</style>
