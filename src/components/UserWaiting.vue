<template>
  <div class="UserWaiting-container">
    <h2 class="waiting-title">您当前正处在等待队列</h2>
    <div>
      <el-button type="info" round class="button" @click="getTime">查询时间</el-button>
      <getTime v-if="openTime" ref="getTime"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="changeCharging">修改充电请求</el-button> <!--changeCharging-->
      <changeCharging v-if="openChangeCharging" ref="changeCharging"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="cancelRequest">取消充电请求</el-button> <!--cancelRequest-->
      <cancelRequest v-if="openCancel" ref="cancelRequest"/>
    </div>
    <div>
      <el-button type="info" round class="button"  @click="getQueue">预览当前车辆状况</el-button> <!--getQueue-->
      <getQueue v-if="openQueue" ref="getQueue"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="getForm">查看充电详单</el-button> <!--getForm-->
      <getForm v-if="openForm" ref="getForm"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="logout">退出登录</el-button>
      <logout v-if="openLogout" ref="logout"/>
    </div>
    <div class="UserWaiting-background"></div>
  </div>
</template>

<script>
import getTime from "./getTime";
import changeCharging from "./Queue/changeCharging";
import cancelRequest from "./Queue/cancelRequest";
import getQueue from './Queue/getQueue';
import getForm from './Charging/getForm';
import logout from './logout';
export default {
name:"UserWaiting",
data() {
  return {
    openTime: false,
    openChangeCharging: false,
    openCancel: false,
    openQueue: false,
    openForm: false,
    openLogout: false,
  };
},
components: {
  getTime,
  changeCharging,
  cancelRequest,
  getQueue,
  getForm,
  logout,
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
  changeCharging() {
    this.openChangeCharging = true;
    this.$nextTick(() => {
      this.$refs.changeCharging.init();
    });
  },
  cancelRequest() {
    this.openCancel = true;
    this.$nextTick(() => {
      this.$refs.cancelRequest.init();
    });
  },
  getQueue() {
    this.openQueue = true;
    this.$nextTick(() => {
      this.$refs.getQueue.init();
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
.waiting-title {
  margin-top: 150px;
  margin-right: 300px;
  font-size: 100px;
  font-weight: 200;
  color: #211d1c;
  font-family: "DFPOP1B", "AaMaKeTi";
}
.UserWaiting-background {
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
