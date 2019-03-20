<template>
    <div class="divination">
        <img class="game_return" src="../assets/divinationHome_back.png" @click="backRn" alt="">
        <div :class="styleState == false ? 'div_content' : 'div_content1' " v-if="showInput">
            <img class="divination_cover" src="../assets/divination_divCover.png" alt="">
            <div class="divcover_content">
                <p class="divCover_p1">请输入您的手机号码</p>
                <input type="number" @focus="getFocus" @blur="loseFocus" v-model="phone_input">
                <p class="divCover_p2"><img src="../assets/divination_sureButton.png" alt="确定" @click="input_sumbit"></p>
            </div>
        </div>
        <div class="div_content" v-if="showError">
            <img class="divination_cover" src="../assets/divination_divCover.png" alt="">
            <div class="divcover_content">
                <p class="divCover_p1">提示:</p>
                <p class="divCover_p1">请输入正确的电话号码哦(*￣︶￣)</p>
                <p><img src="../assets/divination_sureButton.png" alt="确定" @click="error_sumit"></p>
            </div>
        </div>
        <div class="div_contentMsg" v-if="showMsg">
            <p class="answerTitle">你的前生</p>
            <img class="divination_coverMsg" src="../assets/divination_answerCover.png" alt="">
            <div class="divcover_contentMsg">
                <p class="divCover_Msgp1">{{getAnswer()}}</p>
            </div>
        </div>
        <img class="divination_prev" src="../assets/divnation_prevButton.png" alt="上一步" @click="divination_prev">
    </div>
</template>

<script>
// import axios from 'axios';
import  MessageBox  from 'mint-ui';


