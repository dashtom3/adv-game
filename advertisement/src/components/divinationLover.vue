<template>
  <div style="overflow:hidden">
      <img v-if="!dialog" class="return" src="../assets/ringReturn.png" @click="goback" alt="">
      <img v-if="!dialog" class="ringtxt" src="../assets/ringText.png" alt="">
    <div class="ringDiv">
        <img src="../assets/ringA.png" @click="ringA" alt="">
         <img src="../assets/ringB.jpg" @click="ringB" alt="">
        <img src="../assets/ringC.jpg" @click="ringC" alt="">
        <img src="../assets/ringD.jpg" @click="ringD" alt="">
    </div>
    <div v-if="dialog" class="dialog">
        <img :src="dialogSrc[num]" alt="">
        <img class="dialogreturn" src="../assets/ringReturn.png" @click="goback" alt="">
        <p>{{dialogtxt[num]}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
        timeOut:'',//计时器(5)
        gameReturnTime:null, //存储返回时间
        dialog:false,
        num:0,
        dialogtxt:['在你的心中爱人是非常的重要，而在爱人的心中你也是非常重要的一个人。你会为了他付出很多，而爱人也会为你付出很多。对于你来说，你只要是自己认定的东西，你就算失去很多，你也会要得到。在爱情中，爱人总是像一个守护神一样一直保护在你的身边，不论你是遇到了困难还是受到了委屈或者是不开心，爱人总是会第一时间的陪伴在你的身边，去安慰你去逗你开心。在爱人的内心中，你就是他心里最重要的人，并且你就是它的全世界。爱人不会让他的全世界去一个人孤孤单单，为了你爱人可以放弃自己的尊严，放弃自己的面子，只为看见你脸上的笑容。',
        '你在爱人的内心中并不是最重要的，在爱人的世界里，最重要的是他的父母，而你只是第二重要的人。对于你来说，你也是可以接受的，因为父母有对自己有养育之恩。其实在爱人的内心中你还是比较重要的。虽然你没有华丽的衣裳、漂亮的外貌，但是在他的内心中，你还是非常重要的。在生活中，如果你和父母发生冲突，他一定会偏向自己的父母，但是你和其他的人发生冲突，他一定会去保护你，偏袒你。在你的内心中爱人却是最重要的，你可以为了爱人付出很多，甚至忍受很多的委屈。',
        '在爱人的内心中，你并不是非常重要的，甚至你只是一个可有可无的人。但是对于你来说爱情和爱人就是你的全世界，你不论去做什么事情都是再去围绕着他们旋转。你对于爱人拥有着非常深厚的感情，你为他付出了很多，而他却总在去享受你的付出。不论什么情况，总是你去低头，你再去付出，你再去主动，你这样会显得你的爱情非常廉价，也许爱人厌烦了这样的生活，甚至认为这样的爱情没有了新鲜感和刺激感。对于自己的爱人来说，你并不是他内心中最看重的。比你重要的东西有很多权利，父母，金钱，事业等。',
        '在爱人的内心中，你占有着非常高的位置，并且你是他内心中最重要的人，虽然你不是这个世界上最美丽最好看的人，但是你在他的内心中是最完美，最漂亮，最独一无二的人。如果要爱人在世界上最美丽的美女和你之间做出选择，爱人会毫不犹豫的去选择你。在爱人的内心中，你和他的父母一样重要，在他的你心中，你就像一个亲人一样。不论是谁，都不可以去伤害你，让你受一点委屈，爱人会将你一直保护在他的身后。'
        ],
        dialogSrc:[require('../assets/dialogA.png'),require('../assets/dialogB.png'),require('../assets/dialogC.png'),require('../assets/dialogD.png')]
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
      if(that.$route.path == "/divinationLover") {//监听路由变化
        that.startTimer();//开启计时
      }
        },
      ringA(){
          this.num = 0;
          this.dialog = !this.dialog
          this.startTimer() //开启计时
           window.postMessage('clickLover')
      },
      ringB(){
          this.startTimer() //开启计时
          this.num = 1;
          this.dialog = !this.dialog
          window.postMessage('clickLover')
      },
      ringC(){
          this.startTimer() //开启计时
          this.num = 2;
          this.dialog = !this.dialog
          window.postMessage('clickLover')
      },
      ringD(){
          this.startTimer() //开启计时
          this.num = 3;
          this.dialog = !this.dialog
          window.postMessage('clickLover')
      },
      goback(){
          if(this.dialog == false){
              this.$router.push({name:'divinationHome'})
          }else{
              this.startTimer() //开启计时
              this.dialog = !this.dialog
          }  
      }
  }
}
</script>

<style  scoped>
.ringDiv{width: 1024px;font-size: 0}
.return{position: absolute;right: 15px;bottom: 15px}
.ringtxt{position: absolute;left: 0;right: 0;bottom: 20px;margin: auto}
.dialog{position: absolute;width: 846px;height: 461px;left: 0;right:0;top: 0;bottom: 0;margin: auto}
.dialogreturn{position: absolute;right: 30px;bottom: 45px}
.dialog p{position: absolute;width: 650px;height: 300px;left: 0;right: 0;top: 0;bottom: 0;margin: auto;z-index: 100;font-family: '黑体';font-size: 24px;color: #FFFFFF;display: flex;line-height: 27px;
  align-items: center;
  justify-content: center;
  text-align: justify;}
</style>
