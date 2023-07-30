<template>
    <el-dialog
        title="排队情况" 
        :visible.sync="open" 
        width="1200px"
        custom-class="custom-dialog"
        append-to-body>
        <div v-for = "queue in QueueArray" :key="queue.key">
            <el-descriptions :title = "queue.key.toString()">
                <el-descriptions-item label="充电桩编号">{{ queue.chargingPileId }}</el-descriptions-item>
                <el-descriptions-item label="排队用户名">{{ queue.username }}</el-descriptions-item>
                <el-descriptions-item label="请求充电量">{{ queue.requireAmount }}</el-descriptions-item>
                <el-descriptions-item label="已等待时间">{{ queue.waitingTime }}</el-descriptions-item>
                <el-descriptions-item label="电池容量">{{ queue.batteryAmount }}</el-descriptions-item>
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
    name: "getQueue",
    data() {
        return {
            open: true,
            is_success: '',
            QueueArray:'',
        };
    },
    watch: {
        open(newVal) {
            if (newVal) {
                this.goQueue();
            }
        },
    },
    created() {
        this.goQueue(); // 组件创建时立即获取一次数据
    },
    methods: {
        init() {
            this.open = true;
        },
        goQueue() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.get('/admin/query-queue', {
                headers: {'Authorization': nowtoken}
            }).then(response => {
                this.is_success = response.data.code;
                this.QueueArray = response.data.data;
                let key = 1;
                this.QueueArray.forEach(queue => {
                    queue.key = key;
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
                    message: '查看排队情况成功',
                    type: 'success'
                });
            } else {
                this.$message.error('查看排队情况失败');
                this.open = false;
            }
        },
    }
};
</script>