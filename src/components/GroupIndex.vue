<template>
  <div class="groupindex">
    <main>
      <section class="build-group">
        <p>发现和创建小组，共同学习与分享知识</p>
        <div class="build-form" v-if="isbuilding">
          <form name="buildform" :v-model="formGroup" id="buildform" action="#" method="post">
            <!-- <h1>分享链接</h1> -->
            <h4 class="errMessage"></h4>
            <p>
              <el-input  class="inputstyle" v-model="formGroup.groupName" placeholder="小组名"></el-input>
            </p>
            <p>
              <el-input class="inputstyle" v-model="formGroup.groupIntro" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="小组简介" >
              </el-input>
            </p>
           
            <div class="actions">
              <div class="buttons">
                <a href="javascript:;" class="user-submit" @click="createGroup">创建</a>
                <!-- <input type="submit" @click="createGroup" name="user-submit" id="user-submit" value="创建"> -->
                <a class="cancel" @click="cancel">取消</a>
              </div>
            </div>
          </form>
        </div>
        <div class="build-button" v-else>
          <button @click="isbuilding = true">创建小组</button>
        </div>
        <!-- <div contenteditable>edit</div> -->
      </section>

      <section>
        
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script>

  export default {
    name: 'groupindex',
    data() {
      return {
        formGroup:{
          groupName:'',
          groupIntro:''
        },
        isbuilding:false,
        msg: '学习小组'
      }
    },
    methods:{
      createGroup() {
        // this.isbuilding = true;
        
        this.$http.post('/group/creategroup',{
          groupName:this.formGroup.groupName,
          groupIntro:this.formGroup.groupIntro,
          userName:localStorage.getItem('userName')
        }).then(response => {
          let res = response.data;
          if(res.status == "1") {
            this.$router.push('/groupindex')
            // this.$message.success(`创建成功！`);
            this.$message.success('创建成功');
            this.isbuilding = false;
            this.formGroup.groupName = '';
            this.formGroup.groupIntro = '';
          } else {
            this.$message.error('创建失败！请重试');
            
          }
        }).catch(err => {
              this.$message.error(`请先登录！`);
              // this.$message.error(`${err.message}`, 'ERROR!');
            })
      },

      cancel() {
        this.isbuilding = false;
        this.formGroup.groupName = '';
        this.formGroup.groupIntro = '';
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
    width: 100%;
    margin: 5px auto;
    height: auto;
    /* border: 1px solid green; */
  }

  .build-group {
    /* background: #54595f; */
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
  }

  .build-group p {
    font-size: 18px;
  }

  .build-button {
    margin-bottom: 10px;
    width: 100px;
    /* border: 1px solid red; */
  }

  .build-button button {
    background: #2DBF80;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 13px;
    color: #fff;
    max-height: 40px;
    max-width: 100px;
  }

  .build-button button:hover {
    background: #2DB270;
  }

.user-submit {
    display: inline-block;
    background: #f28964;
    height: 35px;
    min-width: 80px;
    padding: 0 10px 0 10px;
    border: none;
    border-radius: 4px;
    outline: none;
    font-size: 17px;
    text-decoration: none;
    line-height: 33px;
    color: #fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }

  .actions {
    display: flex;
    justify-content: flex-start;
  }
  .cancel {
    color:gray;
    font-size: 15px;
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }


.inputstyle {
  width:250px;
}

 
  @media screen and (min-width:960px) {
    /* main {
      width: 720px;
      margin: 5px auto;
      height: auto;
    } */
    .inputstyle {
    width:300px;
    }
  }

  @media screen and (min-width:1200px) {
    /* main {
      width: 940px;
      width: 70%;
      margin: 5px auto;
      height: auto;
    } */
    .inputstyle {
  width:400px;
}
  }
  /* @media screen and (min-width:1600px) {
    main {
      width: 940px;
      width: 65%;
      margin: 0 auto;
      height: auto;
    }
  } */

</style>
