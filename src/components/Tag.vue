<template>
  <div id="tag">
    <div class="container">
      <section class="tag-header" v-bind:style="styleObject">
        <div class="tag-content">
          <h1>{{tag}}</h1>
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
      }
    },
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
          _id: this.$route.params._id
        };
        this.$http.get(this.$config.recommend.tag.url, {
          params: param
        }).then(response => {
          let res = response.data;
          if (res.status === this.$status) {
            this.styleObject = res.result.styleObject;
          } else {
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
  }

  .tag-header {
    overflow: hidden;
    width: 100%;
    height: 200px;
  }

  .tag-content {
    height: auto;
    width: 50%;
    margin: 0 auto;
  }

  .tag-content h1 {
    font-size: calc(3vw + 23px);
    margin-top: 3vw;
    margin-bottom: 10px;
    margin-bottom: none;
  }

  .tag-action-button {
    position: relative;
  }

  .tag-action-button button {
    font-size: calc(.5vw + 15px);
    padding: 5px 20px;
    cursor: pointer;
    outline: none;
    border: none;
  }

  main {
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
