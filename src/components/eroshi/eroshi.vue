<template>
  <div id="eroshi" style="width:100%;position: relative;margin: 0 auto">
    <div class="canvasContent">
      <div>{{msg}}</div>
      <canvas id="canvas" class="canvas" :width="boxX" :height="boxY"></canvas>
      <div class="point">
        <p>point:<span>{{point}}</span></p>
      </div>
    </div>
    <div style="text-align: center">
      <button @click="createInit">start</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  let rect1=[[1,1],[0,1],[0,1]];
  let rect2=[[0,1,0],[1,1,1]];
  let rect3=[[1,1,1,1]];
  let rect4=[[1,0],[1,1],[0,1]];
  let rect5=[[1,1],[1,1]];
  let rectArr=[rect1,rect2,rect3,rect4,rect5];
  let resultArray=[];
  let unitLen=20;
  let ctx;
  let range=rectArr.length;
  let rectX=0;
  let rectY=0;
  let timer;
  export default {
    components: {

    },
    name: 'eroshi',
    data () {
      return {
        msg:'world one!!!',
        boxX:500,
        boxY:500,
        point:0,
        currentRect:null,
        extraX:0,
        extraY:0,
        reachedBottom:false
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
        for(let i=0;i<this.boxX/unitLen;i++)
        {
          let row=[];
          for(let j=0;j<this.boxY/unitLen;j++)
          {
            row[j]=0;
          }
          resultArray[i]=row;
        }
        this.clearPaint();
        const Rand = Math.random();
        this.currentRect=Math.floor(Rand * range);
        this.createRect(rectArr[this.currentRect]);
        this.currentArr();
        timer=window.setInterval(this.downTimer, 300);
      },
      InitData(){
        this.currentRect=null;
        this.extraX=0;
        this.extraY=0;
        rectX=0;
        rectY=0;
        const Rand = Math.random();
        this.currentRect=Math.floor(Rand * range);
        this.createRect(rectArr[this.currentRect]);
        this.currentArr();
      },
      createRect(arr){
        for(let i=0;i<arr.length;i++){
          for(let j=0;j<arr[i].length;j++){
            if(arr[i][j]==1){
              resultArray[i][j]=arr[i][j]
            }
          }
        }
      },
      getDirection(e){
        let keyCode = e.which || e.keyCode;
        switch(keyCode){
          case 38:
          case 87:
            return 'up';
            break;
          case 40:
          case 83:
            return 'down';
            break;
          case 37:
          case 65:
            return 'left';
            break;
          case 39:
          case 68:
            return 'right';
            break;
          case 27:
          case 80:
            return 'pause';
            break;
        }
      },
      moveShape(e){
        if(this.getDirection(e)=='up') {
          console.log('up')
        }
        if(this.getDirection(e)=='down') {
          this.clearPaint();
          if(rectY>this.boxY-2*this.extraY){
            rectY=this.boxY-this.extraY;
            this.checkBottom();
            return false
          }else {
            rectY+=unitLen;
          }
          this.currentArr(rectArr[this.currentRect]);
        }
        if(this.getDirection(e)=='left') {
          this.clearPaint();
          if(rectX<unitLen){
            rectX=0;
          }else {
            rectX-=unitLen;
          }
          this.currentArr(rectArr[this.currentRect]);
        }
        if(this.getDirection(e)=='right') {
          this.clearPaint();
          if(rectX>this.boxX-2*this.extraX){
            rectX=this.boxX-this.extraX
          }else {
            rectX+=unitLen;
          }
          this.currentArr(rectArr[this.currentRect]);
        }
        if(this.getDirection(e)=='pause') {
          console.log('pause')
        }
      },
      downTimer(){
        this.clearPaint();
        let tempArr=[];
        for(let i=0;i<this.boxX/unitLen;i++)
        {
          let row=[];
          for(let j=0;j<this.boxY/unitLen;j++)
          {
            row[j]=0;
          }
          tempArr[i]=row;
        }
        if(!this.reachedBottom){
          for(let i=0;i<resultArray.length;i++){
            for(let j=0;j<resultArray[i].length;j++){
              if(resultArray[i][j]==1){
                tempArr[i+1][j]=1;
              }
            }
          }
        }else {
          this.reachedBottom=false;
          this.InitData();
          clearInterval(timer);
        }
        for(let i=0;i<resultArray.length;i++){
          for(let j=0;j<resultArray[i].length;j++){
            if(tempArr[i][j]==1){
              resultArray[i][j]=tempArr[i][j];
            }
          }
        }
        console.log(resultArray);
        this.currentArr();
        tempArr[resultArray.length-1].map(item=>{if(item==1){
          this.checkBottom()
        }});
      },
      checkBottom(){
        this.reachedBottom=true;
        /*clearInterval(timer);*/
      },
      clearPaint(){
        ctx.clearRect(0,0,this.boxX,this.boxY);
      },
      currentArr(){
        let edgeArrX=[];
        let edgeArrY=[];
        for(let i=0;i<resultArray.length;i++){
          for(let j=0;j<resultArray[i].length;j++){
            if(resultArray[i][j]==1){
              this.drawRect(j*unitLen,i*unitLen);
            }
          }
        }
        /*const edgeX=Math.max.apply({},edgeArrX);
        const edgeY=Math.max.apply({},edgeArrY);
        switch(edgeX){
          case 0:
            this.extraX=unitLen;
            break;
          case 1:
            this.extraX=2*unitLen;
            break;
          case 2:
            this.extraX=3*unitLen;
            break;
          case 3:
            this.extraX=4*unitLen;
            break;
        }
        switch(edgeY){
          case 0:
            this.extraY=unitLen;
            break;
          case 1:
            this.extraY=2*unitLen;
            break;
          case 2:
            this.extraY=3*unitLen;
            break;
          case 3:
            this.extraY=4*unitLen;
            break;
        }*/

      },
      drawRect(x,y){
        ctx.fillStyle="red";
        ctx.strokeStyle="black";
        ctx.lineWidth=1;
        ctx.fillRect(x,y,unitLen,unitLen);
        ctx.strokeRect(x,y,unitLen,unitLen)
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
  .point{
    position: fixed;
    width: 300px;
    height: 60px;
    top: 50%;
    margin-top: -30px;
    line-height: 60px;
    right: 10%;
    background-color: yellowgreen;
    text-align: left;
    padding-left: 20px;
    font-size: 24px;
  }
  .point span{
    margin-left: 10px;
    color: red;
    font-size: 36px;
  }
</style>
