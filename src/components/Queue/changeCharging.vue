<template>
    <el-dialog
        title="修改充电请求" 
        :visible.sync="open" 
        width="600px">
        <el-form ref="changeCharging" :model="changeCharging" :rules="rules" label-width="100px">
            <el-form-item label="充电模式:" prop="charge_mode">
                <el-radio v-model="changeCharging.charge_mode" label="F">快充模式(30度/h)</el-radio>
                <el-radio v-model="changeCharging.charge_mode" label="T">慢充模式(7度/h)</el-radio>
            </el-form-item>
            <el-form-item label="充电量:" prop="charging_capacity">
                <el-input v-model.number="changeCharging.charging_capacity" placeholder="请输入修改的的充电量">
                    <template slot="append">Kwh</template>
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goChange('changeCharging')">确 定</el-button>
            <el-button @click="open=false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "changeCharging",
    data() {
        return {
            open: true,
            is_success: '-1',
            changeCharging: {
                charge_mode: '',
                charging_capacity: ''
            },
            chargingCapacity: '',
            rules: {
                charge_mode: [
                    { required: true, message: '必须选择充电模式'},
                ],
                charging_capacity: [
                    { required: true, message: '充电量不能为空'},
                ]
            }
        };
    },
    methods: {
        init() {
            this.open = true;
        },
        goChange(formName) {
            this.chargingCapacity = parseFloat(this.changeCharging.charging_capacity)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
                    this.axios.post('/queue/change', {
                        chargingMode: this.changeCharging.charge_mode,
                        chargingAmount: this.chargingCapacity
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: '修改充电请求成功',
                    type: 'success'
                });
                this.open = false;
            } else {
                this.$message.error('修改充电请求失败，请重新提交');
            }
        }
    }
};
</script>
  