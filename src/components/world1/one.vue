<template>
  <div id="one" style="width:100%;position: relative;margin: 0 auto">
    <div class="canvasContent">
      <div>{{msg}}</div>
      <canvas id="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  export default {
    components: {

    },
    name: 'one',
    data () {
      return {
          msg:'world one!!!'
      }
    },
    created(){
      console.log(this.ma(1,8,-21))
    },
    mounted() {


      let world = new p2.World({
        gravity:[0, -9.82]
      });
      var circleBody = new p2.Body({
        mass:5,
        position:[0,10]
      });
      var groundShape = new p2.Plane();
      var groundBody = new p2.Body({
        mass:0
      });
      groundBody.addShape(groundShape);
      world.addBody(circleBody);
      world.addBody(groundBody);
      var timeStep = 1/60;
      /*setInterval(function(){
        world.step(timeStep);
        console.log("Circle x position: " + circleBody.position[0]);
        console.log("Circle y position: " + circleBody.position[1]);
        console.log("Circle angle: " + circleBody.angle);
      }, 1000 * timeStep);*/
      console.log('1')
    },
    updated(){

    },
    methods: {

      ma(a,b,c){
        console.log(this.calc)
        let x1,x2;
        if(this.calc.Sub(this.calc.Mul(b,b),4*this.calc.Mul(a,c))<0){
//          x1=(this.calc.Sub(-b , Math.pow(this.calc.Sub(this.calc.Mul(b,b),4*this.calc.Mul(a,c)),0.5)))/2*a;
//          x2=(this.calc.Add(-b , Math.pow(this.calc.Sub(this.calc.Mul(b,b),4*this.calc.Mul(a,c)),0.5)))/2*a;
        }else {
//          x1=(this.calc.Sub(-b , Math.pow(this.calc.Sub(this.calc.Mul(b,b),4*this.calc.Mul(a,c)),0.5)))/2*a;
//          x2=(this.calc.Add(-b , Math.pow(this.calc.Sub(this.calc.Mul(b,b),4*this.calc.Mul(a,c)),0.5)))/2*a
        }
        return {x1,x2}
      },
    }
  }
</script>

<style scoped>
  .canvasContent{
    text-align: center;
    margin: 0 auto;
  }
</style>
