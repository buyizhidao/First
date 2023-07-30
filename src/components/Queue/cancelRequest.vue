<template>
    <el-dialog
        :visible.sync="open" 
        width="500px">
        <span>当前您正在排队，是否确定取消充电排队？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goCancel">确 定</el-button>
            <el-button @click="open=false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "cancelRequest",
    data() {
        return {
            is_success: '',
            open: true,
        };
    },
    methods: {
        init() {
            this.open = true;
        },
        goCancel() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.post('/charging/cancel', {
            },{
                headers: {
                    'Authorization': nowtoken
                }
            }).then(response => {
                this.is_success = response.data.code;
                this.success()
                console.log(response.data)
            }, error => {
                console.log('错误', error.message)
            })
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '取消充电成功',
                    type: 'success'
                });
                sessionStorage.setItem('huiqu', '1')
            } else {
                this.$message.error('取消充电失败，请重新提交');
            }
            this.open = false;
        }
    }
};
</script>
  