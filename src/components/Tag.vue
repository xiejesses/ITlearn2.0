<template>
  <div id="tag">
    <!-- <section class="tag-header" v-bind:style="styleObject" style="background-color:#3d8836"> -->
    <div class="container">
      <section class="tag-header" v-bind:style="styleObject">
        <div class="tag-content">
          <h1>{{tag}}</h1>
          <!-- <h1 style="box-shadow: 20px 20px 20px 3px #6c7c6a">{{tag}}</h1> -->
          <div class="tag-action-button">
            <span>
              <button v-bind:style="{color:styleObject.background,background:styleObject.color}">关注</button>
            </span>
          </div>
        </div>
      </section>
      <main>
        <router-view :key="key"></router-view>
      </main>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'tag',
    data() {
      return {
        tag: '',
        styleObject: '',
        //   styleObject: {
        //     background: '#3d8836',
        //     // fontSize: '13px'
        // }
      }
    },
    //   data:{
    //       styleObject: {
    //             background: 'red',
    //             // fontSize: '13px'
    //         }
    //   },
    mounted() {
      this.tag = this.$route.params.tName;
      this.fetchTag()
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    methods: {
      fetchTag() {
        let param = {
          tag: this.$route.params.tName
        };
        this.$http.get('/tags', {
          params: param
        }).then(response => {
          let res = response.data;
          if (res.status == "1") {
            this.styleObject = res.result.styleObject;
            // this.options = res.result[0].tags;
            // this.options.push(res.result[0].tags[0]);
            // this.options.concat(res.result[0].tags[0]);
            // console.log(this.options)
          } else {
            // this.tags.push('没有相关标签')\
            // console.log("失败")
            return false
          }
        })

      },
    }
  }

</script>

<style scoped>
  .container {
    position: absolute;
    left: 0;
    right: 0;
    /* background: red; */
  }

  .tag-header {
    /* position: relative; */
    /* position: absolute;
    left: 0;
    right: 0; */
    /* float: left; */
    overflow: hidden;
    width: 100%;
    height: 200px;
    /* background: #000000; */
    /* background: #3d8836; */
  }

  .tag-content {
    /* position: relative; */
    height: auto;
    width: 50%;
    margin: 0 auto;
  }

  .tag-content h1 {
    font-size: calc(3vw + 23px);
    margin-top: 3vw;
    margin-bottom: 10px;
    /* background: #f7df19; */
    /* box-shadow: 20px 20px 20px 3px #adaf22; */
    /* color: white; */
    /* box-shadow: 20px 20px 20px 3px #2c5d26; */
    margin-bottom: none;
  }

  .tag-action-button {
    position: relative;
  }

  .tag-action-button button {
    /* color: #f7df1e; */
    /* color: #3d8836; */
    /* background-color: black; */
    /* background-color: white; */
    font-size: calc(.5vw + 15px);
    padding: 5px 20px;
    cursor: pointer;
    outline: none;
    border: none;
  }

  main {
    /* position: relative; */
    /* position: absolute; */
    background: white;
    overflow: hidden;
    margin: 0 auto;
    margin-top: -50px;
    min-height: 400px;
    width: 70%;
    max-width: 1250px;
  }


  @media screen and (min-width:760px) {
    .tag-header {
      height: 300px;
    }
  }

</style>
