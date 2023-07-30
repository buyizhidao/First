<template>
  <div class="UserCharging-container">
    <h2 class="charging">正在充电中....</h2>
    <div>
      <el-button type="info" round class="button" @click="getTime">查询时间</el-button>
      <getTime v-if="openTime" ref="getTime"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="getQueue">预览当前车辆状况</el-button> <!--getQueue-->
      <getQueue v-if="openQueue" ref="getQueue"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="getForm">查看充电详单</el-button> <!--getForm-->
      <getForm v-if="openForm" ref="getForm"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="getChargingCapacity">查看剩余充电量</el-button> <!--getChargingCapacity-->
      <getChargingCapacity v-if="openCapacity" ref="getChargingCapacity"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="endCharging">结束充电</el-button> <!--endCharging-->
      <endCharging v-if="openEnd" ref="endCharging"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="logout">退出登录</el-button>
      <logout v-if="openLogout" ref="logout"/>
    </div>
    <div class="UserCharging-background"></div>
  </div>
</template>

<script>
import getTime from "./getTime";
import getQueue from './Queue/getQueue';
import getChargingCapacity from './Charging/getChargingCapacity';
import getForm from './Charging/getForm';
import endCharging from './Charging/endCharging';
import logout from './logout';
export default {
name:"UserCharging",
data() {
  return {
    openTime: false,
    openQueue: false,
    openCapacity: false,
    openEnd: false,
    openForm: false,
    openLogout: false,
  };
},
components: {
  getTime,
  getQueue,
  getChargingCapacity,
  endCharging,
  getForm,
  logout
},
methods: {
  logout() {
    this.openLogout = true;
    this.$nextTick(() => {
      this.$refs.logout.init();
    });
  },
  getTime() {
    this.openTime = true;
    this.$nextTick(() => {
      this.$refs.getTime.init();
    });
  },
  getQueue() {
    this.openQueue = true;
    this.$nextTick(() => {
      this.$refs.getQueue.init();
    });
  },
  getChargingCapacity() {
    this.openCapacity = true;
    this.$nextTick(() => {
      this.$refs.getChargingCapacity.init();
    });
  },
  endCharging() {
    this.openEnd = true;
    this.$nextTick(() => {
      this.$refs.endCharging.init();
    });
  },
  getForm() {
    this.openForm = true;
    this.$nextTick(() => {
      this.$refs.getForm.init();
    });
  },
}
}
</script>

<style scoped>
.charging {
  margin-top: 150px;
  margin-right: 300px;
  font-size: 100px;
  font-weight: 200;
  color: #211d1c;
  font-family: "DFPOP1B", "AaMaKeTi";
}
.UserCharging-background {
  background-image: url('../assets/user.jpg');
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7; /* 设置透明度 */
  background-size:100% 100%;
  z-index: -1;
}
.button {
  margin-top:20px; /*距离顶部*/
  width: 350px; /**宽度 */
  height: 60px; /**高度 */
  margin-left: 700px; /**右侧距离 */
  border-color: #e6ba0b;  /* 边框颜色 */
  border-width: 4px; /**边框粗细 */
  background-color: transparent; /**背景透明 */
  color: #08080a; /**字体颜色 */
  font-size: 30px; /**字体大小 */
  font-family: "AaMaKeTi", sans-serif; /**字体 */
}

</style>
