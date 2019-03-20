<template>
  <div class="hello">
    <div v-if="canClick" class="canClick"></div><img isDisabled='false'  @click="intoEnglish" class="game_english" src="../assets/game1_Einglish.png" alt="">
    <img src="../assets/game1_title.png" class="title">
    <img src="../assets/5.png" id="shan-img" style="display:none;" />
    <div class="banner">
    	<div class="turnplate">
    		<canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
    		<img class="pointer" src="../assets/game1_start.png" @click="start"/>
    	</div>
    </div>
    <img src="../assets/game1_back.png" class="back" @click="backRn">
    <div class="showMessage" v-if="isShowMessage">
      <img class="showBg" src="../assets/game1_dialogBg.png" alt="">
      <h4>{{messageData}}</h4>
      <img class="showButton" src="../assets/game1_dialogButton.png" alt="" @click="closeMessage">
    </div>
    <img src="../assets/game1_select.png" class="select">
  </div>
</template>

<script>
import axios from 'axios';
// import  { MessageBox }  from 'mint-ui';

export default {
  name: 'hello',
  data () {
    return {
      timeOut:'',//计时器(3)
      gameReturnTime:null, //存储返回时间
      canClick:false,
      data: null,
      isShowMessage:false,
      messageData:"",
      flag:true, //避免重复点击开始按钮     
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
      if(that.$route.path == "/game1") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
    //进入英文模式
    intoEnglish(){
      this.$router.push({name:'Game1English'})
    },
    start() {
      if(this.flag == true){
      startRotate(this.randomFrom(0,turnplate.restaraunts.length-1))
      //英文切换按钮不可点
      this.canClick = true;
      this.flag = false
      }
      this.startTimer()//开启计时
    },
    randomFrom(lowerValue,upperValue){
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    },
    showMessage(data){
      // console.log(data)
      this.messageData = data
      this.isShowMessage = !this.isShowMessage
      this.flag = true
      //英文切换按钮是否可点
      this.canClick = false;
      window.postMessage('Game1');
    },
    closeMessage(){
      this.isShowMessage = !this.isShowMessage
      this.startTimer()//开启计时
    },
    backRn(){
      this.$router.push({name:'gameHome'});
    }
  }
}
var turnplate={
		restaraunts:[],				//大转盘奖品名称
		colors:[],					//大转盘奖品区块对应背景颜色
		outsideRadius:205,			//大转盘外圆的半径
    // outsideRadius:132,			//大转盘外圆的半径
		textRadius:135,				//大转盘奖品位置距离圆心的距离
		insideRadius:68,			//大转盘内圆的半径
		startAngle:0,				//开始角度

		bRotate:false,				//false:停止;ture:旋转
    self:null,
};


function init(this_vue){
  self = this_vue
	//动态添加大转盘的奖品与奖品区域背景颜色
	turnplate.restaraunts = ["上家喝光", "下家喝光", "大家干杯", "随意喝", "找人干杯", "找人拥抱", "对家喝光 ", "加一杯","找人亲一下","PASS","喝光","喝一半","指定喝光","男士喝","女士喝","喝两杯"];
	turnplate.colors = ["transparent","#5fcbd5", "#FFFFFF", "#5fcbd5", "#FFFFFF","#5fcbd5", "#FFFFFF", "#5fcbd5" ];
  $('#wheelcanvas').rotate(33)
}
	var rotateTimeOut = function (){
    // console.log('ni')
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:32,
			duration:100,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};

	//旋转转盘 item:奖品位置; txt：提示语;
	var rotateFn = function (item, txt){
    // console.log(item,txt)
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
				// alert("恭喜您获得奖品："+txt);
        // console.log(self)
        self.showMessage(txt);
			}
		});
	};

	function startRotate(index){
    // console.log('转');
    rotateFn(index+1, turnplate.restaraunts[index]);
    
	}
// });

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
    ctx.strokeStyle = "transparent";
	  //font 属性设置或返回画布上文本内容的当前字体属性
    ctx.font = 'bold 18px Microsoft YaHei';
    // ctx.textAlign='center';//文本水平对齐方式
    ctx.textBaseline='middle';//文本垂直方向，基线位置 
	  for(var i = 0; i < turnplate.restaraunts.length; i++) {
		  var angle = turnplate.startAngle + i * arc ;
		  // ctx.fillStyle = turnplate.colors[i];
      // ctx.fillStyle = i%2==0 ? "#FFFFFF":"#5fcbd5";
      ctx.fillStyle = i%2==0 ? "#1B1B1B":"#161616";
		  ctx.beginPath();
		  //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
		  ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
		  ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
		  ctx.stroke();
		  ctx.fill();
		  //锁画布(为了保存之前的画布状态)
		  ctx.save();

		  //改变画布文字颜色
		  var b = i+2;
		  if(b%2){
		  	 ctx.fillStyle = "#FFFFFF";
		  	}else{
		  	 ctx.fillStyle = "#E5302F";
		  	};

		  //----绘制奖品开始----
		  var text = turnplate.restaraunts[i];
		  var line_height = 17;
		  //translate方法重新映射画布上的 (0,0) 位置
		  ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

		  //rotate方法旋转当前的绘图
      // console.log(angle,arc,Math.PI)
		  ctx.rotate(angle + arc / 2 + Math.PI / 2 +80.1);
		  /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
		  if(text.indexOf("盘")>0){//判断字符进行换行
			  var texts = text.split("盘");
			  for(var j = 0; j<texts.length; j++){
				  ctx.font = j == 0?'bold 20px Microsoft YaHei':'bold 18px Microsoft YaHei';
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

	.clear{clear:both;}
  .turnplate {
    /* background-image: url('../assets/cj_bg.png') ; */
    background:url('../assets/game1_round.png') no-repeat 2px -1px;
    background-size: 100% 100%;
  }
  .hello {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/game2_bg.jpeg');
    background-size: 100% 100%;
    overflow: hidden;
  }
	/* 大转盘样式 */
  .canClick{position: absolute;width: 145px;right: 25px;top: 12px;height: 55px;z-index: 200;}
  .game_english{position: absolute;width: 145px;right: 25px;top: 12px}
	.banner{display:block;width:500px;margin-left:245px;margin-right:auto;margin-bottom: 20px;padding-top:80px;height:500px;z-index: 99}
	.banner .turnplate{display:block;width:100%;position:relative;}
	.banner .turnplate canvas.item{width:100%;}
	.banner .turnplate img.pointer{position:absolute;width:219px;height:208px;left:29.2%;top:29.5%;}
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
  .showMessage {
    position: relative;;
    top: -602px;
    left: -10px;
    margin: auto;
    width:640px;
    height: 645px;
    z-index: 2001;
    text-align: center;
    border-radius:10px;
  }
  .showBg{
    position: absolute;
    width: 639px;
    height: 618px;
    bottom: 27px;
    left: -5px;
    z-index: -50;
  }
    .showMessage h4 {
      height: 50px;
      position: absolute;
      font-size: 50px;
      color: #850713;
      font-family:'Microsoft YaHei';
      font-weight: bold;
      letter-spacing: 5px;
      left: 0;
      right: 0;
      top: 275px;
      margin: auto;
    }
    .showButton {
      position: absolute;
      bottom: 145px;
      left: 230px;
      width: 180px;
    }
  .light{
    position:absolute;
    left: 210px;
    top: 17px;
    z-index: 5;
    /* background-color: #ffffff; */
  }
  .select {
    position:absolute;
    top:75px;
    left:0px;
  }
</style>
