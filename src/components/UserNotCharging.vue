<template>
  <div class="UserNotCharging-container">
    <h2 class="notcharging-title">欢迎来到充电桩系统</h2>
    <h2 class="notcharging">您当前未在充电</h2>
    <div>
      <el-button type="info" round class="button" @click="getTime">查询时间</el-button>
      <getTime v-if="openTime" ref="getTime"/>
    </div>
    <div>
      <el-button type="info" round class="button" @click="requestCharging">申请充电</el-button> <!--requestCharging-->
      <requestCharging v-if="openRequest" ref="requestCharging"/>
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
      <el-button type="info" round class="button" @click="logout">退出登录</el-button>
      <logout v-if="openLogout" ref="logout"/>
    </div>
    <div class="UserNotCharging-background"></div>
  </div>
</template>

<script>
import getTime from "./getTime";
import requestCharging from "./Charging/requestCharging";
import getQueue from './Queue/getQueue';
import getForm from './Charging/getForm';
import logout from './logout';
export default {
  name:"UserNotCharging",
  data() {
    return {
      openTime: false,
      openRequest: false,
      openQueue: false,
      openForm: false,
      openLogout: false,
    };
  },
  components: {
    getTime,
    requestCharging,
    getQueue,
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
    requestCharging() {
			this.openRequest = true;
			this.$nextTick(() => {
				this.$refs.requestCharging.init();
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
.notcharging-title {
  margin-top: 100px;
  margin-right: 165px;
  font-size: 60px;
  font-weight: 200;
  color: #312923;
  font-family: "DFPOP1B", "AaMaKeTi";
}
.notcharging {
  margin-top: 50px;
  margin-right: 300px;
  font-size: 60px;
  font-weight: 200;
  color: #312923;
  font-family: "DFPOP1B", "AaMaKeTi";
}
.UserNotCharging-background {
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
  margin-top:10px; /*距离顶部*/
  width: 350px; /**宽度 */
  height: 60px; /**高度 */
  margin-left: 700px; /**右侧距离 */
  border-color: #e6ba0b;  /* 边框颜色 */
  border-width: 4px; /**边框粗细 */
  background-color: transparent; /**背景透明 */
  color: #080809; /**字体颜色 */
  font-size: 30px; /**字体大小 */
  font-family: "AaMaKeTi", sans-serif; /**字体 */
}

</style>
