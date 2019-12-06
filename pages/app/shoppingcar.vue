<template>
  <div>
    <Head title="购物车"></Head>
    <div v-if="user" class="content_par">
      <div class="content">
        <div class="goods_bigpar" v-for="(item,i) in goods" :key="i" :goods_id="item.goods_id" >
          <p class="store">
            <input type="checkbox" />天猫超市
          </p>
          <div class="goods_par">
            <p>
              <input type="checkbox" v-model="item.check" />
            </p>
            <div class="goods_imgbox">
              <img :src="item.goodsImg" @click="gotodetail(item.goods_id)"/>
            </div>
            <div class="nei">
              <p class="goodsname">{{item.goodsName}}</p>
              
            <p class="goodsprice">￥{{item.goodsPrice}}</p>
            </div>
            <div>
              <van-button type="danger" class="del" size="small" @click="del(item,item.goods_id,i)">删除</van-button>
            </div>
          </div>
          <div>
            <p class="goodsnum_p">
              <span @click="reduce(item,item.num)">-</span>
              <input type="text" v-model.:value="item.num" />
              <span @click="add(item,item.num)">+</span>
            </p>
          </div>
        </div>
      </div>
      <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" class="comit_foot">
        <van-checkbox v-model="quan">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div v-else>
      <p>是否前往登录/注册</p>
    </div>
  </div>
</template>
<script>
import { Button } from 'vant';
import { RadioGroup, Radio } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      user: sessionStorage._id,
      radio: "",
      goods: [],
      totalNum: 0
    };
  },
  methods: {
    onSubmit() {},
    reduce(item, num) {
      if (item.num > 1) {
        item.num--;
        this.$axios
          .get("/api/shoppingcar", {
            params: { bool: 3, goods_id: item.goods_id }
          })
          .then(res => {
            console.log(res);
          });
      }else{
        Dialog.alert({
          message: "官人，这已经是最少的啦"
        });
      }
    },
    add(item, num) {
      item.num++;
      this.$axios
          .get("/api/shoppingcar", {
            params: { bool: 4, goods_id: item.goods_id }
          })
          .then(res => {
            console.log(res);
          });
    },
    del(item,goods_id,i){
      this.goods.splice(i,1);
      this.$axios.get("/api/shoppingcarDel",{params:{bool:5,goods_id:goods_id}}).then(res=>{
        console.log(res);
      })
    },
    gotodetail(goodsId){
      this.$router.push({path:'/goodsdetails',query:{goodsId:goodsId}})
    }
  },
  computed: {
    quan: {
      get() {
        var flag = true;
        this.goods.forEach(item => {
          if (!item.check) {
            flag = false;
          }
        });
        return flag;
      },
      set(newVal) {
        // console.log(newVal);
        this.goods = this.goods.map(item => {
          item.check = newVal;
          return item;
        });
      }
    },
    total: {
      get() {
        var total = 0;
        this.goods.forEach(item => {
          if (item.check) {
            total += item.goodsPrice * item.num;
          }
        });
        return total * 100;
      }
    }
  },
  created() {
    this.goods.forEach(item => {
      if (item.check) {
        this.totalNum += item.num;
      }
    });
  },
  mounted() {
    this.$axios.get("/api/shoppingcar", { params: { bool: 2 } }).then(res => {
      this.goods = res.data.result;
      console.log(this.goods)
    });
  }
};
</script>
<style scoped>
.comit_foot {
  margin-bottom: 4.1rem;
}
.goods_par {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.goods_par img {
  width: 5.6rem;
  height: 5.6rem;
}
.goods_bigpar {
  width: 95%;
  height: 12rem;
  background: white;
  border-radius: 2rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.store {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}
.goods_imgbox {
  margin-left: 1rem;
}
.content {
  margin-top: 4.8rem;
  margin-bottom: 9rem;
}
.content_par {
  overflow: hidden;
}
.content input {
  width: 3rem;
  text-align: center;
  outline: none;
  border: 0;
}
.nei{
  height: 5rem;
}
.goodsname{
  width: 6rem;
  height: 4rem;
  color: grey;
  font-size: 1.3rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
 -webkit-line-clamp: 2;
 overflow: hidden;
}
/* .del{
  margin-left:3rem;
} */
.goodsprice{
  color: grey;
  margin-left: 1rem;
}
.goodsnum_p{
  margin-left: 2rem;
}
</style>