export default {
  name: 'divinationHome',
  data () {
    return {
      timeOut:'',//计时器()
      gameReturnTime:null, //存储返回时间
      styleState:false,
      phone_input:'',
      showInput:true,
      showError:false,
      showMsg:false,
      answers:[   
        '前世是一位伟大的医学家，因为遇到了一个令你十分感兴趣的课题，但是你一直无法攻破，因精神忧郁最后自杀。',
        '前世你是一位风度翩翩的王子，结果因为继母的残忍而被她整死的。',
        '你前世是一只可爱的小螃蟹，走在路上被人给踩死了',
        '你的前世比前面两个人要幸运，是被人谋杀的！！',
        '前世是一个乞丐，因为爱上了一位和你身份有天壤之别的富人，他的父母不允许你们相爱，最后你们两个徇情而死。',
    	'前世你是一位科学家，最后光荣地逝世。',
    	'被人灌下毒药而死！啊，这水里有毒！',
    	'你被人绑架，最后被撕票！',
    	'前世你是一个小偷，结果一次攀越高楼作案时不小心摔落高楼而死。',
    	'前世你被人暗算，导致公司破产，你自杀了。',
    	'是一只狐狸，在打猎的时候被射中做成了围巾。',
    	'是后宫的妃子，因为太得宠被皇后陷害致死。',
    	'前生是一个好赌的乞丐,意外是到中奖的奖票,本以为有本钱可以应更多的钱了,但结果却是把所有的奖金都输掉了,还因此而欠下巨额债务而无法偿还北债主打死。',
    	'前生是一个军人,因为战败被敌方俘虏,严刑拷打,因不肯开口说出情报出卖国家而受严厉的酷刑而死。',
    	'前生是一只流浪狗,常年流浪在外,后因风雪而冻晕在一家农户门口,因农户善良而被收留,最终在农户的照顾下安度了余生。',
    	'前生是艺术家,对每件事、每件作品都要尽善尽美,对自己的要求也越来越高,因做不到完美的作品而变得疯疯癫癫。后来把自己扣于屋内,足不出户,最后饿死屋内。',
    	'你常常想象着自己某一天可以中大奖，之后就可以购买你想要的任何东西。于是，你每次在购买彩票的时候都在想象着，却每次都是以失望告终，结果有一天你终于中奖了，却一时接受不了这么大的刺激，笑过头了，导致精神猝死。',
    	'你总是以为自己是老大，很多事情只有你说的才是对的，任何忤逆你的都是坏人。此外，在很多时候，总是有人会跟你作对，所以你常常在生气中度过每一天，直到有一天你气过头了，也就这么给气死了！',
    	'你的一生很充实，儿孙孝顺，家庭幸福美满，没有什么可担忧，人到老年也没有任何的病痛与不安。因此，你在儿孙的照顾下寿终而寝。',
    　  '总是喜欢寻求刺激的，寻求刺激，深夜独自在家看了过多恐怖片，在晚上睡觉时会因为想起恐怖片里的情节而被吓死。',
    　　'你因为身材太过完美，太过过度S型，小蛮腰加加上拥有丰满大波，结果进出门时被门夹到咪咪窘死。',
    　　'总是有牙疼老毛病的你，因为在也无法忍受牙疼带来的折磨，因为错误地选择了牙科庸医，然后被钳子拔掉两颗门牙丑死。',
    　　'外表出众拥有傲人身材的你，会因为相貌太出众，结果很容易常遭遇色狼被他们的咸猪手恶心死。',
    　　'总喜欢玩电玩，但智商又太低的你，会因为玩电玩不得要领，总是永远无法，最后被自己给急死。',
    　　'在自己举行的Party上，因为太开心了，得意忘形，然后喝了太多啤酒，上洗手间时，还没来记得走进厕所的路就被尿憋死了。',
    　　'因你的住宅在市内繁华区，于是交通总是拥挤，常常堵车，你终于在一次时间过长的堵车中无聊得闷死了。',
    　　'遇到事情总是拿不定注意的你，电脑坏了，因为存有隐私内容，你不知道电脑该拿去修还不是不该去修，纠结死。',
    　　'一直羡慕别人的苗条身材的你，因为想要减肥而吞下一条蛔虫，结果受不了蛔虫在肚里爬来爬去，痒痒死。',
    　　'性格开朗外向不顾形象的你，看了非常搞笑的电影，笑得太久了，笑到面部都抽筋了，结果难受死了。',
    　　'一直喜欢唱歌的你，为了练习唱美声，张大嘴巴练习，结果被飞进咽喉里的苍蝇给噎死了。',
    　　'你吃拉面的时候加了五十五颗花椒，导致胃部麻痹无法蠕动消化食物，于是你就被那些在胃里发酵的食物散发出的臭味呛死了。'
    ],
    }
  },
  created(){
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
          console.log('返回轮播')//返回主页
          that.backRn() //返回轮播页面
        },1000*that.gameReturnTime)
    },
    isTimeOut() {
      let that = this;
      if(that.$route.path == "/divination") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
      getAnswer() {
        var random = Math.floor(Math.random() * 31); 
        var phoneInfo = JSON.parse(localStorage.getItem("phoneInfo"));
        //先判断localstorage有没有数据才能对它操作，不然报错
        if(phoneInfo == null || phoneInfo == ''){
        var phoneInfo = {}
        phoneInfo[this.phone_input] = [new Date().getDay(),random];
        var setData = localStorage.setItem("phoneInfo",JSON.stringify(phoneInfo));
        }else{
          if(phoneInfo[this.phone_input] == null || phoneInfo[this.phone_input] == ''){
          phoneInfo[this.phone_input] = [new Date().getDay(), random];
          var setData = localStorage.setItem("phoneInfo",JSON.stringify(phoneInfo));
          }
        }
        if(phoneInfo[this.phone_input][0] == new Date().getDay())
        {
        random = phoneInfo[this.phone_input][1];
        }
        return this.answers[random];
},
     
      //输入页面 确定 按钮
      input_sumbit(){
         this.startTimer()//开启计时
          var phoneReg=/^[1][3-9][0-9]{9}$/;
          if(!phoneReg.test(this.phone_input) || this.phone_input == undefined || this.phone_input == ''){
              this.showInput = false
              this.showError = true
              this.phone_input = '';
              window.postMessage('saveErrorSure')
          }else{
               this.showInput = false;
               this.showMsg = true;
            //    console.log(this.phone_input,66)
               window.postMessage('phone'+':'+this.phone_input);
              
          }  
          
      },
      //输入手机号错误 确定 按钮
      error_sumit(){
          this.showError = false
          this.showInput = true
          this.startTimer()//开启计时
      },
    //答案页面返回上一步
    divination_prev(){
        if( this.showMsg == true && this.showInput == false){
           this.phone_input = '';
           this.showInput = true;
           this.showMsg = false;
           this.startTimer()//开启计时
        }else if(this.showMsg == false && this.showInput == true){
            // console.log('返回主页')
            this.$router.push({name:'divinationHomedown'})
        }else{
            this.phone_input = '';
           this.showInput = true;
           this.showMsg = false;
           this.showError = false;
           this.startTimer()//开启计时
        }
    },
    backRn(){
      window.postMessage('gameHome');
    },
    getFocus(){
        this.styleState = false
    },
    loseFocus(){
        this.styleState = false
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.divination {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/divination_bg.png");
  background-size: 100% 100%;
  position: relative;
}
.divination .game_return {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
}
.div_content {
  width: 450px;
  height: 232px;
  margin: auto;
  position: absolute;
  top: 150px;
  /* bottom: 0; */
  left: 0;
  right: 0;
}
.div_content1 {
  width: 450px;
  height: 232px;
  margin: auto;
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
}
.div_contentMsg {
  width: 660px;
  height: 420px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.answerTitle {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin: auto;
    font-family: "SimSun";
    font-size: 36px;
    color: #D8D6AF
}
.divination .divination_cover {
  width: 100%;
  height: 100%;
}
.divination .divination_coverMsg {
  width: 100%;
  height: 100%;
}
.divcover_content {
  width: 400px;
  height: 160px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
}
.divcover_content .divCover_p1 {
  font-size: 23px;
  font-weight: 200;
  color: #ddce9f;
  font-family: "SimSun";
  padding-bottom: 30px;
}
.divcover_contentMsg {
  width: 600px;
  height: 350px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
}
.divcover_contentMsg .divCover_Msgp1 {
  font-size: 24px;
  font-weight: 200;
  color: #d8d6af;
  font-family: "SimSun";
  line-height: 32px;
}
.divcover_content input {
  width: 204px;
  height: 32px;
  border: 3px solid #756c4e;
  background-color: #170503;
  color: #ddce9f;
  font-size: 20px;
  font-weight: 200;
  font-family: "SimSun";
  padding-left: 5px;
}
.divcover_content .divCover_p2 {
  padding-top: 30px;
}
.divination_prev {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
