<template>
  <div id="mainWorld" style="width:100%;position: relative;margin: 0 auto">
    <div class="canvasContent">
      <div>{{msg}}</div>
      <canvas id="canvas" class="canvas" :height="currentBorder" :width="currentBorder" @click="getStep($event)"></canvas>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'

  export default {
    components: {},
    name: 'mainWorld',
    data() {
      return {
        ctx:null,
        msg: 'world one!!!',
        unit: 30,
        me:true,
        isOver:false
      }
    },
    props :{
      stepMsg:Object,
      isReady:Boolean
    },
    computed: {
      currentBorder() {
        return this.unit * 19
      }
    },
    watch:{
      stepMsg(newValue){
        console.log(newValue)
      },
      isReady(newValue){
        if(newValue) this.msg='start'
      }
    },
    created() {

    },
    mounted() {
      this.createInit()
    },
    updated() {

    },
    methods: {
      createInit() {
        this.ctx = document.getElementById("canvas").getContext('2d');
        let ctx=this.ctx
        ctx.strokeStyle = "#bfbfbf";
        for (let i = 0; i < 19; i++) {
          ctx.moveTo(this.unit / 2 + i * this.unit, this.unit / 2);
          ctx.lineTo(this.unit / 2 + i * this.unit, this.currentBorder - this.unit / 2);
          ctx.stroke();
          ctx.moveTo(this.unit / 2, this.unit / 2 + i * this.unit);
          ctx.lineTo(this.currentBorder - this.unit / 2, this.unit / 2 + i * this.unit);
          ctx.stroke();
        }
      },
      getStep(ev){
        console.log(ev)
        if(!this.isReady) return;
        let chessBoard=[]
        for(let i=0;i<19;i++){
          chessBoard[i]=[]
          for(let j=0;j<19;j++){
            chessBoard[i][j]=0
          }
        }
        if (!this.me) {
          return;
        }
        if (this.isOver) {
          return;
        }
        let x = ev.offsetX;
        let y = ev.offsetY;
        let i = Math.floor(x / this.unit);
        let j = Math.floor(y / this.unit);
        if (chessBoard[i][j] === 0) {
          this.oneStep(i, j, this.me);
          let msg={
            i:i,
            j:j
          }
          this.$emit('sendStep',msg)
          chessBoard[i][j] = 1;
        }
      },
      oneStep(i, j, me) {
        let ctx=this.ctx
        ctx.beginPath();
        ctx.arc(this.unit/2 + i * this.unit, this.unit/2 + j * this.unit, 13, 0, 2 * Math.PI);
        ctx.closePath();
        let gradient = ctx.createRadialGradient(this.unit/2 + i * this.unit, this.unit/2 + j * this.unit, 13, this.unit/2 + i * this.unit + 2, this.unit/2 + j * this.unit, 0);
        if (me) {
          gradient.addColorStop(0, "#0A0A0A");
          gradient.addColorStop(1, "#636766");
        } else {
          gradient.addColorStop(0, "#D1D1D1");
          gradient.addColorStop(1, "#F9F9F9");
        }
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
  }
</script>

<style scoped>
  #canvas {
    display: block;
    margin: 0 auto;
    box-shadow: 1px 1px 9px #000000;
  }

  .canvasContent {
    text-align: center;
    margin: 0 auto;
  }
</style>
