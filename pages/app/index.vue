<template>
  <div class="boss">
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe-Box">
      <van-swipe-item v-for="(item,i) in banner" :key="i">
        <img :src="item.pic_url" class="swipe-pic" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="5" class="flex">
      <van-grid-item
        v-for="(index,i) in indextype"
        :key="i"
        :icon="index.icon"
        :text="index.text"
        :to="index.url"
      />
    </van-grid>
    <van-grid :border="false" :column-num="3">
      <van-grid-item
        v-for="(item,i) in goodslist"
        :key="i"
        goodsId="item.goodsId"
        :to="{path:'/goodsdetails',query:{goodsId:item.goodsId}}"
      >
        <van-image :src="item.pic_url" />
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      active: 0,
      indextype: [],
      time: 30 * 60 * 60 * 1000,
      goodslist: [],
      banner: []
    };
  },
  methods: {
    onCancel() {
      this.value = "";
    },
    onSearch() {
      if(this.value){
        this.$router.push({path:"/goodsList",query:{content:this.value}});
      }
      // console.log(this.value);
    }
  },
  mounted() {
    this.$axios.get("/api/goodslist").then(res => {
      if (res.data.flag) {
        this.goodslist = res.data.result;
        // console.log(this.goodslist);
      }
    });
    this.$axios.get("/api/banner").then(res => {
      if (res.data.flag) {
        this.banner = res.data.result;
      }
    });
    this.$axios.get("/api/indextype").then(res => {
      if (res.data.flag) {
        this.indextype = res.data.result;
      }
    });
  },
  components: {}
};
</script>

<style>
.swipe-Box {
  height: 10rem;
}
.swipe-pic {
  width: 100%;
  height: 100%;
}
.boss {
  padding-bottom: 3rem;
}
.flex {
  display: flex;
  color: #f30;
}
</style>