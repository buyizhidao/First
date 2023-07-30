<template>
    <div class="admin-container">
      <h2 class="admin-title">管理员界面</h2>
      <div>
        <el-button type="info" round class="button" @click="changeStatus">更新充电桩状态</el-button>
        <changeStatus v-if="openChangeStatus" ref="changeStatus"/>
      </div>
      <div>
        <el-button type="info" round class="button" @click="getStatus">查看充电桩状态</el-button>
        <getStatus v-if="openGetStatus" ref="getStatus"/>
      </div>
      <div>
        <el-button type="info" round class="button" @click="getReport">查看报表</el-button>
        <getReport v-if="openReport" ref="getReport"/>
      </div>
      <div>
        <el-button type="info" round class="button" @click="getQueueStatus">查看排队情况</el-button>
        <getQueueStatus v-if="openQueueStatus" ref="getQueueStatus"/>
      </div>
      <div>
        <el-button type="info" round class="button" @click="logout">退出登录</el-button>
        <logout v-if="openLogout" ref="logout"/>
      </div>
      <div class="admin-background"></div>
    </div> 
</template>
    
<script>
import changeStatus from "./Admin/changeStatus.vue"
import getStatus from "./Admin/getStatus";
import getReport from "./Admin/getReport";
import getQueueStatus from "./Admin/getQueueStatus";
import logout from './logout';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"Admin",
  data() {
    return {
      openChangeStatus: false,
      openGetStatus: false,
      openReport: false,
      openQueueStatus: false,
      openLogout: false,
    };
  },
  components: {
    changeStatus,
    getStatus,
    getReport,
    getQueueStatus,
    logout
  },
  methods: {
    changeStatus() {
			this.openChangeStatus = true;
			this.$nextTick(() => {
				this.$refs.changeStatus.init();
			});
		},
    getStatus() {
			this.openGetStatus = true;
			this.$nextTick(() => {
				this.$refs.getStatus.init();
			});
		},
    getReport() {
			this.openReport = true;
			this.$nextTick(() => {
				this.$refs.getReport.init();
			});
		},
    getQueueStatus() {
			this.openQueueStatus = true;
			this.$nextTick(() => {
				this.$refs.getQueueStatus.init();
			});
		},
    logout() {
      this.openLogout = true;
      this.$nextTick(() => {
        this.$refs.logout.init();
      });
    },
  }
}
</script>
  
<style scoped>
.admin-title {
  margin-top: 150px;
  margin-right: 300px;
  font-size: 100px;
  font-weight: 200;
  color: #211d1c;
  font-family: "DFPOP1B", "AaMaKeTi";
}
.admin-background {
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