<template>
  <div class="user">
    <p>{{msg}}</p>

  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" class="logo"><path d="M50.07,0.212c-27.614,0-50,22.384-50,49.999c0,9.157,2.474,17.731,6.77,25.111L2.044,98.237l22.917-4.796
  c7.381,4.297,15.954,6.768,25.109,6.768c27.614,0,50-22.385,50-49.999C100.07,22.596,77.684,0.212,50.07,0.212z" class="bubble"/><path d="M30.991,65.689c-0.594,0-1.188-0.227-1.642-0.681L16.192,51.852c-0.436-0.436-0.679-1.024-0.679-1.642
  c0-0.616,0.245-1.206,0.679-1.642l13.158-13.157c0.906-0.906,2.376-0.906,3.282,0s0.906,2.376,0,3.282L21.116,50.21l11.517,11.518
  c0.906,0.905,0.906,2.376,0,3.281C32.18,65.463,31.585,65.689,30.991,65.689z" class="icon"/><path d="M69.15,65.689c-0.594,0-1.188-0.227-1.641-0.679c-0.905-0.907-0.905-2.375,0-3.283L79.024,50.21
  L67.51,38.694c-0.905-0.906-0.905-2.375,0-3.282c0.907-0.907,2.376-0.905,3.283,0l13.155,13.157c0.906,0.906,0.906,2.376,0,3.282
  L70.793,65.009C70.337,65.463,69.744,65.689,69.15,65.689z" class="icon"/><path d="M40.201,65.689c-0.485,0-0.973-0.15-1.391-0.464c-1.025-0.769-1.233-2.225-0.464-3.249l19.737-26.315
  c0.768-1.026,2.223-1.234,3.25-0.465c1.025,0.77,1.232,2.225,0.463,3.25L42.06,64.761C41.603,65.369,40.906,65.689,40.201,65.689z" class="icon"/></svg>

  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      msg: '个人中心'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  width: 43px;
  height: 48px;
  animation: bounceIn 0.6s;
  transform: rotate(0deg) scale(1) translateZ(0);
  transition: all 0.4s cubic-bezier(.8,1.8,.75,.75);
  cursor: pointer;
}

.logo:hover {
  transform: rotate(10deg) scale(1.1);
}

.bubble { fill: #e76853; }
.icon { fill:  #fff; }

@keyframes bounceIn {
  0% {
    opacity: 1;
    transform: scale(.3);
  } 

  50% {
    opacity: 1;
    transform: scale(1.05);
  } 

  70% {
    opacity: 1;
    transform: scale(.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
