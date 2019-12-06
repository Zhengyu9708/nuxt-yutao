<template>
  <div class="parent">
    <Head title="注册"></Head>
    <van-cell-group class="content">
      <van-field
        v-model="obj.username" 
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        label="手机号"
        placeholder="请输入手机号"
        clickable
        v-model="obj.phone"
        @touchstart.native.stop="show = true"
      />
      <van-field v-model="obj.password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button type="danger" @click="register" class="btn">注册</van-button>
    <p class="gotologin">
      <router-link to="/login" style="color:grey;">已有账号，立即登录</router-link>
    </p>
  </div>
</template>
<script>
// import {mapState} from "vuex";
// import store from "../store";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      show: false,
      value: "",
      obj: {}
    };
  }, 
  methods: {
    register() {
      console.log(this.obj.username);
      if(this.obj.username&&this.obj.phone&&this.obj.password){
        this.$axios.post("/api/register", this.obj).then(res => {
        console.log(res);
        if (res.data.flag==1) {
          Dialog.confirm({
            title: "标题",
            message: "您已注册成功，是否前往登录"
          })
            .then(() => {
              this.$router.push("/login")
            })
            .catch(() => {
              // on cancel
            });
        }else{
          Dialog.alert({
          message: "账号已存在"
        });
        }
      });
      }else{
        Dialog.alert({
          message: "请输入完整信息"
        });
      }
      
    }
  }
};
</script>


<style scoped>
.btn {
  width: 100%;
  margin-top: 1rem;
}
.content{
  margin-top: 3.9rem;
}
.parent{
  overflow: hidden;
}
.gotologin{
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: grey
}
</style>