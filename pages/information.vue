<template>
  <div>
    <Head title="修改个人信息"></Head>
    <van-cell-group>
      <van-field
        v-model="obj.phone"
        required
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field v-model="obj.password" type="password" label="密码" placeholder="请输入密码" required />
      <van-button type="danger" @click="yes" class="btn">确认修改</van-button>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data(){
    return {
      Sess_phone:sessionStorage.phone,
      obj:{}
    }
  },
  methods:{
    yes(){
      this.$axios.post("/api/information",this.obj).then(res=>{
        if(res.data.flag==1){
          this.$router.push("/login");
        }
      })
    }
  },
  mounted(){
    
  }
}
</script>