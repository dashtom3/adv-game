<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div{margin:0;padding:0;border:0;}
	body{color:#333; font-size:12px;font-family:"Microsoft YaHei"}
	ul,ol{list-style-type:none;}
	select,input,img,select{vertical-align:middle;}
	input{ font-size:12px;}
	a{ text-decoration:none; color:#000;}
	a:hover{color:#c00; text-decoration:none;}
</style>
