<template>
  <div class="hello">
    <div class="center">
      <div class="ctop">
        <span>商品已选择</span>
      </div>
      <div class="cbtm" @click = "clickOrder">
        <span>下单</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import  MessageBox  from 'mint-ui';

export default {
  name: 'hello',
  data () {
    return {
      orderId: null,
      data:null,
      msg: 'Welcome to Your Vue.js App',
      mac:null,
      baseUrl: "http://116.62.228.3:8080/Advertisement_proc/api/"
      // baseUrl: "http://139.219.11.152:8080/Advertisement/api/"
    }
  },
  created(){
    if(this.$route.params.orderId != null) {
      this.orderId = this.$route.params.orderId;
      this.mac = this.$route.query.mac;
      this.collectData([{type:'15',playAdvId:this.orderId}])
      // this.getGameInfo();
    }
  },
  methods: {
    getGameInfo() {
      var self = this
      axios.get(this.baseUrl + 'game/getGameById?gameId=' + this.gameId).then((res) => {
        self.data = res.data.data
        console.log(self.data)
        window.location.href = self.data.src
      }).catch((res) => {
        MessageBox("消息","网络访问出现问题");
      })
    },
    clickOrder(){
      console.log("aa")
      this.collectData([{type:'16',playAdvId:this.orderId}])
      window.location.href = "https://cs0042.qiyukf.com/client?k=db2d76c601767fa9281feb5f785afb99&wp=1"
    },
    collectData(data) {
      var self = this
      var time = new Date()
      var dataTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':'+time.getMinutes() + ':'+time.getSeconds() ;
      data[0].operateDate = dataTime
      // console.log("sss")
      axios.post(this.baseUrl + 'record/addOperateRecord?mac=' + this.mac,data).then((res) => {
        console.log(res)
      }).catch((res) => {
        MessageBox("消息","网络访问出现问题");
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/bg2.jpg');
  background-size: 100% 100%;
  text-align: center;
}
.center{
  position: fixed;

  width: 80%;
  background-color: #F4F0F0;
  /* margin: auto auto; */
  top: 40%;
  left: 10%;
  height: 200px;
  border-radius: 4px;
}
.ctop {
  font-size: 28px;
  font-weight: bold;
  height: 90px;
  padding-top: 50px;
  border-bottom: 1px solid #949494;
}
.cbtm {
  font-size: 20px;
  font-weight: bold;
  color: #6e420A;
  padding-top: 12px;
}
</style>
