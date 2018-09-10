<template>
  <div id="meigon" style="width:100%;position: relative;margin: 0 auto">
    <div class="canvasContent">
      <div>{{msg}}</div>
      <canvas id="canvas" class="canvas" :width="boxX" :height="boxY"></canvas>
    </div>
    <div style="text-align: center">
      <button @click="createInit">start</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  let resultArray=[];
  let unitLen=30;
  let ctx;

  export default {
    components: {

    },
    name: 'meigon',
    data () {
      return {
        msg:'world one!!!',
        boxX:600,
        boxY:600,
      }
    },
    created(){

    },
    mounted() {

    },
    updated(){

    },
    methods: {
      createInit(){
        ctx=document.getElementById("canvas").getContext('2d');
        document.addEventListener('keydown',this.moveShape,false);
        this.bindEvent();
        for(let i=0;i<this.boxX/unitLen;i++)
        {
          let row=[];
          for(let j=0;j<this.boxY/unitLen;j++)
          {
            row[j]=0;
          }
          resultArray[i]=row;
        }
        resultArray=this.createMatrix();
        for(let i=0;i<resultArray.length;i++){
          for(let j=0;j<resultArray[i].length;j++){
            this.drawRect(j*unitLen,i*unitLen);
          }
        }
        this.startedClickHandler()
      },
      createRect(arr){
        for(let i=0;i<arr.length;i++){
          for(let j=0;j<arr[i].length;j++){
              arr[i][j]=j+i*arr.length
          }
        }
        return arr
      },
      createMatrix() {
        let matrix = [];
        for(let i = 0; i< this.boxX/unitLen; i++) {
          matrix[i] = [];
          for(let j = 0; j<this.boxY/unitLen; j++) { //0-否 &gt;=1-是
            matrix[i][j] = {
              hidden: 1,//是否隐藏的
              number: 0,//数字
              flag: 0,//旗子
              doubt: 0,//问号
              bomb: 0,//炸弹 0-没有 1-正常炸弹 2-标记错误的炸弹 3-被点击后造成游戏结束的炸弹
              hover: 0//hover样式
            };
          }
        }
        return matrix
      },
      createMines(count) {
        while(count < 0) {
          let i = Math.ceil(Math.random() * (this.boxX/unitLen - 1));
          let j = Math.ceil(Math.random() * (this.boxY/unitLen - 1));
          if(matrix[i][j] !== 1) {
            matrix[i][j].bomb = 1;
            count--;
          }
        }
      },
      startedClickHandler(e){
        let x = Math.floor(e.offsetX/this.boxX);
        let y = Math.floor(e.offsetY/this.boxY);
        let m = matrix[y][x];
        console.log(m)
      },
      clearPaint(){
        ctx.clearRect(0,0,this.boxX,this.boxY);
      },
      drawRect(x,y){
        ctx.fillStyle="red";
        ctx.strokeStyle="black";
        ctx.lineWidth=1;
        ctx.font="16px Arial";
        ctx.fillText('1',x,y);
        ctx.fillRect(x,y,unitLen,unitLen);
        ctx.strokeRect(x,y,unitLen,unitLen)
      },
      bindEvent(){
        canvas.addEventListener('contextmenu', function(e) {
          e.returnValue = false;
        });
      }
    }
  }
</script>

<style scoped>
  p{
    margin: 0;
    padding: 0;
  }
  .canvasContent{
    text-align: center;
    margin: 0 auto;
  }
  #canvas{
    border: black 1px solid;
  }
</style>
_
