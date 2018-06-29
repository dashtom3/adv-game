<template>
  <div class="hello">
    <img src="../assets/game1_title.png" class="title">


    <img src="../assets/5.png" id="shan-img" style="display:none;" />
    <!-- <img src="../assets/light.png" class="light"> -->
    <div class="banner">
    	<div class="turnplate">
    		<canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
    		<img class="pointer" src="../assets/game1_start.png"@click="start"/>
    	</div>
    </div>
    <img src="../assets/game1_back.png" class="back" @click="backRn">
    <div class="showMessage" v-if="isShowMessage">
      <h4>{{messageData}}</h4>
      <div class="divide"></div>
      <h5 @click="closeMessage">确定</h5>
    </div>
    <img src="../assets/game1_select.png" class="select">
  </div>
</template>

<script>
import axios from 'axios';
import  { MessageBox }  from 'mint-ui';

export default {
  name: 'hello',
  data () {
    return {
      data: null,
      userId: null,
      hasShow: false,
      award: null,
      mac:null,
      isShowMessage:false,
      messageData:"",
      baseUrl: "http://116.62.228.3:8080/Advertisement_proc/api/"
      // baseUrl: "http://139.219.11.152:8080/Advertisement/api/"
    }
  },
  created(){
    // if(this.$route.params.userId != null) {
    //   this.userId = this.$route.params.userId;
    //   this.mac = this.$route.query.mac
    //   this.getDrawList();
    //   this.collectData([{type:'12',playAdvId:'0'}])
    // }

  },
  mounted() {
    init(this);
    drawRouletteWheel();
  },
  methods: {
    start() {
      // var self = this
      // this.collectData([{type:'13',playAdvId:'0'}])
      // axios.get(this.baseUrl + 'draw/play?drawId=' + this.data.id).then((res) => {
      //   self.award = res.data.data
      //   var temp;
      //   turnplate.restaraunts.forEach(function(item,index){
      //     if(self.award == item) {
      //       temp = index;
      //     }
      //   })
      //   startRotate(temp);
      // }).catch((res) => {
      //   alert("网络访问出现问题");
      // })
      startRotate(this.randomFrom(0,turnplate.restaraunts.length-1))
    },
    randomFrom(lowerValue,upperValue){
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    },
    collectData(data) {
      var self = this
      var time = new Date()
      var dataTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':'+time.getMinutes() + ':'+time.getSeconds() ;
      data[0].operateDate = dataTime
      axios.post(this.baseUrl + 'record/addOperateRecord?mac=' + this.mac,data).then((res) => {
        console.log(res)
      }).catch((res) => {
        MessageBox("消息","网络访问出现问题");
      })
    },
    showMessage(data){
      console.log(data)
      this.messageData = data
      this.isShowMessage = !this.isShowMessage
      // MessageBox('结果', data);
    },
    closeMessage(){
      this.isShowMessage = !this.isShowMessage
    },
    backRn(){
      window.postMessage('game1');
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

// $(document).ready(function(){
function init(this_vue){
  self = this_vue
	//动态添加大转盘的奖品与奖品区域背景颜色
	turnplate.restaraunts = ["上家喝光", "下家喝光", "大家干杯", "随意喝", "找人干杯", "找人拥抱", "对家喝光 ", "加一杯","找人亲一下","PASS","喝光","喝一半","指定喝光","男士喝","女士喝","喝两杯"];
	turnplate.colors = ["transparent","#5fcbd5", "#FFFFFF", "#5fcbd5", "#FFFFFF","#5fcbd5", "#FFFFFF", "#5fcbd5" ];

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
    console.log(item,txt)
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
        console.log(self)
        self.showMessage(txt);
			}
		});
	};

	function startRotate(index){
    console.log('转');
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
	  for(var i = 0; i < turnplate.restaraunts.length; i++) {
		  var angle = turnplate.startAngle + i * arc;
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
      console.log(angle,arc,Math.PI)
		  ctx.rotate(angle + arc / 2 + Math.PI / 2+80);

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
  }
	/* 大转盘样式 */
	.banner{display:block;width:500px;margin-left:245px;margin-right:auto;margin-bottom: 20px;padding-top:80px;height:500px;z-index: 99}
	.banner .turnplate{display:block;width:100%;position:relative;}
	.banner .turnplate canvas.item{width:100%;}
	.banner .turnplate img.pointer{position:absolute;width:190px;height:190px;left:32.5%;top:31%;}
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
    position:fixed;
    margin: auto;
    width:400px;
    height: 155px;
    top: 200px;
    left: 312px;
    z-index: 2001;
    text-align: center;
    background-color: #ffffff;
    border-radius:10px;
  }
    .showMessage h4 {
      font-size: 40px;
      color: #666666;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .showMessage h5 {
      font-size: 24px;
      color: #666666;
      margin-top: 10px;
    }
  .divide {
    background-color: #c9c9c9;
    width: 100%;
    height: 1px;
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
    top:72px;
    left:0px;
  }
</style>
