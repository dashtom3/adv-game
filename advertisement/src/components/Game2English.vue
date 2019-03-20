<template>
  <div class="hello">
    <div v-if="canClick" class="canClick"></div><img @click="intoChinese" class="game_chinese" src="../assets/game_Chinese.png" alt="">
    <img src="../assets/5.png" id="shan-img" style="display:none;" />
    <div class="banner">
    	<div class="turnplate">
    		<canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
    		<img class="pointer" src="../assets/game2_start1.png" @click="start"/>
    	</div>
    </div>
    <img src="../assets/game1_back.png" class="back" @click="backRn">
    <div class="showMessage" v-if="isShowMessage">
      <img v-if="isimgPass" class="imgSrc" :src="imgSrc[0]" alt="">
      <img v-if="isimgTrue" class="imgSrc" :src="imgSrc[1]" alt="">
      <img v-if="isimgDanger" class="imgSrc" :src="imgSrc[2]" alt="">
      <div class="showMsg">
        <h5>{{messageText}}</h5>
        <!-- <h5>Prank call your crush, then tell him / her it's you tomarrow</h5> -->
        </div>
      <img class="showButton" src="../assets/game2English_dialogButton.png" alt="" @click="closeMessage">
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import  { MessageBox }  from 'mint-ui';

export default {
  name: 'Game2English',
  data () {
    return {
      canClick:false,
      data1:["What was your best sexual experience?","What is the longest you’ve ever given head?","Would you ever do a 3-some?","How do you feel about sex in groups?","Would you ever watch your partner have sex with someone else?",
      "How many partners have you had at one time?","Describe how you orgasim feels?","Where is your favourite place to be kissed?","Have you ever taken it in the butt or would you?","What is the longest time you’ve gone without sex?",
      "Do you enjoy rough or slow sex?","Do you prefer to be on top or bottom?","What is your favourite position?","Do you like anal?","What is your least favourite position?","What is the worst sexual experience you’ve ever had?",
      "Have you ever had sex outside?","Where is the strangest place you’ve ever had sex?","Have you ever performed oral on someone of the same sex?","Have you ever paid for sex?","Who was your first partner?","Have you ever made a video of yourself?",
      "Who is your favourite porn star?","What is your favourite type of porn?","What is your favourite strip club?","Have you ever thought about being a stripper?","Do you prefer the lights on or off?","Does size matter?",
      "Do you prefer to have music in the background, or for it to be be quiet?","Do you prefer for your partner to be silent, or do you like moans?","Do you like a lot of foreplay?","What is your favourite type of foreplay?",
      "Have you done role-playing?","What is your role-playing fantasy?","What is your “sweet spot”?","What is your strangest sexual fantasy?","Would you ever have sex for money?","How flexible are you?",
      "How many orgasms have you had in one sexual encounter?","Spit or Swallow?","What are some people think that you never do but you have?","Tell me about your first kiss and with whom?","What is the most ever childish thing you still do?",
      "What is the most frustrating thing you post in the social media?","What bad things you have done that no one else know about it?","What was the scariest dream you ever had?","What was the most embarrassing thing that your parents caught while you were doing?",
      "What is the nastiest habit you have?","Why did you break up with your last girl friend/ boy friend?","Have you ever let someone take the blame of your fault?","What was the worst experience you have with a police man?","What lie you have told to someone that hurts?",
      "Have you ever cheated anybody?","What is the embarrassing joke you cracked on someone?","What do believe most of your friends about you that is untrue?","Tell me about your first date experience?","What will you if your present Girl friend/Boy friend ended up the relationship right now?",
      "If you could get a chance to kiss a celebrity, who would it be?","How old were you when you had your first kiss?","What was your first impression on me?’","Crazy questions to ask a girl","Have you ever lied to your best friend?",
      "If you struck on a jungle which friend you want to be with you?","Which person known something among us about you that you never wanted to revealed?","What are the top two qualities you feel that a friend should have?","Have you ever lied in Truth and Dare game?",
      "What’s the pity thing you have ever done on a dare?","What color underwear had your wearing?","What kind of person do you want to marry in future?","Do you have a crush on anybody here?","Do you have fear about death?",
      "Do you ever climb on the tree?","What’s your biggest Aim?","What’s the tastiest meal you ever had?","What was your favorite movie?","What do you if you get million dollars?","What’s your scariest dream?",
      "Who have the beautiful eyes among us?","If you are a grant to be one wish, what will be the wish?","If you have only one day to leave, what you will do on that day?","What is the TV show you watch regularly, but you are not admitting that you watch?",
      "What is the craziest thing you have done in your life?","Tell me all the names that you had the crush on before?","Have you ever kissed a girl who is elder than you?","Have you ever feared about the future?","What was the meanest / nastiest joke you ever played on a friend / sibling?",
      "What, according to you, is the worst thing about being a guy / girl?","Have you ever made a complete ass of yourself in front of your crush?","What is the craziest / dumbest pickup line that you have ever used?","Did you ever spread a rumor deliberately?","Have you ever made a pass at someone of the same sex?",
      "Who, present in the room, will make a bad date to you?","Did you ever spend a whole day without wearing your inner wear at all?","Have you ever been intimate to a stranger in public place?","Describe any memorable guilty pleasure act.","What is the funniest thing about you that you have never told anyone else?",
      "Have you ever tripped and fallen at a public place?","If you had to dress like a cartoon character, who would it be?","Name a fictitious villain / bad guy who you find attractive?","What is the weirdest / funniest dream you have ever had?","Has anyone among your friends and family ever seen you picking your nose?",
      "What are your most irritating / worst habits?","How long have you gone without brushing your teeth / without having a shower?","Who, according to you, is the scariest person you know? Why?","What was the most embarrassing thing that happened to you at school / at a store / at a party?","Describe the last intimate experience in detail",
      "Dirtiest thing you have done in public?","Out of your three celebrity crushes who would youSnogMarryAvoid","How many people have you french kissed before? And name their gender!!!!!!","do you like any one in this group?",
      "Have you ever drank 20 or more sodas in a month?","What's a question that you would not want to answer?","Are you straight?","If you were gonna die and you had to kiss three hot guys/girls who would it be??","Which are your five favourite songs of all times?","What was the worst dare you have ever done?",
      "What do you like least about one of your friends in the room?","Tell everyone the most embarassing thing you have ever done.","Have you ever giving a type wedgie? if so Tell us.","Are you a virgin If not what age did you lose your virginity?","If you could save one person in the world from a fire, who would it be? (not including yourself)",
      "What's your favorite physical feature, and your best personality trait? What would others say yours were?","Who is the nerdiest person you have ever dated?","Describe the last intimate experience in detail","Dirtiest thing you have done in public?","Out of your three celebrity crushes who would youSnogMarryAvoid",
      "Do you like any one in this group?","Have you ever drank 20 or more sodas in a month?","What's a question that you would not want to answer?","Are you straight?","If you were gonna die and you had to kiss three hot guys/girls who would it be??","Which are your five favourite songs of all times?",
      "What was the worst dare you have ever done?","What do you like least about one of your friends in the room?","Tell everyone the most embarassing thing you have ever done.","Have you ever giving a type wedgie? if so Tell us.","Are you a virgin If not what age did you lose your virginity?","If you could save one person in the world from a fire, who would it be? (not including yourself)",
      "What's your favorite physical feature, and your best personality trait? What would others say yours were?","What would others say yours were?","Who is the nerdiest person you have ever dated?","Which male and female would probably have an STD if you tested them?",
      "What are the names of all of your sexual partners?","Have you ever done anything naughty with a family member?","Tell us when you first ever masturbated?","Have you ever done anything sexually with an animal or thought about it?","Gals, what most attracts you (truthfully) to a guy, and how often do you make him make the move ?",
      "Where is the most public place you have had sex or masturbated, give some details of what happened.","last time you had sex while high ?","What is the craziest place you've ever had sex?","What is the most degrading thing you have ever done?","How long is your penis?",
      "What is your darkest sexual fantasy in explicit detail?"],
      data2:[
        "Get on the table (or in the middle/front) and do a strip tease.","Tie a chip with your tongue.","With clothes on (for now) top your partner and start riding.","Twerk in only your underwear.","Lick your partner (or person to your left) from their neck all the way to the brim or their underwear.","Suck on your partner’s (or person to your left) belly button for a minute.","Lick or suck on the nipples of your partner for a minute.",
        "Unwrap a piece of candy in your mouth.","Put a wrapped piece of candy in your mouth and then unwrap it with your partner.","Kiss your partner all around their “down-low” area (not the actual part tough).","Put your hand down your partner’s pants until the next round.","Make out with the person to the right of you (if okay with your partner :]).","With no bottoms, sit on your partner’s man piece until the next round (women).",
        "With no bottoms, spoon your partner until the next round.","Give your partner head for 3 minutes.","Take and ice cube and run it up and down your partner’s body until it is melted.","Spray whipped cream (or any other food) all over someone in the group and eat it off of them.","Bite/kiss your partner’s booty.","Masturbate in front of the group (or just your partner).","Blindfold yourself, Spin around for ten seconds, who ever you are pointing to at the end, kiss his/her neck.",
        "Take a naked selfie and send it to your partner.","Go in the next room and make a sex video with your partner for 5 minutes.","Give your partner’s private a peck.","Give a hand job for 3 minutes.","Give a back rub the person to your right.","Pull up your favourite porn site your phone right now.","Put a banana on the inner thigh of the person to your left.",
        "Give head to the person next to you for 2 full songs.","Let your partner rub your inner thighs, but don’t let yourself get hard.","Make a porno in front of the group. You must do everything the group says to do for 10 minutes.","You must act like the sex slave to the person to your right. Doing whatever they say to do for the next 15 minutes.","Write something embarrassing on your body.",
        "Give someone your phone and send a text to someone in your contacts.","Let the group gives you a new look with your hair style.","Let the person of your left draw on your chicks with the marker.","Beg and pleased the person of your left for not to leave you.","Do you push up’s for 10 minutes.",
        "Sell a piece of paper to someone in the group.","Imitate the celebrities.","Give an embarrassing pose to the camera to post in social media.","Dance with no music for 2 minutes.","Let your group take your mobile for 2 minutes.","Update your dirtiest image on social media.","Post your latest popular singing video on YouTube.","Wear your shirt backward for rest of the game.",
        "Imitate like monkey.","Eat a burger without using your hand.","Give a pole dance.","Good truth or dare questions over text","Put your hands on someone packet in the group for next 10 minutes.","Crack an Egg on your head.","Drink water standing on your hands.","Put on a makeup like a girl for boy",
        "Put on a makeup like a boy for girl","Exchange one cloth item with person sits opposite to you.","Give a hug to the person next left to you.","Act like a slave of another person in the group for next 10 minutes.","Go to someone and ask their phone number.","Call your girl friend and say it’s over.",
        "Scream out “shoot me”.","Act like a waiter and take orders from group people.","Everything you say for next 10 minutes has to rhyme.","Go to someone in the pub and give a kiss.","Go and tell someone they are ugly.","Prove that you can cry on demand.","Get a makeover by a blindfolded person.",
        "Make out with a poster.","Sing nursery rhymes with actions.","Give a foot / back massage to a person sitting on your left.","Eat a tortilla wrap made with ingredients put in by each member of the group.","Call your crush and talk seductively to her / him.","Do a chicken dance while singing crazy songs.",
        "Spank the person on your right.","Cross dress, visit the nearest store and buy candy.","Imitate a gorilla for full 2 minutes.","Mummify the person to your left with toilet paper.","Introduce yourself in the tune of 'Happy Birthday to you'.","Go outside and yell 'I am a superstar' very loudly for 5 times.",
        "Come up with unique dance steps.","Prank call your best friend's boyfriend / crush.","Prank call your crush, then tell him/her it's you tomarrow.","Do your best imitation of Elvis Presley","Allow the group to do your hair however they want, and leave it like that for the rest of the game.","Choose one person to put ketchup/mustard etc, all around their mouths, then a member of the same sex must lick it all off.",
        "Have the group pick a song for you to do sn interpretive dance to","Be tied up in just underpants. Then let the group put 5 ice cubes in your pants.","Twist all the time for 1 minute.","Walk outside and scream look at me! I'm ready to party! I am super sexy!","Switch an article of clothing with the player on your right.","Say 'I love you' when someone PMs you on any messenger.",
        "Sing the entire alphabet backwards.","Eat 1/4 of a lemon.. RAW :)","If you're a girl dress as close as possible like a male Neko. If your're a boy dress as close as possible like a female Neko.","Have the group choose a person to sit on your lap for the next round.",
        "Eat a raw egg","Where is the most public place you have had sex or masturbated, give some details of what happened.","What is your cup size? (Girls)What is the length of your penis? (Boys)","When you were young did you ever spy on a boy/man to see them naked? Tell the story.",
        "Ladies, have you ever deep kissed another woman? If so how did it make you feel? Details.","Have you ever pooped yourself... if so say how it feels?","Name one unusual thing that gets you off/wet/horny.","Would you ever stuff panties up your pussy or ass","Would you ever have sex with someone just out of sympathy?",
        "Who was your first sex partner?","Have you ever had any sexual experiences with a member of the same sex ?","When did you first watch porn?","If you had to have sex with anyone in the room who would it be?","Have you ever worn underwear belonging to a member of the opposite sex?","Have you ever done anything sexually with an animal or thought about it?",
        "How many fingers do you use to masturbate?","How old were you when u lost your virginity","If you are a guy, tell the group how far you would take it with the girl you most like in the room, if you are a girl, vise versa.","If you were forced to choose, would you rather give or receive oral stimulation from a member of your own sex?",
        "When you've orgasmed did you ever tasted yourself?","Have you ever left your house while completely naked and returned later still completely naked?","If you could have an orgy with any one of your friends, who would they be,and where would it happen?","How many times you do a sex on average?",
        "Ever masturbate so close to your family, you could get caught?","How many people have you kissed? If you haven't kissed more than 20 people, kiss a player of the opposite sex.","Describe in detail the most sexually exciting thing you have ever seen in person.",
        "Have you ever left your house while completely naked and returned later still completely naked?","How does it make you feel when a sexy man sees your thong"],
      data: null,
      isimgPass:false,
      isimgTrue:false,
      isimgDanger:false,
      passState:false,
      isShowMessage:false,
      isShowLevel:false,
      rotateState:false,
      level:0,
      messageData:"",
      messageText:"",
      imgSrc:[require('../assets/game2English_pass.png'),require('../assets/game2English_true.png'),require('../assets/game2English_danger.png')],
      flag:true,
      timeOut:'',//计时器(3)
      gameReturnTime:null, //存储返回时间
    }
  },
  created(){
      if(localStorage.getItem('gameReturnTime')){
           this.gameReturnTime = localStorage.getItem('gameReturnTime')
         }else{
           this.gameReturnTime = 60
         }
  },
  mounted() {
    init(this);
    // drawRouletteWheel();
    $(document).ready(function () {
        // 解决转盘图片不加载
        drawRouletteWheel();
      })
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
      if(that.$route.path == "/game2English") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
    //返回到中文页面
    intoChinese(){
      this.$router.push({name:'Game2'})
    },
    start() {
      var self = this
      if(this.isShowMessage == false && this.flag == true){
        startRotate(this.randomFrom(0,turnplate.restaraunts.length-1))
        this.canClick = true;
        this.flag = false;
      }
      this.startTimer()//开启计时
    },
    randomFrom(lowerValue,upperValue){
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    },
    showMessage(data,text){
      this.messageData = data
      this.messageText = text
      this.isShowMessage = true
      this.flag = true;
      this.canClick = false;
      window.postMessage('Game2English');
    },
    closeMessage(){
      this.isShowMessage = !this.isShowMessage
      this.isimgPass = false
      this.isimgTrue = false
      this.isimgDanger = false
      this.passState = false
      this.startTimer()//开启计时
    },
    backRn(){
      this.$router.push({name:'gameHomeNext'});
    },
  }
}
var turnplate={
		restaraunts:[],				//大转盘奖品名称
		colors:[],					//大转盘奖品区块对应背景颜色
		outsideRadius:210,			//大转盘外圆的半径
    // outsideRadius:132,			//大转盘外圆的半径
		textRadius:135,				//大转盘奖品位置距离圆心的距离
		insideRadius:55,			//大转盘内圆的半径
		startAngle:0,				//开始角度

		bRotate:false,				//false:停止;ture:旋转
    self:null,
};

