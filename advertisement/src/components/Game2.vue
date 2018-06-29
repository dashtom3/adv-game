<template>
  <div class="hello">
    <img src="../assets/game2_title.png" class="title">
    <!-- <img src="../assets/game1_select.png" class="select"> -->

    <img src="../assets/5.png" id="shan-img" style="display:none;" />

    <div class="banner">
    	<div class="turnplate">
    		<canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
    		<img class="pointer" src="../assets/game2_start.png"@click="start"/>
    	</div>
    </div>
    <img src="../assets/game1_back.png" class="back" @click="backRn">
    <img src="../assets/game2_level.png" class="level" @click="changeLevel(-1)">
    <div class="showMessage" v-if="isShowMessage">
      <h4>{{messageData}}</h4>
      <div class="divide"></div>
      <h4 style="min-height:100px">{{messageText}}</h4>
      <div class="divide"></div>
      <h4 @click="closeMessage">确定</h4>
    </div>
    <div class="showMessage" v-if="isShowLevel">
      <h5 @click="changeLevel(0)">一般</h5>
      <br>
      <div class="divide"></div>
      <h5 @click="changeLevel(1)">刺激</h5>
      <br>
      <div class="divide"></div>
      <h5 @click="changeLevel(2)">很刺激</h5>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import  { MessageBox }  from 'mint-ui';

