<template>
  <div>
    <div class="floor">
      <div class="floor_title">{{ floorTitle }}</div>
      <div class="floor_anomaly">
        <div class="floor_one">
          <img :src="floor1_0.image" alt="" width="100%" />
        </div>
        <div class="floor_two">
          <div><img :src="floor1_1.image" alt="" width="100%" /></div>
          <div><img :src="floor1_2.image" alt="" width="100%" /></div>
        </div>
      </div>
      <div class="floor_rule">
        <div v-for="(item, index) in floorData.slice(1)" :key="index">
          <img :src="item.image" alt="" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData", "floorTitle"],
  data() {
    return {
      floor1_0: {},
      floor1_1: {},
      floor1_2: {},
    };
  },
  created() {},
  watch: {
    floorData: function (val) {
      this.floor1_0 = this.floorData[0];
      this.floor1_1 = this.floorData[1];
      this.floor1_2 = this.floorData[2];
    },
  },
};
</script>

<style scoped>
.floor_anomaly {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.floor_anomaly div {
  border-bottom: 1px solid #eee;
}
.floor_one {
  border-right: 1px solid #eee;
}
.floor_rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.floor_rule div {
  width: 10rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.floor_rule div:nth-child(odd) {
  border-right: 1px solid #eee;
}
.floor_title {
  text-align: center;
  background-color: #eee;
}
</style>