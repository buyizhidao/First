<template>
    <el-dialog
        title="当前车辆状况" 
        :visible.sync="open" 
        width="500px">
        <el-descriptions>
            <el-descriptions-item label="本车排队号码" span="12">{{ chargeId }}</el-descriptions-item>
            <el-descriptions-item label="前车等待数量" span="12">{{ queueLen }}</el-descriptions-item>
            <el-descriptions-item label="当前状态" span="12">{{ State }}</el-descriptions-item>
            <el-descriptions-item label="用户所在区域" span="12">{{ place }}</el-descriptions-item>
        </el-descriptions>
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
            chargeId: '',
            queueLen: '',
            curState: '',
            place: '',
            State: ''
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
        // setInterval(this.getQueue, 5000); // 每5秒更新一次数据
    },
    methods: {
        init() {
            this.open = true;
        },
        goQueue() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.get('/queue/info', {
                headers: {'Authorization': nowtoken}
            }).then(response => {
                this.is_success = response.data.code;
                this.chargeId = response.data.data.chargeId;
                this.queueLen = response.data.data.queueLen;
                this.curState = response.data.data.curState;
                if (this.curState === 'WAITINGSTAGE1') {
                    this.State = '您当前正在等待区等待'
                } else if (this.curState === 'WAITINGSTAGE2') {
                    this.State = '您当前正在充电区等待'
                } else if (this.curState === 'CHANGEMODEREQUEUE') {
                    this.State = '由于充电模式更改，您当前正在重新排队'
                } else if (this.curState === 'FAULTREQUEUE') {
                    this.State = '由于充电桩故障，您当前正在充电区等待'
                } else if (this.curState === 'NOTCHARGING') {
                    this.State = '您当前未在充电'
                } else if (this.curState === 'CHARGING') {
                    this.State = '您当前正在充电'
                }
                console.log('这是应该显示的内容'+this.State)
                this.place = response.data.data.place;
                this.success()
                console.log(response.data)
            }, error => {
                console.log('错误', error.message)
            })
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '查看队列情况成功',
                    type: 'success'
                });
            } else {
                this.$message.error('查看队列情况失败，请重新提交');
                this.open = false;
            }
        }
    }
};
</script>
  