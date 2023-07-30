<template>
    <el-dialog
        title="本次充电详单" 
        :visible.sync="open" 
        width="500px"
        append-to-body>
        <el-descriptions>
            <el-descriptions-item label="用户id" span="12">{{ userId }}</el-descriptions-item>
            <el-descriptions-item label="详单编号" span="12">{{ orderId }}</el-descriptions-item>
            <el-descriptions-item label="订单创建时间" span="12">{{ createTime }}</el-descriptions-item>
            <el-descriptions-item label="充电桩编号" span="12">{{ chargingPileId }}</el-descriptions-item>
            <el-descriptions-item label="充电量" span="12">{{ volume }}</el-descriptions-item>
            <el-descriptions-item label="充电时长" span="12">{{ chargingTime }}</el-descriptions-item>
            <el-descriptions-item label="开始充电时间" span="12">{{ startTime }}</el-descriptions-item>
            <el-descriptions-item label="结束充电时间" span="12">{{ endTime }}</el-descriptions-item>
            <el-descriptions-item label="充电费用" span="12">{{ chargingFee }}</el-descriptions-item>
            <el-descriptions-item label="服务费用" span="12">{{ serviceFee }}</el-descriptions-item>
            <el-descriptions-item label="总费用" span="12">{{ totalFee }}</el-descriptions-item>
            <el-descriptions-item label="当前时间戳" span="12">{{ time }}</el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="back">返 回</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "getEndForm",
    data() {
        return {
            open: true,
            is_success: 0,
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
    methods: {
        UserNotCharging() {
            this.$router.push('/UserNotCharging');
        },
        init() {
            this.open = true;
        },
        goForm(a,b,c,d,e,f,g,h,i,j,k,l) {
            this.userId = a;
            this.orderId = b;
            this.createTime = c;
            this.chargingPileId = d;
            this.volume = parseFloat(e).toFixed(2);
            this.chargingTime = f;
            this.startTime = g;
            this.endTime = h;
            this.chargingFee = i;
            this.serviceFee = j;
            this.totalFee = k;
            this.time = l;
            this.is_success = 0;
            this.success()
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '查看详单成功',
                    type: 'success'
                });
            } else {
                this.$message.error('查看详单失败，请重新提交');
                this.open = false;
            }
        },
        back() {
            this.open = false;
            this.UserNotCharging();
            sessionStorage.setItem('huiqu',1);
        }
    }
};
</script>
  