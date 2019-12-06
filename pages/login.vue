<template>
  <div class="head1">
    <Head title="登录"></Head>
    <van-cell-group class="content">
      <van-field label="手机号" placeholder="请输入手机号" v-model="obj.phone" />
      <van-field v-model="obj.password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button type="danger" @click="gotologin" class="btn">登录</van-button>
    <p>
      <router-link to="/register">没有账号？</router-link>
      </p>
  </div>
</template>
<script>
// import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      value: "",
      obj: {}
    };
  },
  // computed: {
  //   ...mapState(["phone"])
  // },
  methods: {
    // ...mapMutations(["getPhone"]),
    gotologin() {
      this.$axios.post("/api/login", this.obj).then(res => {
        if (res.data.flag == 1) {
          sessionStorage.phone = res.data.result.phone;
          sessionStorage.username = res.data.result.username;
          sessionStorage.password = res.data.result.password;
          sessionStorage._id = res.data.result._id;
          // this.$store.commit("getPhone", this.obj.phone);
          this.$router.push("/app/");
        }else{
          Dialog.alert({
          message: "账号或密码错误"
        });
        }
      });
    }
  },
  mounted(){
    // this.$axios.get("/api/")//登录时把用户的购物车的商品种类总数存起来
  }
};
</script>
<style scoped>
.btn {
  width: 100%;
  margin-top: 1rem;
}
.head1{
  overflow: hidden;
}
.content{
  margin-top: 3.9rem;
}
</style>