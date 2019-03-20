<template>
  <div class="testCar">
    <img src="../assets/testCar_bg.jpg" alt="">
    <img class="carSelect" src="../assets/testCar_select.png" alt="">
    <img class="carSelect1" src="../assets/testCar_select.png" alt="">
    <img class="carSure" src="../assets/testCar_sure.png" @click="clickSure" alt="">
    <img class="carReturn" src="../assets/testCar_return.png" @click="goback" alt="">
    <div class="CarSelect_content">
        <el-select v-model="sex" placeholder="" popper-class='testCarselect' @change="selectChange">
            <el-option
            v-for="item in sexArr"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </div>
    <div class="CarSelect_content1">
        <el-select v-model="constellation" placeholder="" popper-class='testCarselect' @change="selectChange">
            <el-option
            v-for="item in constellationArr"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </div>
    <div v-if="showDialog" class="carDialog">
        <img src="../assets/testCarDialog_bg.jpg" alt="">
        <img class="dialog" src="../assets/testCarDialog.png" alt="">
        <img class="car_content" :src="getCar()" alt="">
        <img class="carReturn1" src="../assets/testCar_return.png" @click="goback" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
        timeOut:'',//计时器(4)
        gameReturnTime:null, //存储返回时间
        sexArr:['男','女'],
        constellationArr: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
        constellation:'白羊座',
        sex:'男',
        showDialog:false,
        carArr:[require('../assets/testCar0.jpg'),require('../assets/testCar1.jpg'),require('../assets/testCar2.jpg'),require('../assets/testCar3.jpg'),require('../assets/testCar4.jpg'),
                require('../assets/testCar5.jpg'),require('../assets/testCar6.jpg'),require('../assets/testCar7.jpg'),require('../assets/testCar8.jpg'),require('../assets/testCar9.jpg'),
                require('../assets/testCar10.jpg'),require('../assets/testCar11.jpg'),require('../assets/testCar12.jpg'),require('../assets/testCar13.jpg'),require('../assets/testCar14.jpg'),
                require('../assets/testCar15.jpg'),require('../assets/testCar16.jpg'),require('../assets/testCar17.jpg'),require('../assets/testCar18.jpg'),require('../assets/testCar19.jpg'),
                require('../assets/testCar20.jpg'),require('../assets/testCar21.jpg'),require('../assets/testCar22.jpg'),require('../assets/testCar23.jpg')]
    }
  },
mounted() {
    // localStorage.setItem('carInfo',JSON.stringify({"男白羊座":[13,0]}))
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
          window.postMessage('gameHome')
        },1000*that.gameReturnTime)
    },
    isTimeOut() {
      let that = this;
      if(that.$route.path == "/testCar") {//监听路由变化
        that.startTimer();//开启计时
      }
    },
    selectChange(){
          console.log('时间更新')
          this.startTimer() //开启计时
      },
      getCar(){
          var num = Math.floor(Math.random()*24)
          var carInfo = JSON.parse(localStorage.getItem('carInfo'))
          if(carInfo == '' || carInfo ==null){
              var carInfo = {}
              carInfo[this.sex+this.constellation] = [new Date().getDay()+new Date().getHours(),num]
              localStorage.setItem('carInfo',JSON.stringify(carInfo))
          }else{
              if(carInfo[this.sex+this.constellation] == '' || carInfo[this.sex+this.constellation] == null){
                carInfo[this.sex+this.constellation] = [new Date().getDay()+new Date().getHours(),num]
                localStorage.setItem('carInfo',JSON.stringify(carInfo))
              }
          }
          if(carInfo[this.sex+this.constellation][0] == new Date().getDay()+new Date().getHours()){
              num = carInfo[this.sex+this.constellation][1]
          }else{
              carInfo[this.sex+this.constellation] = [new Date().getDay()+new Date().getHours(),num]
              localStorage.setItem('carInfo',JSON.stringify(carInfo))
          }
          console.log(this.sex,this.constellation)
          return this.carArr[num]
      },
      clickSure(){
          this.startTimer() //开启计时
          this.showDialog = !this.showDialog
          window.postMessage('clickCar')
      },
      goback(){
          if(this.showDialog == true){
            //   Object.assign(this.$data,this.$options.data())
              this.startTimer() //开启计时
              this.showDialog = false
          }else{
              this.$router.push({name:'divinationHomedown'})
          }
      }
  }
}
</script>

<style lang='less'>
.testCar{
    .carSelect{position: absolute;bottom: 190px;left: 300px;}
    .carSelect1{position: absolute;bottom: 190px;right: 200px;}
    .carSure{position: absolute;left:0;right: 0;margin: auto;bottom: 70px;}
    .carReturn{position: absolute;bottom: 20px;right:20px;}
    .CarSelect_content{position: absolute;bottom: 204px;left:313px;width: 130px}
    .CarSelect_content1{position: absolute;bottom: 204px;right:213px;width: 130px}
    .carDialog{position: absolute;top: 0;left: 0;}
    .dialog{position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;}
    .car_content{position: absolute;top: 50px;bottom: 0;left: 0;right: 0;margin: auto;width: 498px;height: 327px}
    .carReturn1{position: absolute;bottom: 100px;right:110px;}
    /*Element select 样式修改*/
    .el-select .el-input .el-select__caret{color: transparent}
    .el-input__inner{height: 40px;text-align: center;background:transparent;color: #FFFFC1;font-size: 30px;padding-right: 20px;font-weight: 800;border: none;outline: none}
    .el-select .el-input__inner:focus{border:none;outline: none}
}
.testCarselect{
    .el-scrollbar{text-align: center;font-family: 'Microsoft YaHei';}
    .el-select-dropdown__item{font-size: 25px}
    .el-select-dropdown__wrap{max-height: 180px}
    .el-select-dropdown__item{height: 35px}
}
</style>
