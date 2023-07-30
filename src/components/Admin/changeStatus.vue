<template>
    <el-dialog
        title="修改充电桩状态" 
        :visible.sync="open" 
        width="400px"
        custom-class="custom-dialog"
        append-to-body>
        <el-form ref="changeStatus" :model="send" :rules="rules" label-width="100px">
            <el-form-item label="充电桩编号:" >
                <el-input v-model.number="send.id" placeholder="请输入充电桩编号"></el-input>
            </el-form-item>
            <el-form-item label="状态:" >
                <el-select v-model="send.status" placeholder="选择状态">
                    <el-option label="RUNNING" value="RUNNING" />
                    <el-option label="SHUTDOWN" value="SHUTDOWN" />
                    <el-option label="UNAVAILABLE" value="UNAVAILABLE" />
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="setStatus">确 定</el-button>
            <el-button @click="open=false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "changeStatus",
    data() {
        return {
            open: true,
            is_success: '',
            send:{
                id:'',
                status:'',
            },
            rules: {
                id: [
                    { required: true, message: '充电桩编号不能为空'},
                ]
            }
        };
    },
    methods: {
        init() {
            this.open = true;
        },
        setStatus() {
            var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
            this.axios.put('/admin/update-pile',{
                chargingPileId: this.send.id,
                status: this.send.status,
            },{
                headers: {
                    'Authorization': nowtoken
                }
            }).then(response => {
                this.is_success = response.data.code;
                this.success();
                console.log('修改充电桩状态的code返回   '+response.data.code)
                console.log(response.data)
            },error => {
                console.log('错误',error.message)
            })
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.open = false;
            } else {
                this.$message.error('修改失败');
                this.open = false;
            }
        },
    }
};
</script>