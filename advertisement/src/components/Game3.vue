<template>
  <div>
    <img class="home_bg" src="../assets/game3_bg.png" alt="">
    <img class="game3_return" src="../assets/game_home_return.png" @click="backRn" alt="">
    <div v-if="showHome">
    <img class="game3_play" src="../assets/game3_play.png" @click="play" alt="">
    </div>
    <img class="return" src="../assets/game3_return.png"  @click="goback" alt="">
    <div v-if="showPlay">
        <img class="dialog" src="../assets/game3Dialog.png" alt="">
        <img class="sure" src="../assets/game3sure.png" @click="sure" alt="">
        <p class="showText">{{showText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game3',
  data () {
    return {
        timeOut:'',//计时器(4)
        gameReturnTime:null, //存储返回时间
        showHome:true,
        showPlay:false,
        showArr:['动物园','中国城市园','蔬菜园','汽车园','AV女优园','互联网公司园','避孕套品牌园','性爱姿势园','啤酒园','化妆品品牌园','周杰伦歌曲园','海洋生物园','火锅涮菜园','耳机品牌园','手游园','社交软件园','港台男明星园','大陆女歌手园','还珠格格角色园','办公用品园','国内大学园','漫威人物园','内衣品牌园','卫生巾品牌园'],
        showText:'',
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
},
  methods: {
      //页面规定时间内无操作时返回首页
    startTimer() {
         let that = this;
        clearTimeout(that.timeOut);
        that.timeOut = setTimeout(function () {
          window.postMessage('gameHome');//返回主页
        },1000*that.gameReturnTime)
    },
    isTimeOut() {
      let that = this;
      if(that.$route.path == "/Game3") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
      //返回主页
    backRn(){
      window.postMessage('gameHome');
     },
        //游戏开始
    play(){
        this.startTimer()//开启计时
        this.showHome = false
        this.showPlay = true
        this.showText = this.showArr[Math.floor(Math.random()* (this.showArr.length))]
        window.postMessage('Game3play');
    },
    //返回上一页
    goback(){
        this.$router.push({name:'gameHomeNext'});
    },
    //确定按钮
    sure(){
        this.showHome = true
        this.showPlay = false
        this.startTimer()//开启计时
    }
  }
}
</script>

<style  scoped>
.game3_return{position: absolute;top: 0;right: 0;left: 0;margin: auto;z-index: 600;}
.game3_play{position: absolute;bottom: 30px;left: 0;right: 0;margin: auto;}
.return{position: absolute;bottom: 20px;right: 20px;}
.dialog{position: absolute;top: 80px;width: 396px;left: 0;right: 0;margin: auto;}
.sure{position: absolute;top: 370px;width: 177px;left: 0;right: 0;margin: auto;}
.showText{position: absolute;top: 150px;width: 300px;left:0;right: 0;margin: auto;color: #FF6C00;font-size: 50px;font-family: 'Microsoft YaHei';font-weight: 600}
</style>