function init(this_vue){
  self = this_vue
	//动态添加大转盘的奖品与奖品区域背景颜色
	turnplate.restaraunts = ["PASS", "Truth", "Dare", "Truth", "Dare", "PASS", "Truth", "Dare","Truth","Dare"];
	turnplate.colors = ["#292421", "#292421", "#292421","#292421","#292421", "#292421", "#292421", "#292421","#292421","#292421",];

}
	var rotateTimeOut = function (){
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:2160,
			duration:8000,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};

	//旋转转盘 item:奖品位置; txt：提示语;
	var rotateFn = function (item, txt){
		var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
		if(angles<270){
			angles = 270 - angles;
		}else{
			angles = 360 - angles + 270;
		}
		$('#wheelcanvas').stopRotate();
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:8000,
			callback:function (){	//回调
        self.rotateState = false;
        if(txt == "Truth") {
          self.isimgTrue = true
          self.showMessage(txt,self.data1[self.randomFrom(0,self.data1.length-1)]);
        } else if(txt == "Dare"){
          self.isimgDanger = true
          self.showMessage(txt,self.data2[self.randomFrom(0,self.data2.length-1)]);
        } else {
          self.isimgPass = true
          self.passState = true
          self.showMessage(txt,"Congratulations!")
        }
      }
		});
	};

	function startRotate(index){
    self.rotateState = true;
		rotateFn(index+1, turnplate.restaraunts[index]);
   
	}

