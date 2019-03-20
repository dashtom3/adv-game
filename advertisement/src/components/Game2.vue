<template>
  <div class="hello">
    <div v-if="canClick" class="canClick"></div><img isDisabled='false'  @click="intoEnglish" class="game_english" src="../assets/game1_Einglish.png" alt="">
    <!-- <img src="../assets/game2_title.png" class="title"> -->
    <!-- <img src="../assets/game1_select.png" class="select"> -->
    <img src="../assets/5.png" id="shan-img" style="display:none;" />
    <div class="banner">
    	<div class="turnplate">
    		<canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
    		<img class="pointer" src="../assets/game2_start1.png" @click="start"/>
    	</div>
    </div>
    <img src="../assets/game1_back.png" class="back" @click="backRn">
    <img src="../assets/game2_level.png" class="level" @click="changeLevel(-1)">
    <div class="showMessage" v-if="isShowMessage">
      <!-- <h4>{{messageText}}</h4> -->
      <img v-if="isimgPass" :src="imgSrc[0]" alt="">
      <img v-if="isimgTrue" :src="imgSrc[1]" alt="">
      <img v-if="isimgDanger" :src="imgSrc[2]" alt="">
      <div class="showMsg"><h4 v-if="passState">恭喜你</h4><h5>{{messageText}}</h5></div>
      <img class="showButton" src="../assets/game2_dialogButton.png" alt="" @click="closeMessage">
    </div>
    <div class="showMessage1" v-if="isShowLevel">
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
// import axios from 'axios';
// import  { MessageBox }  from 'mint-ui';

