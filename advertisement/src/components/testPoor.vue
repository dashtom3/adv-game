<template>
  <div class="testPoor">
    <img src="../assets/testPoor_bg.png" alt="">
    <img class="poorSelect" src="../assets/testPoor_select.png" alt="">
    <img class="poorSelect1" src="../assets/testPoor_select.png" alt="">
    <img class="poorSure" src="../assets/testPoor_sure.png" @click="poorSure" alt="">
    <img class="gohome" src="../assets/ringReturn.png" @click="goback" alt="">
    <div class="PoorSelect_content">
        <el-select v-model="constellation" placeholder="" popper-class='testpoorselect' @change="selectChange">
            <el-option
            v-for="item in constellationArr"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </div>
    <div class="PoorSelect_content1">
        <el-select v-model="likething" placeholder="" popper-class='testpoorselect' @change="selectChange">
            <el-option
            v-for="item in likethingArr"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </div>
    <div v-if="poorDialog">
        <img class="dialog_" src="../assets/testPoorDialog_bg.png" alt="">
        <img class="dialog_bg" src="../assets/testPoorDialog.png" alt="">
        <img class="goback" src="../assets/ringReturn.png" @click="goback" alt="">
        <div class="answer">
            <p>{{getAnswer()}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'testPoor',

  data () {
    return {
        timeOut:'',//计时器(4)
        gameReturnTime:null, //存储返回时间
        constellationArr: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
        likethingArr:['打游戏','跑步','吃饭','睡觉','加班','遛狗'],
        answertxtArr:['一个月','三个月','NAN','半年','一年','NAN','一天','两周','一直穷下去','NAN','山无棱天地和 你才能不穷','穷到地老天荒','天生富贵命','NAN'],
        answertxt:null,
        constellation: '白羊座',
        likething:'打游戏',
        poorDialog:false,
    }
  },
mounted() {
    // localStorage.setItem('poorinfo',JSON.stringify({"白羊座打游戏":[13,0,200]}))
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
      if(that.$route.path == "/testPoor") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
      selectChange(){
          console.log('时间更新')
          this.startTimer() //开启计时
      },
      getAnswer(){
          var num =  Math.floor(Math.random()*11)
          var num2 = Math.floor(Math.random()*300+1)
          
          var poorinfo = JSON.parse(localStorage.getItem('poorinfo'))
          if(poorinfo =='' || poorinfo == null){
              var poorinfo = {}
              poorinfo[this.constellation+this.likething] = [new Date().getDay()+new Date().getHours(),num,num2]
                   localStorage.setItem('poorinfo',JSON.stringify(poorinfo)) 
          }else{
              if(poorinfo[this.constellation+this.likething] == '' || poorinfo[this.constellation+this.likething] == null){
                  poorinfo[this.constellation+this.likething] = [new Date().getDay()+new Date().getHours(),num,num2]
                   localStorage.setItem('poorinfo',JSON.stringify(poorinfo))
              }
          }
          if(poorinfo[this.constellation+this.likething][0] == new Date().getDay()+new Date().getHours()){
            num = poorinfo[this.constellation+this.likething][1]
            num2 = poorinfo[this.constellation+this.likething][2]
              console.log(new Date().getDay()+new Date().getHours())
          }else{
              poorinfo[this.constellation+this.likething] = [new Date().getDay()+new Date().getHours(),num,num2]
                   localStorage.setItem('poorinfo',JSON.stringify(poorinfo))
            console.log(this.constellation+this.likething,num,num2)
          }
          if(this.answertxtArr[num] == 'NAN'){
              return num2+'天'
          }else{
              return this.answertxtArr[num]
          }
      },
      poorSure(){
             this.startTimer() //开启计时
            this.poorDialog = !this.poorDialog
            window.postMessage('clickPoor')
      },
      goback(){
          if(this.poorDialog == true){
              this.startTimer() //开启计时
              this.poorDialog = !this.poorDialog
          }else{
              this.$router.push({name:'divinationHome'})
          }
      } 
  }
}
</script>

<style lang="less">
.testPoor{
.poorSelect{position: absolute;bottom: 130px;left: 190px}
.poorSelect1{position: absolute;bottom: 130px;right: 90px}
.poorSure{position: absolute;left: 0;right: 0;bottom: 50px;margin: auto;}
.gohome{position: absolute;right: 20px;bottom: 20px}
.PoorSelect_content{position: absolute;bottom: 127px;width: 120px;left: 193px;height: 47px;}
.PoorSelect_content1{position: absolute;bottom: 127px;width: 120px;right: 95px;height: 47px;}
.el-input__inner{height: 40px;text-align: center;background:transparent;color: #33342F;font-size: 24px;padding-right: 20px;font-weight: 800;border: none;outline: none}
.dialog_{position: absolute;top: 0;left: 0;}
.dialog_bg{position: absolute;top: 65px;left: 0;right: 0;margin: auto}
.goback{position: absolute;top:380px;left: 480px}
.answer{position: absolute;width: 350px;left: 0;right: 0;top: 180px;margin: auto}
.answer p{font-family: 'Microsoft YaHei';font-size: 48px;color: #68C2CC; }
/*element select样式修改*/
.el-select .el-input__inner:focus{border:none;outline: none}
}
.testpoorselect{
    .el-scrollbar{text-align: center;font-family: 'Microsoft YaHei';}
    .el-select-dropdown__item{font-size: 20px}
    .el-select-dropdown__wrap{max-height: 215px}
    .el-select-dropdown__item{height: 35px}
}
</style>