export default {
  name: 'hello',
  data () {
    return {
      data1:[
        ["用三个词形容你自己，分别是什么？",
        "你使用哪种方式作弊的？","左边的人对你说什么？你会很幸福！","你最擅长扮演哪个卡通人物？",
        "班上有你最信任的人吗？是谁？","你最牛的一次逃课经历是怎样的？","你背着家长做过什么坏事吗？",
        "如果看到自己最爱的人熟睡在你面前你会做什么？","写首自己最最喜爱的歌？","当你最不知道穿什么颜色的时候，你会选择什么颜色？",
        "你最后悔的一件事是什么？","曾经有过最被感动的事是什么？","如果给你一个机会去世界上任何一个地方旅行你会去?",
        "如果时间能倒流你希望回到哪一时间？","你心目中理想的爱人是什么样子呢？","最想实现的三个愿望是什么？",
        "如果让你拥有一种超能力，你愿意拥有什么呢？","最喜欢哪部电影？","与喜欢的人见面，想要穿成什么样？",
        "果有来生，你选择当？","最喜欢的食物是什么 ","如何向喜欢的人表白？",
        "如果你爱的人不爱你怎么办？","如果有一天，你生命中最重要的东西离你而去了，你会怎么办？","如果从天而降99枚金币，你的第一反应是什么？",
        "世界末日，你会幸存，并且你可以救一个人，你会怎么做？","如果让你选择做一个电影中的角色，你会选谁呢？","你在乎别人看你的眼光吗？会为了众人的反对放弃自己想要的东西或人吗？",
        "你的爱人要出国，你会怎么做？","在你心中谁最可信？","你希望谁得到幸福？",
        "你会选择你爱的人还是爱你的人？","现在你最喜欢的人是谁？","目前最大的愿望？",
        "如果有一天自己觉得自己的某一次选择是错的，可是现在已经再也无法重新来，那该怎么办？","对你而言，爱情和友情哪个比较重要？","如果能预知未来，你最不希望看见的是什么？",
        "哭得最伤心的是哪一次？为什么？","喜欢看什么动画片？","你最不开心的时候会有什么表现？",
        "在爱情和面包中，你会选择哪个？为什么？","最想感谢的人是谁？","你觉得最美的画面是什么？",
        "如果跟你喜欢的人约会，碰到前任的男（女）朋友，会有什么表现？","到目前为止你做过最疯狂的事是？","说出在坐一个人的搞笑经历。"],
        ["你的初吻是几岁在什么地方被什么人夺去的?","你的初恋是几岁?","你的初恋对象是谁?",
        "大学一共挂过几门课？","大学所有考试中，你考到最低的一门是什么课，考了几分？","你吻过几个人？",
        "在现场所有同学中，你看哪位异性同学最舒服？","高中时代，你看哪位老师最不顺眼？","如果再给你一次机会，回到高中毕业那天，你最想对某一位异性说什么话？",
        "第一个喜欢的异性叫什么名字？","你曾经意淫过在场的哪一位？如果过去没有的话，你现在会选哪一位作为YY对象？","2008年让你觉得最伤心的事情是什么？",
        "今天穿什么颜色的内裤？","对梦中情人有什么要求（在一分钟内说出五条）。","让你一直念念不忘的一位异性的名字？原因？",
        "谈过几次恋爱？","每天睡觉前都会想起的人是谁？","你最怕的事情或东西是什么（说出三件）。",
        "你会不会在意ta的过去，为什么？","打算什么时候结婚？","现在心里最在意的异性叫什么名字？",
        "你通常用那只指头挖鼻子？","第一次爱的人对你有什么影响？","你在意你的老婆（老公）不是处女（处男）吗？",
        "你会为了爱情牺牲一切，包括生命吗？","结婚后希望生男孩还是女孩(只能选择一个，说出原因)。","和多少异性有过非恋爱的暧昧关系？",
        "你作弊使用过的最高招","从小到大最丢脸出丑的事情是什么？","要是妈妈和老婆同时掉到水里会救谁先呢？",
        "如果明天是世界末日，你现在最想做的是什么？","如果让你kiss现场的某一位异性，你会选择谁，为什么？","说出同寝室的人最让你受不了的习惯",
        "最欣赏自己哪个部位？对自己那个部位最不满意？"],
        ["男生回答自己的下面有多长，女生回答自己有多大。","你的性幻想对象是谁？","和男女朋友进行到哪一步？",
         "身上哪个部位最敏感？","你对左边第三个异性有什么感觉？要具体。","如果你必须选择和在做的某一位异性回家，你会选择谁？",
         "在你洗澡时，有一个非常丑的异性冲了进来，你会怎么样","你最愿意和在场哪个异性私奔？","你希望左边第3位异性是你的谁？",
         "最喜欢的做爱姿势是什么？","最长的一次做爱有多久，和谁？","你觉得在座那位异性的嘴唇看起来最想Kiss？",
         "你约过炮吗？感觉对方怎么样？","你觉得你曾经喜欢的人和在座哪个人最像？","最难忘的一次啪啪啪是在什么地方，和谁？",
         "你想和在场的哪一位玩大冒险？","如果有来生你选择当？","在场哪一位异性对你说我喜欢你，你会最开心？",
         "第一次是在什么时候？","平时看哪个老师的片儿，或者有什么网站吗和大家分享一下。","如果时间能倒流你希望回到哪一时间，为什么？",
         "如果前一个异性玩家爱上你了，你怎么办？","你上一次性生活是什么时候，和谁？","你觉得在座最帅或最漂亮的人是谁？",
         "你会尝试或者选择和同性做爱吗？","有什么怪癖吗？","洗澡洗到一半没水了怎么办？",
         "你认为在座的哪一位异性可以成为你的性幻想对象?","认同没有性的爱情和没有爱的性吗?","你觉得对面那个人那个部位最好看？",
         "说一说你最难忘的性爱经历。"]],
      data2:[["发朋友圈说自己准备要结婚了","表演一段上厕所的动作","原地转仨圈，同时说出六个老师的名字",
        "给左边的玩家打三下屁股","唱一首儿歌","在微博好友上@第一个人，并写：今天我们分开了，你过的还好吗",
        "打电话给数学老师，让他答应下次测验给你99分","模范一位明星的经典动作让大家猜","跳一段在幼儿园学的舞蹈给大家看",
        "表演一段新闻联播","对任意一个陌生人说：放学一起回家吧","双手抱头，青蛙跳十下",
        "爆笑15秒","做三个卖萌的表情，让大家拍照","让大家看看你手机里任意一个人的短信",
        "打电话给家长说：爸妈我恋爱了","抱着垃圾桶唱征服","对窗外大喊：“我好寂寞阿。”",
        "随便给手机里的一个异性打电话。说：其实.....我是....猪。","把从你右手边数起第三位异性的腿架在肩上替其捶腿，边说“大爷您舒服吗？”","去厕所里唱歌。让所有人都能听到你唱的什么歌。",
        "抱一位离你最远的异性直到下一轮真心话大冒险结束。","对一个陌生人说：“我不会看表，请您看一下我的手表上显示的是几点”","模仿喝一杯烈酒的样子喝完一杯白开水",
        "站在桌子上,大喊“我是超人,我要回家了！”","与从你左手边数起第二位异性对喝交杯酒","找一个陌生人说自己要上厕所了，直到别人给手纸为止。"],
        ["请kiss在本桌或本教室离你最近的一位异性同学三秒钟","请在现场选一位异性同学，向他或她表白","站到凳子上表演大猩猩捶胸呐喊动作",
        "学超级名模走秀，绕桌子或教室一圈","与本桌或本教室离你最近的一位异性同学拥抱十秒钟。","找在场的一位异性情歌对唱。（邀请，三次失败罚表演）",
        "和坐你右边的同学深情对视并对她或他唱《老鼠爱大米》中的高潮部分。","和离你最近的一位同性同学十指相扣10秒，并看着对方说眼睛含情脉脉地说：我爱你。 ","对在场的一位异性说一分钟情话，不要冷场哦。",
        "给大家唱一首对于你来说有特殊意义的歌，并说出原因","右手捏住左耳垂，弯下腰，顺时针转10圈，再金鸡独立15秒不许倒。","蹲凳子上上做便秘状10秒钟",
        "冲到门外撕心裂肺的喊“台湾回归啦！台湾回归啦！大家快看中央一台⋯⋯”","用异性的声音唱一首大家都比较熟悉的歌","用舌头舔肘部",
        "舔鼻子","右手跨过后脑勺从左边摸右眼","请在做的任意一位舞一段，舞蹈任意",
        "将舌头翻过来，舌面朝下，舌底朝上","请女生跳完一支舞曲","说一句绕口令",
        "做个鬼脸，要观众满意 ","桌子上放一本书(或者其他东西，比如瓶盖)，厚约5cm，长宽约5cm×5cm，前面放一1角硬币，用嘴巴将硬币吹到书上","让在场的某位老师重温大话西游的经典对白，现场满意为止",
        "背起现场某个女性绕场一圈(非女友)","对异性请展示自己最性感的动作和最妩媚的动作","收集每一位的左脚袜子",
        "给现场的三位分别擦嘴、擦鼻涕、擦眼泪"],
        ["任意选定一位异性让ta做钢管，围着他跳钢管舞","与一位异性鼻子碰鼻子十秒钟","对着离你最近的异性的耳根敏感部位哈气，持续5秒",
        "对亲脖子","女生靠在墙上，男生撑在上面，做五下俯卧撑；","男生靠在墙上，女生撑在上面，坚持5秒钟；",
        "与异性贴身热舞","站在桌子上跳脱衣舞","隔纸巾接吻",
        "主持人帮选一个异性，抽到的人亲或被亲两边脸颊、下巴、锁骨","性感的拉裤子或者上衣到不能拉的位置","两只手贴着异性的脸，双眼对视一轮",
        "选两位异性用嘴唇传纸牌","男生从女生腰背后双手摸过搂住女生的腰，下巴放在女生肩上，坚持5秒","为右边第一个男生脱衣服，再为他穿上。 男生只能穿一件衣服",
        "碰胸（撞上去）","选一位异性，互摸嘴唇","坐在异性大腿上坚持10秒",
        "找一位你觉得在场最帅或最漂亮的一位异性合照","男生弹女生内衣大带 两边各一下","互亲异性耳垂",
        "与一位身高差不多的异性紧紧的抱5秒，脸必须搭在对方身上","选一位异性，由对方决定亲那里，不能是手","拜托一个男生和一个女生紧紧的抱在一起坚持五秒钟。",
        "男的靠在女的肚子上：老婆 几个月了","男生松掉女生bra带","互亲鼻子",
        "恭喜你 你可以指定两名异性接吻","舌吻在座的任何一位异性5秒钟","除了在做的任何一个人，找一个陌生人上去搭讪，必须是异性，问问ta“约吗？”"]],
      data: null,
      userId: null,
      hasShow: false,
      award: null,
      mac:null,
      isShowMessage:false,
      isShowLevel:false,
      rotateState:false,
      level:0,
      messageData:"",
      messageText:"",
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
      if(this.isShowLevel == false && this.isShowMessage == false){
        startRotate(this.randomFrom(0,turnplate.restaraunts.length-1))
      }

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
    showMessage(data,text){
      console.log(data)
      this.messageData = data
      this.messageText = text
      this.isShowMessage = !this.isShowMessage
      // MessageBox('结果', data);
    },
    closeMessage(){
      this.isShowMessage = !this.isShowMessage
    },
    backRn(){
      window.postMessage('game2');
    },
    changeLevel(item){
      if(this.rotateState == false && this.isShowMessage == false){
        this.isShowLevel = !this.isShowLevel
        if(item != -1){
          this.level = item
        }
      }
      // console.log(item)
    }
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

// $(document).ready(function(){
function init(this_vue){
  self = this_vue
	//动态添加大转盘的奖品与奖品区域背景颜色
	turnplate.restaraunts = ["PASS", "真心话", "大冒险", "真心话", "大冒险", "PASS", "真心话", "大冒险","真心话","大冒险"];
	turnplate.colors = ["#28CA5A", "#4FB62D", "#E74F36","#F98C17","#FCD419", "#28CA5A", "#4FB62D", "#E74F36","#F98C17","#FCD419",];

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
        self.rotateState = false;
        console.log(self.level)
        console.log(self.data2)
        if(txt == "真心话") {
          self.showMessage(txt,self.data1[self.level][self.randomFrom(0,self.data1[self.level].length-1)]);
        } else if(txt == "大冒险"){
          self.showMessage(txt,self.data2[self.level][self.randomFrom(0,self.data2[self.level].length-1)]);
        } else {
          self.showMessage(txt,"恭喜你 请下一位玩家进行表演")
        }
      }
		});
	};

	function startRotate(index){
    console.log('转');
    self.rotateState = true;
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
      // ctx.fillStyle = i%2==0 ? "#1B1B1B":"#161616";
      ctx.fillStyle = turnplate.colors[i]
		  ctx.beginPath();
		  //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
		  ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
		  ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
		  ctx.stroke();
		  ctx.fill();
		  //锁画布(为了保存之前的画布状态)
		  ctx.save();

		  //改变画布文字颜色

		  ctx.fillStyle = "#FFFFFF";

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
    background:url('../assets/game2_round.png') no-repeat 2px -1px;
    background-size: 100% 100%;
  }
  .hello {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/game2_bg.jpeg');
    background-size: 100% 100%;
  }
	/* 大转盘样式 */
	.banner{display:block;width:500px;margin-left:242px;;margin-right:auto;margin-bottom: 20px;padding-top:80px;height:500px;}
	.banner .turnplate{display:block;width:100%;position:relative;height:500px;}
	.banner .turnplate canvas.item{width:100%;margin-top: -80px;}
	.banner .turnplate img.pointer{position:absolute;width:190px;height:250px;left:31.5%;top:17.5%;}
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
    margin-top: -110px;
  }
  .showMessage {
    position:fixed;
    margin: auto;
    width:400px;
    min-height: 155px;
    top: 200px;
    left: 312px;
    z-index: 2001;
    text-align: center;
    background-color: #ffffff;
    border-radius:10px;
  }
    .showMessage h4 {
      font-size: 24px;
      color: #666666;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .showMessage h5 {
      font-size: 24px;
      color: #E5302F;
      margin-top: 10px;
    }
  .divide {
    background-color: #c9c9c9;
    width: 100%;
    height: 1px;
  }
</style>
