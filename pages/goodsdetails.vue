<template>
  <div class="body">
    <Head title="商品详情"></Head>
    <van-swipe @change="onChange" class="swiper">
      <van-swipe-item>
        <img :src="goodsDetail.pic_url" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img :src="goodsDetail.pic_url" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img :src="goodsDetail.pic_url" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img :src="goodsDetail.pic_url" alt />
      </van-swipe-item>
      <div class="custom-indicator numb" slot="indicator">{{current+1}}/4</div>
    </van-swipe>
    <div class="goods_name">
      <p class="A1">
        <span class="price">￥{{goodsDetail.goodsPrice}}</span>
        <van-tag type="danger">热卖</van-tag>
      </p>
      <p class="A2">
        <span>价格</span>
        <s>￥{{goodsDetail.goodsPrice}}</s>
      </p>
      <p class="A3">{{goodsDetail.goodsName}}</p>
      <p class="A4">
        <span>快递:免运费</span>
        <span>月销量：10万件+</span>
        <span>湖北 荆门</span>
      </p>
    </div>
    <div class="goods_sales">
      <van-cell is-link @click="showPopuppp" class="sales">促销</van-cell>
      <van-popup v-model="showww" position="bottom" :style="{ height: '70%' }">不要钱，免费送</van-popup>
      <van-cell is-link @click="showPopupp" class="sales">服务</van-cell>
      <van-popup v-model="showw" position="bottom" :style="{ height: '70%' }">七天免退换</van-popup>
    </div>
    <div>
      <van-cell is-link @click="showPopup" class="sales">请选择具体商品</van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <p class="num_par">
          <span @click="reduce">-</span>
          <input type="number" :value="num" />
          <span @click="add">+</span>
        </p>
        <p class="buy_btn">
          <van-button type="danger" @click="close">加入购物车</van-button>
          <van-button type="danger" @click="buy_now">立即购买</van-button>
        </p>
      </van-popup>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="carNum" to="/app/shoppingcar"/>
      <van-goods-action-icon icon="shop-o" text="店铺"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="close_foot" />
      <van-goods-action-button type="danger" text="立即购买" @click="buy_now_foot" />
    </van-goods-action>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import { Notify } from "vant";
export default {
  data() {
    return {
      current: 0,
      goodsDetail: {}, //当前商品所有信息
      show: false,
      showw: false,
      showww: false,
      goodsId: "",
      num: 1,
      _id: sessionStorage._id,
      now: {
        Detail: {}
      },
      carNum:""
    };
  },
  computed: {},
  methods: {
    reduce() {
      if (this.num > 1) {
        this.num--;
      } else {
        this.num = 1;
        Dialog.alert({
          message: "官人，这已经是最少的啦"
        });
      }
    },
    add() {
      this.num++;
    },
    close() {
      //加入购物车
      this.show = false;
      if (sessionStorage.username) {
        this.$axios
          .get("/api/shoppingcar", {
            params: {
              bool:1,
              user_id: this._id,
              goods_id: this.goodsId,
              goodsName: this.goodsDetail.goodsName,
              goodsImg: this.goodsDetail.pic_url,
              goodsPrice: this.goodsDetail.goodsPrice,
              num: this.num              
            }
          })
          .then(res => {
            if (res.data.flag) {
              Toast.success("成功加入购物车");
              console.log(res.data);
              //刷新一遍，更新购物车数量
              // location.reload();
              setTimeout("location.reload()",100);
            }
          });
      } else {
        // Notify({ type: 'danger', message: '您还未登录' });
        Dialog.confirm({
          title: "提示",
          message: "您还未登录，是否前往登录"
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            
          });
      }
    },
    close_foot() {
      this.show = true;
    },
    buy_now_foot() {
      this.show = true;
    },
    buy_now() {},
    onChange(index) {
      this.current = index;
    },
    showPopup() {
      this.show = true;
    },
    showPopupp() {
      this.showw = true;
    },
    showPopuppp() {
      this.showww = true;
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId; //地址栏取参
  },
  mounted() {
    this.$axios
      .get("/api/details", { params: { goodsId: this.goodsId } }) //axios的get传参只能用params，后台用query接收
      .then(res => {
        if (res.data.flag) {
          this.goodsDetail = res.data.result;
          //   this.now.Detail = res.data.result;
        }
      });
      this.$axios.get("/api/shoppingcar", { params: { bool: 2 } }).then(res => {
      this.carNum = res.data.result.length;
      console.log(this.carNum);
    });
  }
};
</script>
<style scoped>
.body {
  background: #f5f5f5;
  overflow: hidden;
}
.swiper{
  margin-top: 3.8rem;
}
.swiper img {
  width: 100%;
  height: 18.75rem;
}
.numb {
  width: 2.5rem;
  text-align: center;
  color: white;
  position: absolute;
  right: 0.6rem;
  bottom: 0.6rem;
  font-size: 1rem;
  background: rgb(150, 147, 147);
}
.A1 {
  height: 2.5rem;
  line-height: 2.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.25rem;
}
.A2 {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.25rem;
  font-size: 0.87rem;
  color: gray;
}
.A2 span {
  margin-right: 0.25rem;
  box-sizing: border-box;
  padding: 0 0.25rem;
  font-weight: bolder;
}
.A3 {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.25rem;
}
.A4 {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.25rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.87rem;
  color: gray;
}
.price {
  font-size: 1.87rem;
  color: red;
  margin-right: 0.31rem;
}
.goods_name {
  background: white;
  margin-bottom: 0.37rem;
  box-sizing: border-box;
  padding-bottom: 0.3rem;
}
.goods_sales {
  background: white;
  margin-bottom: 0.37rem;
  box-sizing: border-box;
  padding-bottom: 0.3rem;
}
.sales {
  height: 2rem;
  padding: 0.15rem;
  color: gray;
}
.num_par {
  display: flex;
  justify-content: space-between;
}
.buy_btn {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
}
</style>