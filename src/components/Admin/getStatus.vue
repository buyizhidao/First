<template>
    <el-dialog
        title="充电桩状态" 
        :visible.sync="open" 
        width="1200px"
        custom-class="custom-dialog"
        append-to-body>
        <div v-for = "status in statusArray" :key="status.key">
            <el-descriptions :title = "status.key.toString()">
                <el-descriptions-item label="充电桩编号">{{ status.chargingPileId }}</el-descriptions-item>
                <el-descriptions-item label="充电桩状态">{{ status.status }}</el-descriptions-item>
                <el-descriptions-item label="充电桩累计使用次数">{{ status.cumulativeUsageTimes }}</el-descriptions-item>
                <el-descriptions-item label="充电桩累计充电时间">{{ status.cumulativeChargingTime }}</el-descriptions-item>
                <el-descriptions-item label="充电桩累计充电电量">{{ status.cumulativeChargingAmount }}</el-descriptions-item>
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
    name: "getStatus",
    data() {
        return {
            open: true,
            is_success: '',
            statusArray:'',
        };
    },
    watch: {
        open(newVal) {
            if (newVal) {
                this.goStatus();
            }
        },
    },
    created() {
        this.goStatus(); // 组件创建时立即获取一次数据
    },
    methods: {
        init() {
            this.open = true;
        },
        goStatus() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.get('/admin/query-all-piles_stat', {
                headers: {'Authorization': nowtoken}
            }).then(response => {
                this.is_success = response.data.code;
                this.statusArray = response.data.data;
                let key = 1;
                this.statusArray.forEach(status => {
                    status.key = key;
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
                    message: '查看状态成功',
                    type: 'success'
                });
            } else {
                this.$message.error('查看状态失败');
                this.open = false;
            }
        },
    }
};
</script>