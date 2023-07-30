<template>
    <!-- 添加或修改业务对话框 -->
    <el-dialog
        title="当前时间" 
        class="getTime-dialog"
        :visible.sync="open" 
        width="500px"
        :center="false"
        :top="`${top}px`"
        custom-class="getTime-dialog">
        <span class="variable-value">{{ datetime }}</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="open=false">确 定</el-button>
            <el-button @click="open=false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "getTime",
    data() {
        return {
            datetime: '',
            top: 300,
            open: true,
            timer: null
        };
    },
    watch: {
        open(newVal) {
            if (newVal) {
                this.getData();
                // setInterval(this.getData, 3000);
            }
        },
    },
    created() {
        this.getData();
        // setInterval(this.getData, 3000);
    },
    methods: {
        init() {
            this.open = true;
        },
        getData() {
            this.axios.get('/time')
            .then(response => {
                this.datetime = response.data.data.datetime;
                console.log(response.data);
                console.log(this.datetime);
            })
            .catch(error => {
                console.error(error);
            });
        },
    },
};
</script>

<style scoped>

.getTime-dialog >>> .el-dialog__header {
  background-color: #333333;
}

.getTime-dialog >>> .el-dialog__title {
  color: #ffffff;
}

.getTime-dialog >>> .el-dialog__body {
  padding: 20px;
}

.getTime-dialog >>> .el-dialog__footer {
  background-color: #f0f0f0;
  text-align: right;
}

.variable-value {
  font-family: Socake, sans-serif;
  font-size: 45px;
  color: #000000;
}
</style>