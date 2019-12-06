<template>
  <div class="parent">
    <div class="head_box">
      <span @click="$router.back(-1)" class="back">
        <van-icon name="arrow-left" />
      </span>
      <span class="search_box">
        <van-search
          v-model="content"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          class="search"
          value="content"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </span>
      <span class="more">
        <van-icon name="ellipsis" />
      </span>
    </div>
    <van-row class="sort">
      <van-col span="6">全部</van-col>
      <van-col span="6">天猫</van-col>
      <van-col span="6">店铺</van-col>
      <van-col span="6">淘宝经验</van-col>
    </van-row>
    <div v-if="show" class="no">此商品已售完，敬请期待新品</div>
    <div v-else>
      <div class="goods_box" v-for="(item,i) in result" :key="i" @click="gotodetail(item.goodsId)">
        <img :src="item.pic_url" />
        <div class="msg">
          <p>{{item.goodsName}}</p>
          <p class="price">{{item.goodsPrice}}</p>
          <p class="adress">湖北荆门</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
import { Row, Col } from "vant";
export default {
  data() {
    return {
      content: "",
      show: "",
      result: "",
      obj: {}
    };
  },
  methods: {
    gotodetail(goodsId) {
      this.$router.push({ path: "/goodsdetails", query: { goodsId: goodsId } });
    },
    onSearch() {
      this.$axios
        .get("/api/details", { params: { search: this.content,flag: 1 } })
        .then(res => {
          if (res.data.flag == 0) {
            this.show = true;
          } else {
            this.result = res.data.result;
            this.show = false;
          }
        });
    }
  },
  created() {
    this.content = this.$route.query.content; //地址栏取参
  },
  mounted() {
    this.$axios
      .get("/api/details", { params: { search: this.content, flag: 1 } })
      .then(res => {
        if (res.data.flag == 0) {
          this.show = true;
        } else {
          this.result = res.data.result;
          this.show = false;
        }
      });
  }
};
</script>
<style scoped>
.parent {
  overflow: hidden;
}
.head_box {
  width: 100%;
  height: 3.5rem;
  display: flex;
  position: fixed;
  background: white;
}
.back {
  display: block;
  width: 3.5rem;
  height: 100%;
  font-size: 2rem;
  padding-top: 0.7rem;
  padding-left: 0.4rem;
}
.search_box {
  width: 23rem;
}
.search {
  height: 100%;
}
.more {
  height: 100%;
  font-size: 2rem;
  padding-left: 1.8rem;
  padding-top: 0.7rem;
}
.sort {
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.5rem;
  margin-top: 3.5rem;
  background: white;
}
.no {
  width: 100%;
  text-align: center;
  padding-top: 3rem;
}
.goods_box {
  width: 100%;
  height: 10rem;
  display: flex;
  padding: 0.5rem;
}
.goods_box img {
  width: 9rem;
  height: 9rem;
  border-radius: 1rem;
  margin-right: 1rem;
}
.price {
  color: #f30;
}
.msg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
}
.adress {
  font-size: 1rem;
  color: grey;
}
</style>