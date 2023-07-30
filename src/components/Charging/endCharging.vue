<template>
    <el-dialog
        :visible.sync="open"
        width="500px">
        <span>您当前正在充电，是否确定结束充电？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goEnd()">确 定</el-button>
            <el-button @click="open=false">取 消</el-button>
        </span>
        <getEndForm v-if="openForm" ref="getEndForm"/>
    </el-dialog>
</template>

<script>
import getEndForm from './getEndForm';
export default {
    name: "endCharging",
    data() {
        return {
            open: true,
            openForm: false,
            is_success: '',
            userId: '',
            orderId: '',
            createTime: '',
            chargingPileId: '',
            volume: '',
            chargingTime: '',
            startTime: '',
            endTime: '',
            chargingFee: '',
            serviceFee: '',
            totalFee: '',
            time: '',
        };
    },
    components: {
        getEndForm
    },
    methods: {
        init() {
            this.open = true;
        },
        goEndForm() {
            this.open = false;
			this.openForm = true;
			this.$nextTick(() => {
				this.$refs.getEndForm.init();
                this.$refs.getEndForm.goForm(
                    this.userId,
                    this.orderId,
                    this.createTime,
                    this.chargingPileId,
                    this.volume,
                    this.chargingTime,
                    this.startTime,
                    this.endTime,
                    this.chargingFee,
                    this.serviceFee,
                    this.totalFee,
                    this.time
                );
			});
		},
        goEnd() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            console.log(nowtoken)
            this.axios.post('/charging/submit', {
            },{
                headers: {
                    'Authorization': nowtoken
                }
            }).then(response => {
                this.is_success = response.data.code;
                this.userId = response.data.data.userId;
                this.orderId = response.data.data.orderId;
                this.createTime = response.data.data.createTime;
                this.chargingPileId = response.data.data.chargingPileId;
                this.volume = response.data.data.volume;
                this.chargingTime = response.data.data.chargingTime;
                this.startTime = response.data.data.startTime;
                this.endTime = response.data.data.endTime;
                this.chargingFee = response.data.data.chargingFee;
                this.serviceFee = response.data.data.serviceFee;
                this.totalFee = response.data.data.totalFee;
                this.time = response.data.data.time;
                this.success()
                console.log(response.data)
            }, error => {
                console.log('错误', error.message)
            })
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '结束充电',
                    type: 'success'
                });
                this.goEndForm()
            } else {
                this.$message.error('结束充电失败，请重新提交');
                this.open = false;
            }
        }
    }
};
</script>
  