function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

function drawRouletteWheel() {
  var canvas = document.getElementById("wheelcanvas");
  if (canvas.getContext) {
	  //根据奖品个数计算圆周角度
	  var arc = Math.PI / (turnplate.restaraunts.length/2);
	  var ctx = canvas.getContext("2d");
	  //在给定矩形内清空一个矩形
	  ctx.clearRect(0,0,422,422);
	  //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
    ctx.strokeStyle = "#FFFFFF";
	  //font 属性设置或返回画布上文本内容的当前字体属性
    ctx.font = '25px Lucida';
    ctx.textBaseline = 'middle';
    // ctx.textAlign='center';//文本水平对齐方式
	  for(var i = 0; i < turnplate.restaraunts.length; i++) {
		  var angle = turnplate.startAngle + i * arc;
		  // ctx.fillStyle = turnplate.colors[i];
      // ctx.fillStyle = i%2==0 ? "#FFFFFF":"#5fcbd5";
      // ctx.fillStyle = i%2==0 ? "#1B1B1B":"#161616";
      ctx.fillStyle = '#292421'
		  ctx.beginPath();
      //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
      // ctx.strokeStyle = 'rgb(255,255,0)';
		  ctx.arc(211, 211, turnplate.outsideRadius-5.7, angle, angle + arc, false);
      ctx.arc(211, 211, turnplate.insideRadius-5.7, angle + arc, angle, true);
      ctx.closePath();
		  ctx.stroke();
		  ctx.fill();
      //锁画布(为了保存之前的画布状态)
      
		  ctx.save();

		  //改变画布文字颜色
		  // ctx.fillStyle = "#FFFFFF";
		  var b = i+2;
		  if(turnplate.restaraunts[i]=="PASS"){
		  	 ctx.fillStyle = "#E5302F";
		  	}else{
		  	 ctx.fillStyle = "#FFFFFF";
        };
        //  console.log(turnplate.restaraunts[0],8898989)
		  //----绘制奖品开始----
		  var text = turnplate.restaraunts[i];
		  var line_height = 17;
		  //translate方法重新映射画布上的 (0,0) 位置
		  ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

		  //rotate方法旋转当前的绘图
      // console.log(angle,arc,Math.PI)
		  ctx.rotate(angle + arc / 2 + Math.PI / 2 - 80.2);

		  /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
		  if(text.indexOf("盘")>0){//判断字符进行换行
			  var texts = text.split("盘");
			  for(var j = 0; j<texts.length; j++){
				  ctx.font = j == 0?'bold 20px Lucida':'bold 18px Lucida';
				  if(j == 0){
					  ctx.fillText(texts[j]+"盘", -ctx.measureText(texts[j]+"盘").width / 2, j * line_height);
				  }else{
					  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height*1.2); //调整行间距
				  }
			  }
		  }else if(text.indexOf("盘") == -1 && text.length>8){//奖品名称长度超过一定范围
			  text = text.substring(0,8)+"||"+text.substring(8);
			  var texts = text.split("||");
			  for(var j = 0; j<texts.length; j++){
				  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
			  }
		  }else{
			  //在画布上绘制填色的文本。文本的默认颜色是黑色
			  //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
			  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		  }

		  //添加对应图标
      // turnplate.restaraunts.forEach(function(item,index){
      //   var img= document.getElementById("shan-img");
			//   ctx.drawImage(img,-30,20);
      // })
		  //把当前画布返回（调整）到上一个save()状态之前
		  ctx.restore();
		  //----绘制奖品结束----
	  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
    font-family: 'Britannicdiy';
    src: url('../assets/britannic bold.ttf');
  }
	.clear{clear:both;}
  .turnplate {
    background:url('../assets/game2_round2.png') no-repeat 2px -1px;
    background-size: 100% 100%;
  }
  .hello {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/game2_bg.png');
    background-size: 100% 100%;
    overflow: hidden;
  }
 
	/* 大转盘样式 */
  .canClick{position: absolute;width: 145px;right: 25px;top: 12px;height: 55px;z-index: 200;}
  .game_chinese{position: absolute;width: 145px;right: 25px;top: 12px}
  .imgSrc{width: 550px;height: 660px;}
	.banner{display:block;width:505px;margin-left:242px;;margin-right:auto;margin-bottom: 20px;padding-top:81px;height:500px;}
	.banner .turnplate{display:block;width:100%;position:relative;height:500px;left: 62px;bottom: 18px;}
	.banner .turnplate canvas.item{width:100%;margin-top: -3px;}
	.banner .turnplate img.pointer{position:absolute;width:149px;height:218px;left:35.9%;top:19.5%;}
	.more{display: block;width: 100%;position: fixed;top: 0;left: 0;height: 150px;}
	.cloud{position: fixed;left: 0;top: 70%;width: 150px;}
	.cloud2{position: fixed;right: 0;top: 32%;width: 50px;}
	.cloud3{position: fixed;left: 0;top: 30%;width: 100px;}
	@media screen and (max-width: 320px) {
		.cloud{position: fixed;left: 0;top: 70%;width: 150px;}
		.cloud2{position: fixed;right: 0;top: 30%;width: 50px;}
		.cloud3{position: fixed;left: 0;top: 23%;width: 100px;}
	}
	@media screen and (min-width: 321px) and (max-width: 375px) {
		.cloud{position: fixed;left: 0;top: 72%;width: 150px;}
		.cloud2{position: fixed;right: 0;top: 32%;width: 50px;}
		.cloud3{position: fixed;left: 0;top: 25%;width: 100px;}
	}
	@media screen and (min-width: 376px) {
		.cloud{position: fixed;left: 0;top: 68%;width: 150px;}
		.cloud2{position: fixed;right: 0;top: 32%;width: 50px;}
		.cloud3{position: fixed;left: 0;top: 25%;width: 100px;}
	}
	@media screen and (max-height: 480px) {
		.cloud{position: fixed;left: 0;top: 81%;width: 150px;}
		.cloud2{position: fixed;right: 0;top: 35%;width: 50px;}
		.cloud3{position: fixed;left: 0;top: 27%;width: 100px;}
	}

	#mark{width: 100%;height: 100%;background: rgba(0,0,0,0.5);position: fixed;top: 0;left: 0;display: none;}
	.red-img{position: fixed;top: 10%;left: 5%;width: 90%;}
  .title {
    float:left;
  }
  .select {
    float: left;
  }
  .back {
    float: right;
    margin-top: -110px;
  }
  .level{
    float: left;
    margin-left: 15px;
    margin-top: -110px;
  }
  .showMessage {
    position: relative;;
    /* margin: auto; */
    width:500px;
    height: 600px;
    min-height: 155px;
    top: -595px;
    left: 280px;
    z-index: 2001;
    text-align: center;
    border-radius:10px;
  }
    .showButton {
      position: absolute;
      bottom: 100px;
      left: 230px;
      width: 124x;
      height: 44px;
    }
    .showMsg{
      position: absolute;
      top: 180px;
      left: 123px;
      width: 310px;
      height: 270px;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
    }
    .showMessage h4 {
      position: absolute;
      top: 60px;
      left:0;
      right: 0;
      margin: auto;
      font-size: 23px;
      font-family:'YouYuan';
      color: #170654;
      line-height: 40px;
      text-align: center;
      z-index: 1000;
    }
    .showMessage h5 {
      font-size: 28px;
      font-family:'Britannicdiy';
      font-weight: 800;
      color: #170654;
      line-height: 40px;
      z-index: 1000;
      max-height:245px ;
      overflow: hidden;
      /* margin: auto; */
    }
  .divide {
    background-color: #c9c9c9;
    width: 100%;
    height: 1px;
  }
</style>
