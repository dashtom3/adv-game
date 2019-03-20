<template>
  <div class="divination_home">
      <img class="bg" src="../assets/test_bg.jpg" alt="">
      <img class="game_return" src="../assets/divinationHome_back.png" @click="backRn" alt="">
      <div  class="pageup"  @click="pageup">
        <img src="../assets/testPageup.png" alt="">
      </div>
      <div class="test_listB">
        <img src="../assets/testLast.png" @click="clickLast" alt="">
        <img src="../assets/testCar.png" @click="clickCar" alt="">
        <img src="../assets/testBirthday.png" @click="clickBirthday" alt="">
      </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'divinationHome',
  data () {
    return {
      timeOut:'',//计时器(1)
      gameReturnTime:null, //存储返回时间
      isShowPage:false,
      isshowbutton:true,
      gameReturnTime:null,
    }
  },
  created(){
      
  },
  mounted(){
    if(localStorage.getItem('gameReturnTime')){
           this.gameReturnTime = localStorage.getItem('gameReturnTime')
         }else{
           this.gameReturnTime = 60
         }
    this.isTimeOut()//开启计时
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
      if(that.$route.path == "/divinationHomedown") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
    //点击上一页
    pageup(){
      this.$router.push({name:'divinationHome'})
    },
    //测测你适合开什么车
    clickCar(){
      console.log('你适合开什么车')
      this.$router.push({name:'testCar'})
      window.postMessage('saveEnterCar')
    },
    //点击上一世游戏
    clickLast(){
        this.$router.push({name:'divination'})
        window.postMessage('saveEnterPhone')
    },
    //点击进入明星生日匹配
    clickBirthday(){
      // console.log('进入明星生日匹配')
        this.$router.push({name:'birthday'})
        window.postMessage('saveEnterBirth')
    },
    backRn(){
      window.postMessage('gameHome');
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .divination_home{
    width: 1024px;
    height: 100vh;
    position: relative;
    
 }
 .bg{position: absolute;width: 1024px;height: 600px;top: 0;left: 0;z-index: -200;overflow: hidden;}
 .game_return{position: absolute;top: 0;right: 0;left: 0;margin: auto}
 .test_list img{width: 226px;height: 398px;padding-top: 10px}
 .pageup{position: absolute;width:125px;height:37px;left: 15px;bottom: 15px;z-index: 100;}
  .pagedown{width:125px;height:37px;margin-top: -50px;transform:translateX(430px)}
  .test_list{display: flex;height:570px;flex-direction:row; justify-content:space-around;align-items: center; width:994px;margin: auto;padding-top: 15px}
  .test_listB img{width: 226px;height: 398px;padding-top: 25px}
  .test_listB{display: flex;height:570px;flex-direction:row; justify-content:space-around;align-items: center; width:994px;margin: auto;padding-top: 6px}
</style>