export default {
  name: 'Game2',
  data () {
    return {
      canClick:false,
      data1:[
        ["用三个词形容你自己，分别是什么？","你使用哪种方式作弊的？","左边的人对你说什么？你会很幸福！","你最擅长扮演哪个卡通人物？",
        "班上有你最信任的人吗？是谁？","你最牛的一次逃课经历是怎样的？","你背着家长做过什么坏事吗？","如果看到自己最爱的人熟睡在你面前你会做什么？","写首自己最最喜爱的歌？","当你最不知道穿什么颜色的时候，你会选择什么颜色？",
        "你最后悔的一件事是什么？","曾经有过最被感动的事是什么？","如果给你一个机会去世界上任何一个地方旅行你会去?", "如果时间能倒流你希望回到哪一时间？","你心目中理想的爱人是什么样子呢？","最想实现的三个愿望是什么？", "如果让你拥有一种超能力，你愿意拥有什么呢？","最喜欢哪部电影？","与喜欢的人见面，想要穿成什么样？",
        "果有来生，你选择当？","最喜欢的食物是什么 ","如何向喜欢的人表白？","如果你爱的人不爱你怎么办？","如果有一天，你生命中最重要的东西离你而去了，你会怎么办？","如果从天而降99枚金币，你的第一反应是什么？",
        "世界末日，你会幸存，并且你可以救一个人，你会怎么做？","如果让你选择做一个电影中的角色，你会选谁呢？","你在乎别人看你的眼光吗？会为了众人的反对放弃自己想要的东西或人吗？",
        "你的爱人要出国，你会怎么做？","在你心中谁最可信？","你希望谁得到幸福？","你会选择你爱的人还是爱你的人？","现在你最喜欢的人是谁？","目前最大的愿望？",
        "如果有一天自己觉得自己的某一次选择是错的，可是现在已经再也无法重新来，那该怎么办？","对你而言，爱情和友情哪个比较重要？","如果能预知未来，你最不希望看见的是什么？",
        "哭得最伤心的是哪一次？为什么？","喜欢看什么动画片？","你最不开心的时候会有什么表现？","在爱情和面包中，你会选择哪个？为什么？","最想感谢的人是谁？","你觉得最美的画面是什么？",
        "如果跟你喜欢的人约会，碰到前任的男（女）朋友，会有什么表现？","到目前为止你做过最疯狂的事是？","你的初吻是几岁在什么地方被什么人夺去的?","你的初恋是几岁?","你的初恋对象是谁?",
        "大学一共挂过几门课？","大学所有考试中，你考到最低的一门是什么课，考了几分？","你吻过几个人？","在现场所有同学中，你看哪位异性同学最舒服？","第一个喜欢的异性叫什么名字？","你曾经意淫过在场的哪一位？如果过去没有的话，你现在会选哪一位作为YY对象？","对梦中情人有什么要求（在一分钟内说出五条）。","让你一直念念不忘的一位异性的名字？原因？",
        "谈过几次恋爱？","每天睡觉前都会想起的人是谁？","你最怕的事情或东西是什么（说出三件）。","你会不会在意ta的过去，为什么？","打算什么时候结婚？","现在心里最在意的异性叫什么名字？","结婚后希望生男孩还是女孩(只能选择一个，说出原因)。","和多少异性有过非恋爱的暧昧关系？",
        "你作弊使用过的最高招","从小到大最丢脸出丑的事情是什么？","如果明天是世界末日，你现在最想做的是什么？","如果让你kiss现场的某一位异性，你会选择谁，为什么？","说出同寝室的人最让你受不了的习惯",
        "最欣赏自己哪个部位？对自己那个部位最不满意？","最喜欢在座哪位异性","内衣/裤颜色","自己最丢人的事","最后一次发自内心的笑是什么时候？","男/女朋友和朋友那个重要","身上哪个部位最敏感","如果有来生，你选择当？","如果让你选择做一个电影中的角色，你会选谁呢？","哭得最伤心的是哪一次？为什么？",
        "如果跟你喜欢的人约会，碰到前任的男（女）朋友，会有什么表现？","上一次接吻的是什么时候？和谁？"],
        ["你的初吻是几岁在什么地方被什么人夺去的?","你的初恋是几岁?","你的初恋对象是谁?","大学一共挂过几门课？","大学所有考试中，你考到最低的一门是什么课，考了几分？","你吻过几个人？",
        "在现场所有同学中，你看哪位异性同学最舒服？","高中时代，你看哪位老师最不顺眼？","如果再给你一次机会，回到高中毕业那天，你最想对某一位异性说什么话？","第一个喜欢的异性叫什么名字？","你曾经意淫过在场的哪一位？如果过去没有的话，你现在会选哪一位作为YY对象？",
        "今天穿什么颜色的内裤？","对梦中情人有什么要求（在一分钟内说出五条）。","让你一直念念不忘的一位异性的名字？原因？","谈过几次恋爱？","每天睡觉前都会想起的人是谁？","你最怕的事情或东西是什么（说出三件）。",
        "你会不会在意ta的过去，为什么？","打算什么时候结婚？","现在心里最在意的异性叫什么名字？","你通常用那只指头挖鼻子？","第一次爱的人对你有什么影响？","你在意你的老婆（老公）不是处女（处男）吗？",
        "你会为了爱情牺牲一切，包括生命吗？","结婚后希望生男孩还是女孩(只能选择一个，说出原因)。","和多少异性有过非恋爱的暧昧关系？","你作弊使用过的最高招","从小到大最丢脸出丑的事情是什么？","如果明天是世界末日，你现在最想做的是什么？","如果让你kiss现场的某一位异性，你会选择谁，为什么？","说出同寝室的人最让你受不了的习惯",
        "最欣赏自己哪个部位？对自己那个部位最不满意？","暗恋过几个异性？有主动追求过吗？","昨晚又没有做春梦？对象是谁？","最喜欢吃的食物？"," 曾经看了流泪的电影？"," 你会期待一夜情吗？","无聊的时候一般做什么？","会经常便秘吗?","最尴尬的事？","最伤心的经历？","今天穿什么衣服？每一件是花多少钱买的？一件不能少。"," 理想中的另一半是什么样子？","在和男、女朋友交往的过程中，有被甩过吗？",
        "说出五种避孕方式？","你是否会有时孤枕难眠？"," 你是处女、处男吗？","请讲述第一次恋爱的情景？"," 你认为男人善变还是女人善变？",
        "你在寂寞时，会想起谁？","只给你一天时间当异性，你最想做什么？"],
        ["男生回答自己的下面有多长，女生回答自己的罩杯。","你的性幻想对象是谁？","和男女朋友进行到哪一步？",
         "身上哪个部位最敏感？","你对左边第三个异性有什么感觉？要具体。","如果你必须选择和在做的某一位异性回家，你会选择谁？",
         "在你洗澡时，有一个非常丑的异性冲了进来，你会怎么样","你最愿意和在场哪个异性私奔？","你希望左边第3位异性是你的谁？",
         "最喜欢的做爱姿势是什么？","最长的一次做爱有多久，和谁？","你觉得在座那位异性的嘴唇看起来最想Kiss？",
         "你约过炮吗？感觉对方怎么样？","你觉得你曾经喜欢的人和在座哪个人最像？","最难忘的一次啪啪啪是在什么地方，和谁？",
         "你想和在场的哪一位玩大冒险？","如果有来生你选择当？","在场哪一位异性对你说我喜欢你，你会最开心？",
         "第一次是在什么时候？","平时看哪个老师的片儿，或者有什么网站吗和大家分享一下。","如果时间能倒流你希望回到哪一时间，为什么？",
         "如果前一个异性玩家爱上你了，你怎么办？","你上一次性生活是什么时候，和谁？","你觉得在座最帅或最漂亮的人是谁？",
         "你会尝试或者选择和同性做爱吗？","有什么怪癖吗？","洗澡洗到一半没水了怎么办？",
         "你认为在座的哪一位异性可以成为你的性幻想对象?","认同没有性的爱情和没有爱的性吗?","你觉得对面那个人那个部位最好看？",
         "做爱时候最喜欢的姿势是什么","尝试过最刺激的性生活是在哪里","最喜欢用的避孕套是什么牌子的?","能接受另一半劈腿吗","有过一夜情吗?感觉怎样?","约炮约到一半发现对方是同性怎么办","结婚之后会出轨吗",
         "喜欢看哪类型的片儿","你的性幻想对象是谁?","最近一次做的春梦,描述一下","上一次做爱是什么时候,和谁?","洗澡的时候会站着尿尿吗","有没有尝试过多p","喜欢什么样身材的异性","约炮一般用什么app约,和大家分享一下",
         "婚后愿意换妻吗","性爱方面有什么怪癖吗","发朋友圈会屏蔽别人吗","戴套的时间都在想什么"]],
      data2:[["发朋友圈说自己准备要结婚了","表演一段上厕所的动作","原地转仨圈，同时说出六个老师的名字",
        "给左边的玩家打三下屁股","唱一首儿歌","在微博好友上@第一个人，并写：今天我们分开了，你过的还好吗",
        "打电话给数学老师，让他答应下次测验给你99分","模仿一位明星的经典动作让大家猜","跳一段在幼儿园学的舞蹈给大家看",
        "表演一段新闻联播","对任意一个陌生人说：放学一起回家吧","双手抱头，青蛙跳十下",
        "爆笑15秒","做三个卖萌的表情，让大家拍照","让大家看看你手机里任意一个人的短信",
        "打电话给家长说：爸妈我恋爱了","抱着垃圾桶唱征服","对窗外大喊：“我好寂寞阿。”",
        "随便给手机里的一个异性打电话。说：其实...我是...猪。","把从你右手边数起第三位异性的腿架在肩上替其捶腿，边说“大爷您舒服吗？”","去厕所里唱歌。让所有人都能听到你唱的什么歌。",
        "抱一位离你最远的异性直到下一轮真心话大冒险结束。","对一个陌生人说：“我不会看表，请您看一下我的手表上显示的是几点”","模仿喝一杯烈酒的样子喝完一杯白开水",
        "站在桌子上,大喊“我是超人,我要回家了！”","与从你左手边数起第二位异性对喝交杯酒","找一个陌生人说自己要上厕所了，直到别人给手纸为止。","背一位异性绕场一周","唱青藏高原最后一句","做一个大家都满意的鬼脸","抱一位异性直到下一轮真心话大冒险结束",
        "像一位异性表白3分钟","与一位异性十指相扣，对视10秒","邀请一位异性为你唱情歌，或邀请一位异性与你情歌对唱","做自己最性感、最妩媚的表情或动","蹲在凳子上作便秘状","深情的吻墙10秒",
        "模仿脑白金广告，边唱边跳","让他到街上大喊“卖拖鞋啦～2块一双，买一送3”","抓着铁门喊“放我出去”","对陌生人美眉挤眉弄眼","正面相隔做接吻陶醉状10秒","原地转10圈（就近靠下","跳肚皮舞","跳钢管舞"," 对外大喊我是 猪","走猫步","摆3个芙蓉姐姐S形","和左数第一个异性亲一下",
        "脱一件衣服持续到结束","背起右边第一 个女生","大喊 燃烧吧，小宇宙～","选一个男生 一边捶他的胸一边说： 你好讨厌哦"," 躺在床上摆pose说 饭在锅里，我在床上","一人先用嘴吸住一纸牌，另一人用嘴从另一面将纸牌吸住移走","女生仰躺地上，男生撑在上面，做五下俯卧撑"," 男生仰躺地上，女生撑在上面，坚持5秒钟"," 男生坐床上，女生躺床上，将头枕男生腿上，对视10秒"," 男生将女生逼角落，用'调情式'一手撑墙，两人深情对视10秒",
        "男生单腿下跪，女生伸手，男生亲女生手背"," 男生单腿下跪，女生亲男生额头","男生抱起女生，保持5秒钟"," 男生把女生面对面抱起来，女生用双腿夹住男生"," 对喝交杯酒","对喂花生米","跳舞转圈"],
        ["请kiss在本桌或本教室离你最近的一位异性同学三秒钟","请在现场选一位异性同学，向他或她表白","站到凳子上表演大猩猩捶胸呐喊动作",
        "学超级名模走秀，绕桌子或教室一圈","与本桌或本教室离你最近的一位异性同学拥抱十秒钟。","找在场的一位异性情歌对唱。（邀请，三次失败罚表演）",
        "和坐你右边的同学深情对视并对她或他唱《老鼠爱大米》中的高潮部分。","和离你最近的一位同性同学十指相扣10秒，并看着对方说眼睛含情脉脉地说：我爱你","对在场的一位异性说一分钟情话，不要冷场哦。",
        "给大家唱一首对于你来说有特殊意义的歌，并说出原因","右手捏住左耳垂，弯下腰，顺时针转10圈，再金鸡独立15秒不许倒。","蹲凳子上上做便秘状10秒钟",
        "冲到门外撕心裂肺的喊“台湾回归啦！台湾回归啦！大家快看中央一台⋯⋯”","用异性的声音唱一首大家都比较熟悉的歌","用舌头舔肘部",
        "舔鼻子","右手跨过后脑勺从左边摸右眼","请在做的任意一位舞一段，舞蹈任意",
        "将舌头翻过来，舌面朝下，舌底朝上","请女生跳完一支舞曲","说一句绕口令",
        "做个鬼脸，要观众满意 ","桌子上放一本书(或者其他东西，比如瓶盖)，厚约5cm，长宽约5cm×5cm，前面放一1角硬币，用嘴巴将硬币吹到书上","让在场的某位老师重温大话西游的经典对白，现场满意为止",
        "背起现场某个女性绕场一圈(非女友)","对异性请展示自己最性感的动作和最妩媚的动作","收集每一位的左脚袜子",
        "给现场的三位分别擦嘴、擦鼻涕、擦眼泪","女生踩男生脚上跳舞"," 女生坐男生小腿上，男生做仰卧起坐","站起来,大喊'我是超人,我要回家了!'"," 头顶簸箕，手拿笤帚，边跳边唱道：我爱劳动，我爱卫生"," 学水兵月做动作，然后对一个人说: 我要代替月亮惩罚你!!",
        "男生摸自己胸说“唉太小了”","找一男生,把腿放他肩膀上让他捶腿","亲左数第二个异性的额头","和左边第一个异性换穿上衣","在厕所里唱歌，让大家都能听到唱的是什么","说出京杭大运河的经过的中国五大水系",
        "左手拉右耳，右手拉左耳，从桌子底下过","露出肚皮，扭腰扭屁股，各扭3圈","和右边第一个异性关在厕所里等一轮游戏","用手纸当围巾，围脖子上持续一轮游戏","任选两个男生一起摆芙蓉姐姐的S形","把右边第一个 异性横抱起来"," 慢慢地性感地把上衣撩起到不能再撩起的位置","对窗外大喊“我好寂寞啊”",
        "请在现场选一位异性同学，向他或她表白","站到凳子上表演大猩猩捶胸呐喊动作"],
        ["任意选定一位异性让ta做钢管，围着他跳钢管舞","与一位异性鼻子碰鼻子十秒钟","对着离你最近的异性的耳根敏感部位哈气，持续5秒",
        "对亲脖子","女生靠在墙上，男生撑在上面，做五下俯卧撑；","男生靠在墙上，女生撑在上面，坚持5秒钟；",
        "与异性贴身热舞","站在桌子上跳脱衣舞","隔纸巾接吻",
        "主持人帮选一个异性，抽到的人亲或被亲两边脸颊、下巴、锁骨","性感的拉裤子或者上衣到不能拉的位置","两只手贴着异性的脸，双眼对视一轮",
        "选两位异性用嘴唇传纸牌","男生从女生腰背后双手摸过搂住女生的腰，下巴放在女生肩上，坚持5秒","为右边第一个男生脱衣服，再为他穿上。 男生只能穿一件衣服",
        "碰胸（撞上去）","选一位异性，互摸嘴唇","坐在异性大腿上坚持10秒",
        "找一位你觉得在场最帅或最漂亮的一位异性合照","男生弹女生内衣大带 两边各一下","互亲异性耳垂",
        "与一位身高差不多的异性紧紧的抱5秒，脸必须搭在对方身上","选一位异性，由对方决定亲那里，不能是手","拜托一个男生和一个女生紧紧的抱在一起坚持五秒钟。",
        "男的靠在女的肚子上：老婆,几个月了","男生松掉女生bra带","互亲鼻子",
        "恭喜你,你可以指定两名异性接吻","舌吻在座的任何一位异性5秒钟","除了在座的人，找一个异性陌生人上去搭讪，问问ta“约吗？”","选择一位异性表演最喜欢的姿势","找在这场任意一位异性互换微信",
        "给前任打电话说自己现在好想要","发朋友圈“寂寞  空虚  冷”","打电话给第八位联系人 问他穿了什么颜色的内裤","打电话给爸妈,说自己/自己女朋友怀孕了","和任意一位同性接吻五秒钟",
        "躺在地上大喊 “我还要喝”","任意找搭档演绎《泰坦尼克号》经典桥段you jump i jump","模仿叫床的声音 在座的大家都能听到","给前任 问问他还能回去吗？","问问服务员 “这台机器我好想要我能不能买一台”",
        "问朋友借100块钱 借到为止","公主抱（自己选择人选）","找在座任意异性互咬耳朵"]],
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
      imgSrc:[require('../assets/game2_pass.png'),require('../assets/game2_true.png'),require('../assets/game2_danger.png')],
      flag:true,//控制连续点击
      timeOut:'',//计时器(4)
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
      if(that.$route.path == "/game2") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
    //进入英文模式
    intoEnglish(){
      this.$router.push({name:'Game2English'})
    },
    start() {
      if(this.isShowLevel == false && this.isShowMessage == false && this.flag == true){
        startRotate(this.randomFrom(0,turnplate.restaraunts.length-1))
        //英文切换按钮不可点
        this.canClick = true;
        //不可连续点击
        this.flag = false
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
      this.flag = true
        //英文切换按钮是否可点
      this.canClick = false;
      window.postMessage('Game2');
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
    changeLevel(item){
      if(this.rotateState == false && this.isShowMessage == false){
        this.isShowLevel = !this.isShowLevel
        if(item != -1){
          this.level = item
        }
      }
      // console.log(item)
       this.startTimer()//开启计时
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
        self.rotateState = false;
        // console.log(self.level)
        // console.log(self.data2)
        if(txt == "真心话") {
          self.isimgTrue = true
          self.showMessage(txt,self.data1[self.level][self.randomFrom(0,self.data1[self.level].length-1)]);
        } else if(txt == "大冒险"){
          self.isimgDanger = true
          self.showMessage(txt,self.data2[self.level][self.randomFrom(0,self.data2[self.level].length-1)]);
        } else {
          self.isimgPass = true
          self.passState = true
          self.showMessage(txt,"有请下一位玩家")
        }
      }
		});
	};

	function startRotate(index){
    // console.log('转');
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
    ctx.strokeStyle = "#FFFFFF";
	  //font 属性设置或返回画布上文本内容的当前字体属性
    ctx.font = 'bold 18px Microsoft YaHei';
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
		  ctx.rotate(angle + arc / 2 + Math.PI / 2 + 80.1);

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
    background:url('../assets/game2_round2.png') no-repeat 2px -1px;
    background-size: 100% 100%;
  }
  .hello {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/game2C_bg.png');
    background-size: 100% 100%;
    overflow: hidden;
  }
	/* 大转盘样式 */
  .canClick{position: absolute;width: 145px;right: 25px;top: 12px;height: 55px;z-index: 200;}
  .game_english{position: absolute;width: 145px;right: 25px;top: 12px}
	.banner{display:block;width:505px;margin-left:242px;;margin-right:auto;margin-bottom: 20px;padding-top:80px;height:505px;}
	.banner .turnplate{display:block;width:100%;position:relative;height:500px;left:61px;bottom: 17px;}
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
    width:486px;
    height: 600px;
    min-height: 155px;
    top: -605px;
    left: 310px;
    z-index: 2001;
    text-align: center;
    border-radius:10px;
  }
  .showMessage1 {
    position: fixed;;
    margin: auto;
    width:390px;
    height: 170px;
    background: white;
    min-height: 155px;
    top: 210px;
    left: 360px;
    z-index: 2008;
    text-align: center;
    border-radius:10px;
  }
  .showMessage1 h4 {
    font-size: 24px;
    color: #666666;
    margin-top: 10px;
    margin-bottom: 10px;
    }
.showMessage1 h5 {
    font-size: 24px;
    color: #e5302f;
    margin-top: 10px;
    
    }
    .showButton {
      position: absolute;
      bottom: 130px;
      left: 180px;
      width: 124px;
      height: 44px;
    }
    .showMsg{
      position: absolute;
      top: 180px;
      left: 110px;
      width: 270px;
      height: 245px;
      display: flex;
      text-align: justify;
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
      font-size: 23px;
      font-family:'YouYuan';
      color: #170654;
      line-height: 40px;
      z-index: 1000;
      max-height:250px ;
      overflow: hidden;
      /* margin: auto; */
    }
  .divide {
    background-color: #c9c9c9;
    width: 100%;
    height: 1px;
  }
</style>
