<template>
  <div class="game_home">
    <img class="home_bg" src="../assets/gameHome_bg.jpg" alt="">
      <img class="game_return" src="../assets/game4return.png" @click="backRn" alt="">
      <div class="game_both">
      <img class="game_home1" src="../assets/truth.png" @click="game_home2" alt="">
      <img class="game_home2" src="../assets/threePark.png" @click="game_home3" alt="">
      </div>
      <img class="pageup" src="../assets/gameHome_Up.png" @click="pageup" alt="">
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'game_home',
  data () {
    return {
      timeOut: '',//定义计时器(1)
      gameReturnTime:null,
    }
  },
  created(){
     
  },
  mounted(){
      this.isTimeOut()//开启计时器
  },
  destroyed(){
      clearTimeout(this.timeOut)
  },
  methods: {
     //页面规定时间内无操作时返回首页
    startTimer() {
         let that = this;
         if(localStorage.getItem('gameReturnTime')){
           var gameReturnTime = localStorage.getItem('gameReturnTime')
         }else{
           var gameReturnTime = 60
         }
        clearTimeout(that.timeOut);
        that.timeOut = setTimeout(function () {
          that.backRn()//返回主页
        },1000*gameReturnTime)
    },
    isTimeOut() {
      let that = this;
      if(that.$route.path == "/homeNext") {
        that.startTimer();//开启计时器
      }
    },
    //Game1:酒吧轮盘 Game2:真心话大冒险 Game3:逛三园 Game4:骰子游戏
    game_home2(){
        this.$router.push({name:'Game2'})
    },
    game_home3(){
        this.$router.push({name:'Game3'})
        window.postMessage('Game3');
    },
    pageup(){
      this.$router.push({name:'gameHome'})
    },
    backRn(){
      window.postMessage('gameHome');
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .game_home{
    width: 1024px;
    height: 100vh;
    position: relative;
 }
 .home_bg{position: absolute;width: 1024px;height: 600px;left: 0%;}
  .game_return{position: absolute;top: 0;right: 0;left: 0;margin: auto;z-index: 600;}
 .game_both{position: relative;height: 540px}
 .game_home1,.game_home2{width: 395px;height: 397px}
  .game_home1{position: absolute;top: 100px;left: 50px}
  .game_home2{position: absolute;top: 100px;right:55px}
  .pageup{position: relative;z-index: 500;transform: translateX(-430px)}
</style>
