<template>
   <div class="head1">
       <van-nav-bar
        :title="title"
        left-text="返回"
        right-text="..."
        left-arrow
        @click-left="$router.back(-1)"
        @click-right="onClickRight"
        />
   </div>
</template>
<script>
export default {
    props:['title'],
    methods:{
        onClickLeft(){
            
        },
        onClickRight(){
            // this.$router.push("/login")
        }
    }
}
</script>
<style scoped>
    .head1{
        position: fixed;
        width:100%;height:auto;
    }
</style>