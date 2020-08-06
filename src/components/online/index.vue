<template>
  <div id="online" style="width:100%;position: relative;margin: 0 auto">
    <div class="canvasContent" v-if="!isLogin">
      <div>{{msg}}</div>
      <div v-if="!isLogin" style="font-size: 16px">用户名：<input v-model="userName"><button @click="login()">确认</button></div>
      <div v-else><input v-model="inputMsg" @blur="sendMsg(inputMsg)"></div>
    </div>
    <main-world v-else :stepMsg="stepMsg" :isReady="isReady" @sendStep="sendMsg"></main-world>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import { test } from '@/api'
  import mainWorld from './mainWorld.vue'
  export default {
    components: {mainWorld},
    name: 'online',
    data() {
      return {
        userName:null,
        isLogin:false,
        HeartCheck:new Map(),
        inputMsg:null,
        msg: 'websocket',
        ws: null,
        lockReconnect:false,
        count:0,
        stepMsg:{

        },
        isReady:false
      }
    },
    created() {
      document.getElementsByTagName('body')[0].style.backgroundImage = 'none'
    },
    mounted() {
      this.InitHeartCheck()
    },
    updated() {

    },
    methods: {
      login(){
        if(this.userName){
          this.isLogin=true
          this.initSocket()
        }else {
          alert('请输入用户名')
        }
      },
      initSocket() {
        let self = this
        let protocol = location.protocol === 'https'
          ? 'wss://127.0.0.1:5040'
          : 'ws://127.0.0.1:5040';
        this.ws = new WebSocket(`${protocol}?userName=${this.userName}`);
        console.log(this.ws)
        this.ws.onopen = function (evt) {
          console.log("Connection open ...");
          self.HeartCheck.reset().start()
          self.ws.send("Hello WebSockets!");
        };

        this.ws.onmessage = function (res) {
          console.log("Received Message: " + res.data);
          let data=JSON.parse(res.data)
          if(data.code===0){
            self.msg = data.msg
            self.isReady=true
            return
          }
          if(data.code===200){
            self.msg = data.msg
            this.stepMsg=data.msg
          }else {
            self.isLogin=false;
            self.msg = data.msg
          }
          self.HeartCheck.reset().start()
        };

        this.ws.onclose = function (evt) {
          console.log("Connection closed.");
          self.reconnect()
        };
        this.ws.onerror = function (err) {
          self.count++
          if(self.count>=3){
            self.count=0
          }
          let loading=['.','..','...']
          console.log("连接出错");
          self.msg='连接出错,正在重连'+loading[self.count]
          self.reconnect()
        }
      },
      sendMsg(val){
        console.log('send',val)
        if(this.ws){
          if(typeof val ==='object'){
            let msg=JSON.stringify(val)
            this.ws.send(msg)
          }else {
            this.ws.send(val)
          }
        }
      },
      reconnect(){
        if(this.lockReconnect) return
        this.lockReconnect=true
        setTimeout(()=>{
          this.initSocket()
          this.lockReconnect=false
        },2000)
      },
      InitHeartCheck(){
        let self = this;
        this.HeartCheck={
          timeout: 60000, //60秒
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function() {
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
          },
          start: function() {
            this.timeoutObj = setTimeout(()=> {
              //这里发送一个心跳，后端收到后，返回一个心跳消息，
              //onmessage拿到返回的心跳就说明连接正常
              self.sendMsg("心跳测试");
              this.serverTimeoutObj = setTimeout(function() { //如果超过一定时间还没重置，说明后端主动断开了
                self.ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
              }, this.timeout)
            }, this.timeout)
          }
        }
      }
    }
  }
</script>

<style scoped>
  body {
    background-image: none;
  }

  .canvasContent {
    text-align: center;
    margin: 0 auto;
  }
</style>
