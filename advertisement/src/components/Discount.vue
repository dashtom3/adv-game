<template>
  <div class="discount">

  </div>
</template>

<script>
import axios from 'axios';
import  MessageBox  from 'mint-ui';

export default {
  name: 'hello',
  data () {
    return {
      disId: null,
      data:null,
      msg: 'Welcome to Your Vue.js App',
      mac:null,
      baseUrl: "http://116.62.228.3:8080/Advertisement_proc/api/"
      // baseUrl: "http://139.219.11.152:8080/Advertisement/api/"

    }
  },
  created(){
    if(this.$route.params.disId != null) {
      this.disId = this.$route.params.disId;
      this.mac = this.$route.query.mac;
      this.collectData([{type:'14',playAdvId:this.disId}])
      this.getDisInfo();
    }
  },
  methods: {
    getDisInfo() {
      var self = this
      axios.get(this.baseUrl + 'newAdv/getById?newAdvId=' + this.disId).then((res) => {
        self.data = res.data.data
        console.log(self.data)
        window.location.href = self.data.webUrl
      }).catch((res) => {
        MessageBox("消息","网络访问出现问题");
      })
    },
    collectData(data) {
      var self = this
      var time = new Date()
      var dataTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':'+time.getMinutes() + ':'+time.getSeconds() ;
      data[0].operateDate = dataTime
      console.log(data)
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

</style>
