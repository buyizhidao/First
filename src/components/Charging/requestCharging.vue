<template>
    <el-dialog
        title="申请充电" 
        :visible.sync="open" 
        width="500px">
        <el-form ref="requestCharging" :model="requestCharging" :rules="rules" label-width="100px">
            <el-form-item label="充电模式:" prop="charge_mode">
                <el-radio v-model="requestCharging.charge_mode" label="F">快充模式(30度/h)</el-radio>
                <el-radio v-model="requestCharging.charge_mode" label="T">慢充模式(7度/h)</el-radio>
            </el-form-item>
            <el-form-item label="充电量:" prop="charging_capacity">
                <el-input v-model="requestCharging.charging_capacity" placeholder="请输入本次充电的充电量">
                    <template slot="append">Kwh</template>
                </el-input>
            </el-form-item>
            <el-form-item label="电池容量:" prop="battery_capacity">
                <el-input v-model="requestCharging.battery_capacity" placeholder="请输入汽车的电池容量">
                    <template slot="append">Kwh</template>
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goRequest('requestCharging')">确 定</el-button>
            <el-button @click="open=false">取 消</el-button>
        </span>
        <endCharging v-if="openForm" ref="endCharging"/>
    </el-dialog>
</template>

<script>
import endCharging from './endCharging';
export default {
    name: "requestCharging",
    data() {
        return {
            open: true,
            openForm: false,
            is_success: "-1",
            lastChargingCapacity: '0',
            requestCharging: {
                charge_mode: "",
                charging_capacity: "",
                battery_capacity: ""
            },
            chargingCapacity: '',
            batteryCapacity: '',
            rules: {
                charge_mode: [
                    { required: true, message: "必须选择充电模式" },
                ],
                charging_capacity: [
                    { required: true, message: "充电量不能为空" },
                ],
                battery_capacity: [
                    { required: true, message: "电池容量不能为空" },
                ],
            }
        };
    },
    components: { 
        endCharging 
    },
    methods: {
        UserNotCharging() {
            this.$router.push('/UserNotCharging');
        },
        init() {
            this.open = true;
        },
        goRequest(formName) {
            this.chargingCapacity = parseFloat(this.requestCharging.charging_capacity)
            this.batteryCapacity = parseFloat(this.requestCharging.battery_capacity)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var nowtoken = "Bearer " + sessionStorage.getItem("token");
                    this.axios.post("/charging/request", {
                        chargingMode: this.requestCharging.charge_mode,
                        chargingAmount: this.chargingCapacity,
                        batteryAmount: this.batteryCapacity
                    }, {
                        headers: {
                            "Authorization": nowtoken
                        }
                    }).then(response => {
                        this.is_success = response.data.code;
                        this.success();
                        console.log(response.data);
                    }, error => {
                        console.log("错误", error.message);
                    });
                }
                else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        success() {
            if (this.is_success === 0) {
                this.$message({
                    message: "提交订单成功",
                    type: "success"
                });
                sessionStorage.setItem("huiqu", 0);
                this.StartPolling_Capacity();
                this.open = false;
            }
            else {
                this.$message.error("提交订单失败，请重新提交");
                this.open = false;
            }
        },
        sleep1(numberMillis){    
            var now = new Date();    
            var exitTime = now.getTime() + numberMillis;   
            // eslint-disable-next-line no-constant-condition
            while (true) { 
                now = new Date();
                if (now.getTime() > exitTime) return;
            }     
        },
        StartPolling_Capacity() {
            this.sleep1(2000);
            this.timer = window.setInterval(() => {
                setTimeout(() => {
                    this.Capacity();
                }, 0);
            }, 2000);
        },
        Capacity() {
            var State = sessionStorage.getItem("state");
            console.log("请求充电后的状态 " + State);
            if (State === 'CHARGING') {
                var nowtoken = "Bearer " + sessionStorage.getItem("token");
                this.axios.get("/charging/remainAmount", {
                    headers: { "Authorization": nowtoken }
                }).then(response => {
                    this.is_success = response.data.code;
                    this.lastChargingCapacity = response.data.data.amount;
                    console.log('充电量。。。。。'+this.lastChargingCapacity);
                    // console.log(response.data);
                }, error => {
                    console.log("错误", error.message);
                });
                if (this.lastChargingCapacity === 0) {
                    // eslint-disable-next-line no-redeclare
                    var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
                    this.axios.post('/charging/submit', {
                    },{
                        headers: {
                            'Authorization': nowtoken
                        }
                    }).then(response => {
                        console.log(response.data)
                    }, error => {
                        console.log('错误', error.message)
                    })
                    window.clearInterval(this.timer);
                    this.timer = null;
                    this.UserNotCharging();
                    sessionStorage.setItem('huiqu',1);
                }
            } else if (State === "NOTCHARGING"){
                window.clearInterval(this.timer);
                this.timer = null;
            }
        }
    },
};
</script>
