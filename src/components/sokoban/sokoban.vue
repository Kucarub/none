<template>
  <div id="sokoban" style="width: 100%;position: relative;margin: 0 auto;text-align: center;font-size: 0.16rem">
    <h1>{{ msg }}</h1>
    <canvas id="canvas" class="canvas" :width="boxX" :height="boxY"></canvas>
    <button @click="createInit">start</button>
  </div>
</template>

<script>
  import $ from 'jquery'

  const image = document.createElement("img");
  image.src = "../../../static/allow.png";
  let mainRole = {
    startX: 1,
    startY: 0,
    mes: {x: this.startX, y: this.startY}
  };
  let boxRole = [{
    startX: 6,
    startY: 3,
    successFlag: false
  }, {
    startX: 5,
    startY: 2,
    successFlag: false
  }
  ];
  let unitLen = 20; //单位长度
  let ctx, timer, timerAnother;

  export default {

    name: 'sokoban',
    data() {
      return {
        msg: 'sokoban',
        boxX: 600,
        boxY: 600,
        direction: 'right',
        stage: [1, 2, 3]
      }
    },
    mounted() {

    },
    methods: {
      createInit() {
        ctx = document.getElementById("canvas").getContext('2d');
        document.addEventListener('keydown', this.moveShape, false);
        this.createMainRole();
      },
      /*功能区*/
      getDirection(e) {
        let keyCode = e.which || e.keyCode;
        switch (keyCode) {
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
          default:
            return 'void';
            break;
        }
      }
      ,
      moveShape(e) {
        console.log(this.direction);
        if (this.getDirection(e) === 'up') {
          this.direction = "up"
        }
        else if (this.getDirection(e) === 'down') {
          this.direction = "down"
        }
        else if (this.getDirection(e) === 'left') {
          this.direction = "left"
        }
        else if (this.getDirection(e) === 'right') {
          this.direction = "right"
        }
        else if (this.getDirection(e) === 'pause') {
          this.isPause = !this.isPause;
        } else {
          this.direction = "void"
        }
        this.move(mainRole)
      }
      , move(role) {
        console.log(role);
        let tmp;
        switch (this.direction) {
          case 'right':
            role.startX++;
            if (role.startX > (this.boxX / unitLen - 1)) {
              role.startX = (this.boxX / unitLen - 1)
            }
            if (this.checkCrashWall(role) && this.checkCrashBox(role)) {
              this.clearPaint();
              this.createMainRole();
            } else {
              console.log('xxx')
            }

            break;
          case 'left':
            role.startX--;
            if (role.startX < 0) {
              role.startX = 0
            }
            if (this.checkCrashWall(role) && this.checkCrashBox(role)) {
              this.clearPaint();
              this.createMainRole();
            } else {
              console.log('xxx')
            }

            break;
          case 'down':
            role.startY++;
            if (role.startY > (this.boxY / unitLen - 1)) {
              role.startY = this.boxY / unitLen - 1
            }
            if (this.checkCrashWall(role) && this.checkCrashBox(role)) {
              this.clearPaint();
              this.createMainRole();
            } else {
              console.log('xxx')
            }

            break;
          case 'up':
            role.startY--;
            if (role.startY < 0) {
              role.startY = 0
            }
            if (this.checkCrashWall(role) && this.checkCrashBox(role)) {
              this.clearPaint();
              this.createMainRole();
            } else {
              console.log('xxx')
            }

            break;
          default:
            break
        }
      },
      /*绘画区*/
      clearPaint() {
        ctx.clearRect(0, 0, this.boxX, this.boxY);
      },
      createMainRole() {
        ctx.drawImage(image, mainRole.startX * unitLen, mainRole.startY * unitLen, unitLen, unitLen);
        this.drawRect(boxRole);
      },
      drawRect(obj) {
        ctx.fillStyle = "#789262";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for (let i = 0; i < obj.length; i++) {
          ctx.fillRect(obj[i].startX * unitLen, obj[i].startY * unitLen, unitLen, unitLen);
          ctx.strokeRect(obj[i].startX * unitLen, obj[i].startY * unitLen, unitLen, unitLen);
        }
      },
      /*判定区*/
      checkCrashWall(obj) {
        if (obj.startX < 0 || obj.startY < 0) {
          return false;
        }
        if (obj.startX > (this.boxX / unitLen - 1) || obj.startY > (this.boxY / unitLen - 1)) {
          return false;
        }
        return true
      },
      checkCrashBox(obj) {
        let box = boxRole;
        for (let i = 0; i < box.length; i++) {
          if (obj.startX === box[i].startX && obj.startY === box[i].startY) {
            return false;
          }
        }
        return true
      }
    }
  }
</script>

<style scoped lang="scss">
  #canvas {
    border: black 1px solid;
    background-color: rgba(255, 255, 255, 0.8);
    /*background-color: rgba(158,208,72,0.5);*/
    box-shadow: -15px 15px 15px rgba(6, 17, 47, .3);
  }
</style>
