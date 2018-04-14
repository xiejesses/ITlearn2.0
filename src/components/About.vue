<template>
  <div id="about">
    <div class="head-bg">
      <article>
        <h2>为什么要开发这个网站？</h2>
        <p>for 毕业设计</p>
        <h2>难吗？</h2>
        <p>不难才怪</p>
        <h2>要两人完成?</h2>
        <p>人多力量大</p>
        <h2>整天敲代码不厌吗？</h2>
        <p>问得好</p>
      </article>
      
    </div>
    <div class="author__image-wrapper">
        <div class="author__image">
            <img src="../../static/img/me.jpg" alt="">
        </div>
        <div class="author__image">
            <img src="../../static/img/me.jpg" alt="">
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      return {
        
      }
    },
    mounted() {
      
    },
    computed: {
      
    },
    methods: {
      
    }
  }

</script>

<style scoped>
html, body,* {
  padding: 0;
  margin: 0;
}
h2,p {
  color: white;
}
.head-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 65vh;
  text-align: center;
  /* background-color: #6bb756; */
  background: linear-gradient(to right, rgba(107,183,86,0.95), rgba(0,143,104,0.95));
  /* background: linear-gradient(to right, var(--top1), var(--top2)); */
  clip-path: polygon(50% 0%, 100% 0, 100% 65%, 50% 100%, 0 65%, 0 0);
  /* margin-bottom: 1em; */
  /* padding-bottom: 1.5em; */
}
.head-bg article {

}
.author__image-wrapper {
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: top;
}
.author__image {
  transform: translateX(15%) rotateZ(-11deg) scale(.87);
    transition: transform .6s ease-out;
}
.author__image {
  /* background: #d33a2c; */
    border: 7px solid #d33a2c;
    margin-right: 30px;
    box-shadow: 0px 14px 20px 0px #7e6f6f;
}
.author__image:hover {
  transform:  translateX(15%) rotateZ(0) scale(.87);
    transition: transform .1s ease-out;
}
.author__image img{
  width: 150px;
  height: 150px;
}
</style>
