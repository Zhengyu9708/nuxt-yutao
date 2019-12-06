<template>
  <div class="parent">
    <Head title="我的"></Head>
    <div class="content">
      <div class="AAA">
        <div class="pic" v-if="username">
        <img src="../../static/images/1.jpg" />
        <p class="username">尊敬的用户：{{username}}</p>
        <span class="information">
          <nuxt-link to="/information">修改</nuxt-link>
        </span>
        <span @click="delSession">退出登录</span>
      </div>
      <div v-else>
        <span @click="gotologin">立即登录</span>
      </div>
      <van-row class="van-center">
        <van-col span="6">6</van-col>
        <van-col span="6">6</van-col>
        <van-col span="6">6</van-col>
        <van-col span="6">6</van-col>
      </van-row>
      <van-row class="van-center1">
        <van-col span="6">收藏夹</van-col>
        <van-col span="6">关注店铺</van-col>
        <van-col span="6">足迹</van-col>
        <van-col span="6">红包卡券</van-col>
      </van-row>
      </div>
      <div class="order">
        <van-cell title="我的订单" is-link value="查看我的全部订单" />
        <van-grid :column-num="5" class="icon">
          <van-grid-item v-for="(item,i) in list" :key="i" :icon="item.icon" :text="item.text" />
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
import { Skeleton } from "vant";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      show: "",
      title: true,
      avatar: "",
      loading: true,
      list: [
        { text: "待付款", icon: "clock" },
        { text: "待发货", icon: "send-gift" },
        { text: "待收货", icon: "shop" },
        { text: "评价", icon: "good-job" },
        { text: "退款/售后", icon: "bill" }
      ]
    };
  },
  methods: {
    delSession() {
      sessionStorage.username = "";
      sessionStorage.phone = "";
      sessionStorage.password = "";
      sessionStorage._id = "";
      this.$axios.get("/delSession").then(res => {
        console.log("退出成功");
        (this.username = ""), Toast.success("账号已退出");
        location.reload();
      });
      // this.$router.push("/login");
    },
    gotologin() {
      this.$router.push("/login");
    }
  },
  //   computed: {
  //     ...mapState(["phone"])
  //   },
  mounted() {
    this.loading = false;
    this.username = sessionStorage.username;
  }
};
</script>
<style scoped>
.pic {
  display: flex;
  /* justify-content: space-between; */
  height: 5.6rem;
  line-height: 5.6rem;
}
.pic img {
  width: 5.6rem;
  height: 5.6rem;
  margin-right: 1.25rem;
  border-radius: 50%;
  overflow: hidden;
}
.van-center {
  text-align: center;
  margin-top: 1rem;
}
.van-center1 {
  text-align: center;
}
.information {
  margin-left: 1.25rem;
  margin-right: 0.3rem;
}
.content {
  margin-top: 4rem;
}
.parent {
  overflow: hidden;
}
.icon {
  color: #f30;
}
.username{
  font-size: 1.4rem;
}
.AAA{
  padding: 1rem;
  background-image: -webkit-linear-gradient(left, #FD9126, #FF5000);
}
</style>