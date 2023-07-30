<template>
    <div class="home-container">
      <h2 class="home-title">欢迎来到<br>充电桩智能调度计费系统</h2>
      <el-button type="info" round class="home-button" @click="goToRegister">注册</el-button>
      <el-button type="info" round class="home-button" @click="goToLogin">登录</el-button>
      <router-view></router-view>
      <el-button type="info" round class="home-button" @click="getTime">查询时间</el-button>
      <getTime v-if="open" ref="getTime"/>
      <div class="home-background"></div>
    </div>
</template>

<script>
import getTime from "./getTime";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"home",
  components: {
    getTime
  },
  data() {
      return {
        open: false
      };
    },
  methods: {
    goToRegister() {
      this.$router.push('/register');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    getTime() {
			this.open = true;
			this.$nextTick(() => {
				this.$refs.getTime.init();
			});
		}
  }
};
</script>
  
<style scoped>
.home-container {
  margin: 0 auto;/* 实现水平居中 */
}

.home-title {
  margin-top: -40px;
  /* margin-right: 300px; */
  font-size: 65px;
  font-weight: 200;
  color: #000000;
  font-family: "DFPOP1B", "AaMaKeTi";
}

.home-background {
  background-image: url('../assets/home.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7; /* 设置透明度 */
  z-index: -1;
}

.home-button {
  margin-top: 530px; /*距离顶部*/
  width: 200px; /**宽度 */
  height: 80px; /**高度 */
  margin-right: 50px; /**右侧距离 */
  border-color: #000000;  /* 边框颜色 */
  border-width: 2px; /**边框粗细 */
  background-color: transparent; /**背景透明 */
  color: #000000; /**字体颜色 */
  font-size: 30px; /**字体大小 */
  font-family: "AaMaKeTi", sans-serif; /**字体 */
}
</style>
  