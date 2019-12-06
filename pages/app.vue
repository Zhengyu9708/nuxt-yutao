<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">
        <nuxt-link to="/app/">首页</nuxt-link>
      </van-tabbar-item>
      <van-tabbar-item name="search" icon="search">
        <nuxt-link to="/app/msg">消息</nuxt-link>
      </van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">
        <nuxt-link to="/app/shoppingcar">购物车</nuxt-link>
      </van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o"><nuxt-link to="/app/mine">我的</nuxt-link></van-tabbar-item>
    </van-tabbar>
    <nuxt-child></nuxt-child>
  </div>
</template>
<script>

export default {
  data() {
    return {
      active: 0,
    };
  },
  
  components: {}
};
</script>

<style>
</style>
