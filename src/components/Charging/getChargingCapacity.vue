<template>
    <el-dialog
        title="剩余充电量" 
        :visible.sync="open" 
        width="500px">
        <el-descriptions>
            <el-descriptions-item label="您当前剩余充电量" span="12">{{ lastChargingCapacity }}  Kwh</el-descriptions-item>
            <el-descriptions-item label="您当前已充电量" span="12">{{ chargedAmount }}  Kwh</el-descriptions-item>
            <el-descriptions-item label="您当前总费用" span="12">{{ totalFee }}  元</el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="open=false">返 回</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "getChargingCapacity",
    data() {
        return {
            open: true,
            is_success: '',
            lastChargingCapacity: '',
            chargedAmount: '',
            totalFee: ''
        };
    },
    watch: {
        open(newVal) {
            if (newVal) {
                this.goCapacity();
            }
        },
    },
    created() {
        this.goCapacity(); // 组件创建时立即获取一次数据
    },
    methods: {
        init() {
            this.open = true;
        },
        goCapacity() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.get('/charging/remainAmount', {
                headers: {'Authorization': nowtoken}
            }).then(response => {
                this.is_success = response.data.code;
                var amount = response.data.data.amount;
                var a = response.data.data.chargedAmount
                var b = response.data.data.totalFee
                this.lastChargingCapacity = parseFloat(amount).toFixed(2);
                this.chargedAmount = parseFloat(a).toFixed(2);
                this.totalFee = parseFloat(b).toFixed(2);
                this.success()
                console.log(response.data)
            }, error => {
                console.log('错误', error.message)
            })
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '查看剩余充电量成功',
                    type: 'success'
                });
            } else {
                this.$message.error('查看剩余充电量失败，请重新提交');
                this.open = false;
            }
        }
    }
};
</script>
  