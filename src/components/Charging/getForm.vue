<template>
    <el-dialog
        title="充电详单" 
        :visible.sync="open" 
        width="1200px"
        custom-class="custom-dialog"
        append-to-body>
        <el-table
            :data="tableData"
            height="250"
            border
            stripe
            style="width: 100%"
            max-height="700">
            <el-table-column prop="userId" label="用户id" width="120"></el-table-column>
            <el-table-column prop="orderId" label="详单编号" sortable width="120"></el-table-column>
            <el-table-column prop="createTime" label="订单创建时间" sortable width="130"></el-table-column>
            <el-table-column prop="chargingPileId" label="充电桩编号" width="120"></el-table-column>
            <el-table-column prop="volume" label="充电量" sortable width="120"></el-table-column>
            <el-table-column prop="chargingTime" label="充电时长(秒)" sortable width="130"></el-table-column>
            <el-table-column prop="startTime" label="开始充电时间" sortable width="130"></el-table-column>
            <el-table-column prop="endTime" label="结束充电时间" sortable width="130"></el-table-column>
            <el-table-column prop="chargingFee" label="充电费用(元)" sortable width="130"></el-table-column>
            <el-table-column prop="serviceFee" label="服务费用(元)" sortable width="130"></el-table-column>
            <el-table-column prop="totalFee" label="总费用(元)" sortable width="130"></el-table-column>
            <el-table-column prop="time" label="当前时间戳" width="120"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="open=false">返 回</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "getForm",
    data() {
        return {
            open: true,
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
            tableData: [],
        };
    },
    watch: {
        open(newVal) {
            if (newVal) {
                this.goForm();
            }
        },
    },
    created() {
        this.goForm(); // 组件创建时立即获取一次数据
    },
    methods: {
        init() {
            this.open = true;
        },
        goForm() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.get('/report/charging', {
                headers: {'Authorization': nowtoken}
            }).then(response => {
                this.is_success = response.data.code;
                this.tableData = response.data.data;
                console.log('idididiididididdidid'+this.userId)
                this.success()
                console.log(response.data)
            }, error => {
                console.log('错误', error.message)
            })
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
    }
};
</script>