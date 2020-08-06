<template>
  <div id="snake" style="width:100%;position: relative;margin: 0 auto;z-index: 1">
    <canvas id="bgImage" width="1920" height="1080"></canvas>
    <div class="canvasContent">
      <div>{{msg}}</div>
      <canvas id="canvas" class="canvas" :width="boxX" :height="boxY"></canvas>
    </div>
    <div class="link play-link startButton">
      <span class="animated"></span>
      <a @click="createInit" class="button">
        <span class="line line-top"></span>
        <span class="line line-right"></span>
        <span class="line line-bottom"></span>
        <span class="line line-left"></span>
        <span v-if="isPause">start</span>
        <span v-else>pause</span>
      </a>
    </div>
    <div class="cc">
      <span @click="changeLevel" v-if="isPause">以地狱难度进行</span>
      <span v-else>score:{{score}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'

  let snake = {
    startX: 3, //开始头x坐标
    startY: 0, //开始头y坐标
    mes: [{x: 3, y: 0}, {x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}]
  };
  let resultArray = [];
  let unitLen = 20;
  let ctx, timer, timerAnother;

  export default {
    components: {},
    name: 'snake',
    data() {
      return {
        msg: 'world one!!!',
        isPause: true, //false是运行状态，true是暂停状态
        isExist: false,//false point不存在，true存在
        boxX: 600,
        boxY: 600,
        point: {x: null, y: null},
        direction: 'right',
        level: 200,
        score: 0
      }
    },
    created() {
    },
    mounted() {
      this.bindEvent();
      this.starA();
      let h = $(window).height()
      $("#snake").height(h);
    },
    updated() {

    },
    methods: {
      changeLevel() {
        this.level = 50;
        this.createInit()
      },
      createInit() {
        ctx = document.getElementById("canvas").getContext('2d');
        document.addEventListener('keydown', this.moveShape, false);
        for (let i = 0; i < this.boxX / unitLen; i++) {
          let row = [];
          for (let j = 0; j < this.boxY / unitLen; j++) {
            row[j] = 0;
          }
          resultArray[i] = row;
        }
        this.clearPaint();
        this.drawSnake();
        this.isPause = !this.isPause;
        if (this.isPause) {
          clearInterval(timer);
        } else {
          timer = window.setInterval(this.autoMove, this.level);
          timerAnother = window.setTimeout(this.getPoint, 1000);
        }
      },
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
        }
      },
      moveShape(e) {
        if (this.getDirection(e) === 'up') {
          this.direction = "up"
        }
        if (this.getDirection(e) === 'down') {
          this.direction = "down"
        }
        if (this.getDirection(e) === 'left') {
          this.direction = "left"
        }
        if (this.getDirection(e) === 'right') {
          this.direction = "right"
        }
        if (this.getDirection(e) === 'pause') {
          this.isPause = !this.isPause;
          if (this.isPause) {
            clearInterval(timer);
          } else {
            timer = window.setInterval(this.autoMove, this.level)
          }

        }
      },
      autoMove() {
        const head = snake.mes[0];
        switch (this.direction) {
          case 'right':
            if (this.checkCrashWall() && this.checkCrashSelf()) {
              if (head.x === this.point.x && head.y === this.point.y) {
                this.getPoint();
                this.addBody();
                this.score += 100;
              }
              this.clearPaint();
              snake.mes[0] = {x: head.x + 1, y: head.y};
              this.move(head);
              this.drawSnake();
              this.drawPoint()
            } else {
              console.log('over');
              clearInterval(timer);
              alert('菜鸡儿');
              location.reload();
            }
            break;
          case 'left':
            if (this.checkCrashWall() && this.checkCrashSelf()) {
              if (head.x === this.point.x && head.y === this.point.y) {
                this.getPoint();
                this.addBody();
                this.score += 100;
              }
              this.clearPaint();
              snake.mes[0] = {x: head.x - 1, y: head.y};
              this.move(head);
              this.drawSnake();
              this.drawPoint()
            } else {
              console.log('over');
              clearInterval(timer);
              alert('菜鸡儿');
              location.reload();
            }
            break;
          case 'down':
            if (this.checkCrashWall() && this.checkCrashSelf()) {
              if (head.x === this.point.x && head.y === this.point.y) {
                this.getPoint();
                this.addBody();
                this.score += 100;
              }
              this.clearPaint();
              snake.mes[0] = {x: head.x, y: head.y + 1};
              this.move(head);
              this.drawSnake();
              this.drawPoint()
            } else {
              console.log('over');
              clearInterval(timer);
              alert('菜鸡儿');
              location.reload();
            }
            break;
          case 'up':
            if (this.checkCrashWall() && this.checkCrashSelf()) {
              if (head.x === this.point.x && head.y === this.point.y) {
                this.getPoint();
                this.addBody();
                this.score += 100;
              }
              this.clearPaint();
              snake.mes[0] = {x: head.x, y: head.y - 1};
              this.move(head);
              this.drawSnake();
              this.drawPoint()
            } else {
              console.log('over');
              clearInterval(timer);
              alert('菜鸡儿');
              location.reload();
            }
            break;
        }
      },
      move(head) {
        let tmp;
        for (let i = 1; i < snake.mes.length; i++) {
          tmp = snake.mes[i];
          snake.mes[i] = head;
          head = tmp;
        }
      },
      checkCrashWall() {
        let head = snake.mes[0];
        if (head.x < 0 || head.y < 0) {
          return false;
        }
        if (head.x > (this.boxX / unitLen - 1) || head.y > (this.boxY / unitLen - 1)) {
          return false;
        }
        return true
      },
      checkCrashSelf() {
        let head = snake.mes[0];
        for (let i = 1; i < snake.mes.length; i++) {
          if (snake.mes[i].x === head.x && snake.mes[i].y === head.y) {
            return false;
          }
        }
        return true;
      },
      addBody() {
        let first = snake.mes[0];//首项
        let len = snake.mes.length; //项数
        let last = {x: (first.x - (len - 1)) - 1, y: (first.y - (len - 1)) - 1};
        /*末项=首项+(项数-1)×公差*/
        snake.mes.push(last);
      },
      getPoint() {
        this.point.x = null;
        this.point.y = null;
        const randX = Math.random();
        const randY = Math.random();
        this.point.x = Math.floor(randX * this.boxX / unitLen);
        this.point.y = Math.floor(randY * this.boxY / unitLen);
        this.isExist = true;
        this.drawPoint();
      },
      clearPaint() {
        ctx.clearRect(0, 0, this.boxX, this.boxY);
      },
      drawSnake() {
        ctx.fillStyle = "#789262";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for (let i = 0; i < snake.mes.length; i++) {
          ctx.fillRect(snake.mes[i].x * unitLen, snake.mes[i].y * unitLen, unitLen, unitLen);
          ctx.strokeRect(snake.mes[i].x * unitLen, snake.mes[i].y * unitLen, unitLen, unitLen);
        }
        ctx.fillStyle = "#be002f";
        ctx.fillRect(snake.mes[0].x * unitLen, snake.mes[0].y * unitLen, unitLen, unitLen);
        ctx.strokeRect(snake.mes[0].x * unitLen, snake.mes[0].y * unitLen, unitLen, unitLen);
      },
      drawPoint() {
        let r, g, b;
        r = Math.round(Math.random() * 255);
        g = Math.round(Math.random() * 255);
        b = Math.round(Math.random() * 255);
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.strokeStyle = "black";
        if (this.isExist === true) {
          ctx.fillRect(this.point.x * unitLen, this.point.y * unitLen, unitLen, unitLen);
          ctx.strokeRect(this.point.x * unitLen, this.point.y * unitLen, unitLen, unitLen);
        }
      },
      bindEvent() {
        window.addEventListener('contextmenu', function (e) {
          e.returnValue = false;
        });
      },
      starA() {
        var canvas = document.getElementById('bgImage'),
          ctx = canvas.getContext('2d'),
          w = canvas.width = window.innerWidth,
          h = canvas.height = window.innerHeight,

          hue = 217,
          stars = [],
          count = 0,
          maxStars = 1300;//星星数量

        var canvas2 = document.createElement('canvas'),
          ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width / 2,
          gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

// End cache

        function random(min, max) {
          if (arguments.length < 2) {
            max = min;
            min = 0;
          }

          if (min > max) {
            var hold = max;
            max = min;
            min = hold;
          }

          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
          var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
          return diameter / 2;
          //星星移动范围，值越大范围越小，
        }

        var Star = function () {

          this.orbitRadius = random(maxOrbit(w, h));
          this.radius = random(60, this.orbitRadius) / 8;
          //星星大小
          this.orbitX = w / 2;
          this.orbitY = h / 2;
          this.timePassed = random(0, maxStars);
          this.speed = random(this.orbitRadius) / 50000;
          //星星移动速度
          this.alpha = random(2, 10) / 10;

          count++;
          stars[count] = this;
        }

        Star.prototype.draw = function () {
          var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

          if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
          } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
          }

          ctx.globalAlpha = this.alpha;
          ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
          this.timePassed += this.speed;
        }

        for (var i = 0; i < maxStars; i++) {
          new Star();
        }

        function animation() {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.5; //尾巴
          ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
          ctx.fillRect(0, 0, w, h);

          ctx.globalCompositeOperation = 'lighter';
          for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
          }
          ;

          window.requestAnimationFrame(animation);
        }

        animation()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../css/buttonStyle.css";

  #snake {
    background-image: url("../../../static/Starry.jpg");
  }

  p, button {
    margin: 0;
    padding: 0;
  }

  .canvasContent {
    text-align: center;
    margin: 0 auto;
  }

  #snake {
    font-size: 0.16rem;
  }

  #canvas {
    border: black 1px solid;
    background-color: rgba(255, 255, 255, 0.8);
    /*background-color: rgba(158,208,72,0.5);*/
    box-shadow: -15px 15px 15px rgba(6, 17, 47, .7);
  }

  .cc {
    position: fixed;
    width: 3rem;
    height: 0.6rem;
    top: 50%;
    margin-top: -0.3rem;
    line-height: 0.6rem;
    right: 10%;
    background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
    text-align: center;
    font-size: 0.24rem;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, .7);
    opacity: 1;
    transition-property: transform, opacity, box-shadow, top, left;
    transition-duration: 0.5s;
    transform-origin: 161px 100%;
    transform: rotateX(0deg);
    z-index: 10;
  }

  .cc span {
    cursor: pointer;
    color: red;
    font-size: 0.36rem;
  }

  .startButton {
    text-align: left;
    margin-top: 0.45rem;
    position: fixed;
    right: calc(50% - 0.90rem);
    z-index: 3;
    cursor: pointer;
  }

  #bgImage {
    position: fixed;
    opacity: 0.2;
    z-index: 1;
  }
</style>
