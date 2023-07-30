<template>
    <el-dialog
        title="报表" 
        :visible.sync="open" 
        width="1200px"
        custom-class="custom-dialog"
        append-to-body>
        <div v-for = "report in reportsArray" :key="report.key">
            <el-descriptions :title = "report.key.toString()">
                <el-descriptions-item label="月">{{ report.month }}</el-descriptions-item>
                <el-descriptions-item label="周">{{ report.week }}</el-descriptions-item>
                <el-descriptions-item label="天">{{ report.day }}</el-descriptions-item>
                <el-descriptions-item label="充电桩编号">{{ report.chargingPileId }}</el-descriptions-item>
                <el-descriptions-item label="累计使用次数">{{ report.cumulativeUsageTimes }}</el-descriptions-item>
                <el-descriptions-item label="累计充电时间">{{ report.cumulativeChargingTime }}</el-descriptions-item>
                <el-descriptions-item label="累计充电电量">{{ report.cumulativeChargingAmount }}</el-descriptions-item>
                <el-descriptions-item label="累计充电费用">{{ report.cumulativeChargingFee }}</el-descriptions-item>
                <el-descriptions-item label="累计服务费用">{{ report.cumulativeServiceFee }}</el-descriptions-item>
                <el-descriptions-item label="累计总费用">{{ report.cumulativeFee }}</el-descriptions-item>
            </el-descriptions>
            <el-divider />
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="open=false">返 回</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "getReport",
    data() {
        return {
            open: true,
            is_success: '',
            reportsArray:'',
        };
    },
    watch: {
        open(newVal) {
            if (newVal) {
                this.goReport();
            }
        },
    },
    created() {
        this.goReport(); // 组件创建时立即获取一次数据
    },
    methods: {
        init() {
            this.open = true;
        },
        goReport() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.get('/admin/query-report', {
                headers: {'Authorization': nowtoken}
            }).then(response => {
                this.is_success = response.data.code;
                this.reportsArray = response.data.data;
                let key = 1;
                this.reportsArray.forEach(report => {
                    report.key = key;
                    key = key + 1;
                });
                this.success()
                console.log(response.data)
            }, error => {
                console.log('错误', error.message)
            })
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '查看报表成功',
                    type: 'success'
                });
            } else {
                this.$message.error('查看报表失败');
                this.open = false;
            }
        },
    }
};
</script>