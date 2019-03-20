<template>
  <div>
      <img class="game4_return" src="../assets/game4return.png" @click="backRn" alt="">
     <div v-if="showHome">
    <img src="../assets/game4Home_bg.png" alt="">
    <img class="game3_play" src="../assets/game3_play.png" @click="play" alt="">
    <img class="back" src="../assets/ringReturn.png" @click="goBack" alt="">
    </div>
    <div v-if="!showHome">
        <img src="../assets/dice_bg.png" alt="">
        <img class="diceReturn" src="../assets/dice_return.png" @click="goBack" alt="">
        <img class="shake" src="../assets/dice_shake.png" @click="shakeButton" alt="">
        <div v-if="isplay">
            <img class="cap" id="cap" src="../assets/dice_cap.png" alt="">
        </div>
        <div v-if="isOpen">
            <img class="cap1" src="../assets/dice_open.png" alt="">
            <img class="dice1" :src="showImage[num]" alt="">
            <img class="dice2" :src="showImage1[num1]" alt="">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
        timeOut:'',//计时器(3)
        gameReturnTime:null, //存储返回时间
        showHome:true,
        isplay:true,
        isOpen:false,
        flag:true,
        num:0,
        num1:1,
        showImage:[require('../assets/dice1.png'),require('../assets/dice2.png'),require('../assets/dice3.png'),require('../assets/dice4.png'),require('../assets/dice5.png'),require('../assets/dice6.png')],
        showImage1:[require('../assets/dice1.png'),require('../assets/dice2.png'),require('../assets/dice3.png'),require('../assets/dice4.png'),require('../assets/dice5.png'),require('../assets/dice6.png')],
    }
  },
mounted() {
    if(localStorage.getItem('gameReturnTime')){
           this.gameReturnTime = localStorage.getItem('gameReturnTime')
     }else{
           this.gameReturnTime = 60
         }
     this.isTimeOut()//开启计时 
},
destroyed(){
    clearTimeout(this.timeOut)
    console.log(this.timeOut)
},
  methods: {
       //页面规定时间内无操作时返回首页
    startTimer() {
         let that = this;
        clearTimeout(that.timeOut);
        that.timeOut = setTimeout(function () {
          that.backRn()//返回主页
        },1000*that.gameReturnTime)
    },
    isTimeOut() {
      let that = this;
      if(that.$route.path == "/Game4") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
      //返回安卓首页
      backRn(){
          window.postMessage('gameHome');
      },
      play(){
          this.showHome = !this.showHome
          this.startTimer()//开启计时
      },
      //返回上一页
      goBack(){
            this.$router.push({name:'gameHome'});
      },
      //开始游戏
      shakeButton(){
          var this_ = this
          var e = document.getElementById('cap')  
          if(this_.isOpen == false){
            $('.cap').addClass('shaking')     
          e.addEventListener("webkitAnimationEnd",function(){  
            this_.isplay = false
            this_.isOpen = true 
            this_.num = Math.floor(Math.random()*6)
            this_.num1 = Math.floor(Math.random()*6)  
        },false);
          }else{
            this_.isplay = true
            this_.isOpen = false
            var timer = setTimeout(function(){
              $('.cap').addClass('shaking')
              window.postMessage('Game4play'); 
            },500)        
          }
          if(this.flag == true){
            this.flag = false
            window.postMessage('Game4play'); 
            
          }
          this.startTimer()//开启计时
      }
  }
}
</script>

<style  scoped>
@-webkit-keyframes myshake{
    0% {
    -webkit-transform: rotate(45deg);
  }
  20% {
    -webkit-transform: rotate(-45deg);
  }
  30% {
    -webkit-transform: rotate(30deg);
  }
  40% {
    -webkit-transform: rotate(-30deg);
  }
  50%,100% {
    -webkit-transform: rotate(0deg);
  }
}
/* @keyframes myshake{
    0% {
    transform: rotate(45deg);   
  }
  20% {
    transform: rotate(-45deg);
  }
  30% {
    transform: rotate(30deg);
  }
  40% {
    transform: rotate(-30deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
} */

.game4_return{position: absolute;top: 0;right: 0;left: 0;margin: auto;z-index: 600;}
.game3_play{position: absolute;bottom: 30px;left: 0;right: 0;margin: auto;}
.back{position: absolute;right: 10px;bottom: 10px}
.diceReturn{position: absolute;width: 77px;right: 30px;bottom: 30px}
.shake{position: absolute;width: 235px;left: 0;right: 0;bottom: 60px;margin: auto;}
.shaking{-webkit-animation:myshake 1.5s linear;animation:myshake 1.5s linear;}
.cap{position: absolute;left: 380px;top: 100px;width: 262px;}
.cap1{position: absolute;left: 380px;top: 40px;width: 435px;}
.dice1{position: absolute;left:430px;top: 260px}
.dice2{position: absolute;left:500px;top: 280px}
</style>
