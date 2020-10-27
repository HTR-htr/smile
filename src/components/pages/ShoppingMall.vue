<template>
  <div>
    <van-row class="search-bar">
      <van-col span="3">
        <img :src="locationIcon" width="70%" class="location" />
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input" />
      </van-col>
      <van-col span="5">
        <van-button size="mini" class="search-button">查找</van-button>
      </van-col>
    </van-row>
    <div class="swiper-area">
      <van-swipe :autoplay="3000" height="3rem" width="100%">
        <van-swipe-item v-for="(image, index) in bannerPicArray" :key="index">
          <img v-lazy="image.image" :src="image.imageUrl" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(item, index) in category" :key="index">
        <img v-lazy="item.image" width="100%" />
        <span>{{ item.mallCategoryName }}</span>
      </div>
    </div>
    <div class="advertesPicture">
      <img :src="adBanner" alt="" width="100%" />
    </div>
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommmendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{ item.goodsName }}</div>
              <div>
                ￥{{ item.price | toMoneyFliter }} (￥{{
                  item.mallPrice | toMoneyFliter
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component
      :floorData="floor1"
      :floorTitle="floorName.floor1"
    ></floor-component>
    <floor-component
      :floorData="floor2"
      :floorTitle="floorName.floor2"
    ></floor-component>
    <floor-component
      :floorData="floor3"
      :floorTitle="floorName.floor3"
    ></floor-component>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/swiper-bundle.css";
import floorComponent from "../component/floorComponent";
import goodsInfo from "../component/goodsInfoComponent";
import { moneyFilter } from "../../filter/moneyFilter";
const url = require("../../serviceAPI.config");
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      indexJson: "",
      category: [],
      adBanner: "",
      recommmendGoods: [],
      swiperOption: {
        slidesPerView: 3,
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    floorComponent,
    goodsInfo,
  },
  filters: {
    toMoneyFliter(money) {
      return moneyFilter(money);
    },
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      methods: "get",
    })
      .then((res) => {
        if (res.status == 200) {
          this.category = res.data.data.category;
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = res.data.data.slides;
          this.recommmendGoods = res.data.data.recommend;
          this.floor1 = result.data.data.floor1;
          this.floor2 = result.data.data.floor2;
          this.floor3 = result.data.data.floor3;
          this.floorName = result.data.data.floorName;
          this.hotGoods = result.data.data.hotGoods;
        }
      })
      .catch((error) => {
        //在网络不能使用的时候，使用本地的json
        let result = require("../../assets/json/indexjson.json");
        console.log(result);
        this.category = result.data.category;
        this.adBanner = result.data.advertesPicture.PICTURE_ADDRESS;
        this.bannerPicArray = result.data.slides;
        this.recommmendGoods = result.data.recommend;
        this.floor1 = result.data.floor1;
        this.floor2 = result.data.floor2;
        this.floor3 = result.data.floor3;
        this.floorName = result.data.floorName;
        this.hotGoods = result.data.hotGoods;
      });
  },
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.location {
  padding-top: 0.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
}
.search-button {
  margin-left: 0.9rem !important;
}
.swiper-area {
  width: 100%;
  clear: both;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0 0.3rem 0.3rem 0.3rem;
  font-size: 14px;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>