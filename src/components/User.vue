<template>
    <div class="user-container">
      <h2>用户界面</h2>
      <div>
        <el-button @click="getTime">查询时间</el-button>
        <getTime v-if="openTime" ref="getTime"/>
      </div>
      <div>
        <el-button @click="requestCharging">申请充电</el-button> <!--requestCharging-->
        <requestCharging v-if="openRequest" ref="requestCharging"/>
      </div>
      <div>
        <el-button @click="changeCharging">修改充电请求</el-button> <!--changeCharging-->
        <changeCharging v-if="openChangeCharging" ref="changeCharging"/>
      </div>
      <div>
        <el-button @click="cancelRequest">取消充电请求</el-button> <!--cancelRequest-->
        <cancelRequest v-if="openCancel" ref="cancelRequest"/>
      </div>
      <div>
        <el-button @click="getQueue">预览当前车辆状况</el-button> <!--getQueue-->
        <getQueue v-if="openQueue" ref="getQueue"/>
      </div>
      <div>
        <el-button @click="getForm">查看充电详单</el-button> <!--getForm-->
        <getForm v-if="openForm" ref="getForm"/>
      </div>
      <div>
        <el-button @click="getChargingCapacity">查看剩余充电量</el-button> <!--getChargingCapacity-->
        <getChargingCapacity v-if="openCapacity" ref="getChargingCapacity"/>
      </div>
      <div>
        <el-button @click="endCharging">结束充电</el-button> <!--endCharging-->
        <endCharging v-if="openEnd" ref="endCharging"/>
      </div>
    </div>
</template>

<script>
import getTime from "./getTime";
import requestCharging from "./Charging/requestCharging";
import changeCharging from "./Queue/changeCharging";
import cancelRequest from "./Queue/cancelRequest";
import getQueue from './Queue/getQueue';
import getChargingCapacity from './Charging/getChargingCapacity';
import getForm from './Charging/getForm';
import endCharging from './Charging/endCharging';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"User",
  data() {
    return {
      openTime: false,
      openRequest: false,
      openChangeCharging: false,
      openCancel: false,
      openQueue: false,
      openCapacity: false,
      openEnd: false,
      openForm: false,
    };
  },
  components: {
    getTime,
    requestCharging,
    changeCharging,
    cancelRequest,
    getQueue,
    getChargingCapacity,
    endCharging,
    getForm,
  },
  methods: {
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

</style>
