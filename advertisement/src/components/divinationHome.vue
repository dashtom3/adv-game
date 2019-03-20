<template>
  <div class="divination_home">
      <img class="bg" src="../assets/test_bg.jpg" alt="">
      <img class="game_return" src="../assets/divinationHome_back.png" @click="backRn" alt="">
      <!-- <div v-show="!isShowPage" class="pageup"  @click="pageup">
        <img src="../assets/testPageup.png" alt="">
      </div> -->
       <div class="test_list">
          <img src="../assets/testDringk.png" @click="clickDrink" alt="">
          <img src="../assets/testPoor.png" @click="clickPoor" alt="">
          <img src="../assets/testLover.png" @click="clickLover" alt="">
      </div>
      <img class="pagedown" src="../assets/testPagedown.png" @click="pagedown" alt="">
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'divinationHome',
  data () {
    return {
      timeOut:'',//定义计时器(3)
      isShowPage:true,
      isshowbutton:true,
      gameReturnTime:null,
    }
  },
  created(){
      window.document.addEventListener('message', function(e) {//注册事件 接收数据
            localStorage.setItem('gameReturnTime',e.data)
            window.postMessage(e.data);
        })
  },
  mounted(){
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
      if(that.$route.path == "/divinationHome") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
    //点击下页
    pagedown(){
      // this.isShowPage = !this.isShowPage
      this.$router.push({name:'divinationHomedown'})
    },
    
    //你喝醉是什么样的
    clickDrink(){
      console.log('进入喝醉')
      this.$router.push({name:'testDrink'})
      window.postMessage('saveEnterDrink')
    },
    //测测还会穷多久
    clickPoor(){
      console.log('还会穷多久')
      this.$router.push({name:'testPoor'})
      window.postMessage('saveEnterPoor')
    },
    //测测你的爱人
    clickLover(){
      // console.log('点击进入爱人')
      this.$router.push({name:'divinationLover'})
       window.postMessage('saveEnterLover')
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
 .pageup{position: absolute;width:125px;height:37px;left: 10px;bottom: 10px;z-index: 100;}
  .pagedown{width:125px;height:37px;margin-top: -50px;transform:translateX(430px)}
  .test_list{display: flex;height:570px;flex-direction:row; justify-content:space-around;align-items: center; width:994px;margin: auto;padding-top: 15px}
  .test_listB img{width: 226px;height: 398px}
  .test_listB{display: flex;height:570px;flex-direction:row; justify-content:space-around;align-items: center; width:994px;margin: auto;padding-top: 6px}
</style>
