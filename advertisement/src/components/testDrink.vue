<template>
  <div>
    <img src="../assets/drink_bg.png" alt="">
    <div :class=" 'select' + index" v-for="(item,index) in arr" @click="showSelect(index)">
        <img src="../assets/drinkSelect.png" alt="">
        <img v-show="item.isSelect" src="../assets/drink_tick.png" alt="">
    </div>
    <img v-show="!showdialog" class="drinkSure" src="../assets/drink_sure.png" @click="drinkSure" alt="">
    <img v-show="!showdialog" class="drinkReturn" src="../assets/ringReturn.png" @click="goback" alt="">
    <div v-if="showdialog" class="drinkDialog">
      <img src="../assets/drinkDialog.png" alt="">
      <img class="drinkReturn1" src="../assets/ringReturn.png" @click="goback" alt="">
      <div class="dialogTxt">
        <h4>测试结果</h4>
        <div class="conten" v-for="item in textArr">
          <span class="title">{{item.title}}:</span>
          <img v-for="item1 in item.starNum" src="../assets/solidStar.png" alt="">
          <img v-for="item1 in 5-item.starNum" src="../assets/dashedStar.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'testDrink',
  data () {
    return {
      timeOut:'',//计时器(4)
      gameReturnTime:null, //存储返回时间
      showdialog:false,
      arr:[{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false}],
      textArr:[{title:'好色指数',starNum:Math.floor(Math.random()*6)},
              {title:'话多指数',starNum:Math.floor(Math.random()*6)},
              {title:'多愁善感指数',starNum:Math.floor(Math.random()*6)},
              {title:'躺马路指数',starNum:Math.floor(Math.random()*6)},
              {title:'给前任打电话指数',starNum:Math.floor(Math.random()*6)},
              {title:'哭泣流泪指数',starNum:Math.floor(Math.random()*6)},
              {title:'吐成狗指数',starNum:Math.floor(Math.random()*6)},
              {title:'完全断片指数',starNum:Math.floor(Math.random()*6)}],
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
  // var drinkInfo = {}
  // var aa = [0]
  // drinkInfo[aa] = [new Date(),this.textArr]
  // localStorage.setItem('drinkInfo',JSON.stringify(drinkInfo))
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
      if(that.$route.path == "/testDrink") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
    showSelect(index){
      this.arr[index].isSelect = !this.arr[index].isSelect
      this.startTimer() //开启计时
      // console.log(this.timeOut)
    },
    drinkSure(){
       this.startTimer() //开启计时
      //先判断是否选择了
      var isChoose = []
     for(var i=0;i<this.arr.length;i++){
       if(this.arr[i].isSelect != false){
          isChoose.push(i)
          this.showdialog = true
       }
     }
     var drinkInfo = JSON.parse(localStorage.getItem('drinkInfo'))
     if(drinkInfo == null || drinkInfo == ''){
       var drinkInfo = {}
       drinkInfo[isChoose] = [new Date().getDay()+new Date().getHours(),this.textArr]
       localStorage.setItem('drinkInfo',JSON.stringify(drinkInfo))
     }else{
       if(drinkInfo[isChoose] == '' || drinkInfo[isChoose] == null){
         drinkInfo[isChoose] = [new Date().getDay()+new Date().getHours(),this.textArr]
         localStorage.setItem('drinkInfo',JSON.stringify(drinkInfo))
       }
     }
     if(drinkInfo[isChoose][0] == new Date().getDay()+new Date().getHours()){
       this.textArr = drinkInfo[isChoose][1]
     }else{
       drinkInfo[isChoose] = [new Date().getDay()+new Date().getHours(),this.textArr]
         localStorage.setItem('drinkInfo',JSON.stringify(drinkInfo))
     }

     if(this.showdialog == true){
       console.log('你点击了')
        window.postMessage('clickDrink')
     }
    
    },
    goback(){
      if(this.showdialog == true){
        //重置data数据 
        this.startTimer() //开启计时
        this.showdialog = false
        this.arr = [{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false},{isSelect:false}]
        this.textArr = [{title:'好色指数',starNum:Math.floor(Math.random()*6)},
              {title:'话多指数',starNum:Math.floor(Math.random()*6)},
              {title:'多愁善感指数',starNum:Math.floor(Math.random()*6)},
              {title:'躺马路指数',starNum:Math.floor(Math.random()*6)},
              {title:'给前任打电话指数',starNum:Math.floor(Math.random()*6)},
              {title:'哭泣流泪指数',starNum:Math.floor(Math.random()*6)},
              {title:'吐成狗指数',starNum:Math.floor(Math.random()*6)},
              {title:'完全断片指数',starNum:Math.floor(Math.random()*6)}]
        // Object.assign(this.$data.arr,this.$options.data().arr)
        // Object.assign(this.$data.textArr,this.$options.data().textArr)
      }else{
        this.$router.push({name:'divinationHome'})
      }
    },
  }
}
</script>
<style  scoped>
/* 从左到右依次8个*/
  .select0 img:nth-child(1){position: absolute;top: 270px;left: 310px;padding: 10px}
  .select0 img:nth-child(2){position: absolute;top: 265px;left: 315px;}

  .select1 img:nth-child(1){position: absolute;top: 270px;left: 550px;padding: 10px}
  .select1 img:nth-child(2){position: absolute;top: 265px;left: 555px;}

  .select2 img:nth-child(1){position: absolute;top: 320px;left: 310px;padding: 10px}
  .select2 img:nth-child(2){position: absolute;top: 315px;left: 315px;}

  .select3 img:nth-child(1){position: absolute;top: 320px;left: 550px;padding: 10px}
  .select3 img:nth-child(2){position: absolute;top: 315px;left: 555px;}

  .select4 img:nth-child(1){position: absolute;top: 370px;left: 310px;padding: 10px}
  .select4 img:nth-child(2){position: absolute;top: 365px;left: 315px;}

  .select5 img:nth-child(1){position: absolute;top: 370px;left: 550px;padding: 10px}
  .select5 img:nth-child(2){position: absolute;top: 365px;left: 555px;}

  .select6 img:nth-child(1){position: absolute;top: 420px;left: 310px;padding: 10px}
  .select6 img:nth-child(2){position: absolute;top: 415px;left: 315px;}

  .select7 img:nth-child(1){position: absolute;top: 420px;left: 550px;padding: 10px}
  .select7 img:nth-child(2){position: absolute;top: 415px;left: 555px;}
  .drinkSure{position: absolute;bottom: 70px;left: 0;right: 0;margin: auto;}
  .drinkReturn{position: absolute;right: 20px;bottom: 15px}
  .drinkDialog{position: absolute;left: 0;right: 0;top: 60px;margin: auto;}
  .drinkReturn1{position: absolute;right: 215px;bottom: 30px;z-index: 500;}
  .dialogTxt{position: absolute;width: 450px;height: 400px;top: 20px;left: 220px;margin: auto;}
  .dialogTxt h4{font-family: 'Microsoft YaHei';font-size: 34px;font-weight: bolder;color: #A71E28;padding-left: 160px}
  .title{font-family: '黑体';font-size: 30px;color: #A71E28;}
  .conten{padding-top: 8px;text-align: right;}
  .conten img{vertical-align: top;padding-top:2px}
</style>
