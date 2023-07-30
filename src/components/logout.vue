<template>
    <el-dialog
        :visible.sync="open" 
        width="500px">
        <span>是否确定退出登录？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goBack">确 定</el-button>
            <el-button @click="open=false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "logout",
    data() {
        return {
            open: true,
        };
    },
    methods: {
        init() {
            this.open = true;
        },
        goBack() {
            this.$router.push('/');
            // this.$refs.login.stopPolling();
            sessionStorage.setItem('is_login', 'not')
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('state');
            sessionStorage.removeItem('prestate');
            this.$message({
                message: '退出登录成功',
                type: 'success'
            });
            this.open = false;
        },
    }
};
</script>
  