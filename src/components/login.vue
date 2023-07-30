<template>
  <div class="login-container">
    <h2 class="login-title">登录</h2>
    <el-form :model="login" :rules="rules" ref="login" label-width="80px">
      <el-form-item label="用户名:" class="login-item" prop="username">
        <el-input class="login-text" v-model="login.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" class="login-item" prop="password">
        <el-input class="login-text" v-model="login.password" placeholder="请输入密码" show-password
          @keyup.enter.native="goLogin('login')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goLogin('login')" class="login-button">登录</el-button>
        <el-button @click="back" class="login-button">返回</el-button>
      </el-form-item>
    </el-form>
    <div class="login-background"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"login",
  data() {
    return {
      is_success: -1,
      message: '',
      is_admin: '',
      timer: null,
      login: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空'}
        ],
        password: [
          { required: true, message: '密码不能为空'}
        ],
      }
    };
  },
  methods: {
    UserNotCharging() {
      this.$router.push('/UserNotCharging');
    },
    UserWaiting() {
      this.$router.push('/UserWaiting');
    },
    UserCharging() {
      this.$router.push('/UserCharging');
    },
    admin() {
      this.$router.push('/admin');
    },
    back() {
      this.$router.push('/');
    },
    goLogin(login) {
      this.$refs[login].validate((valid) => {
        if (valid) {
          sessionStorage.removeItem('state');
          sessionStorage.removeItem('prestate');
          this.axios.post('/login', {
            username: this.login.username,
            password: this.login.password,
          }).then(response => {
            this.is_success = response.data.code;
            this.message = response.data.message;
            this.is_admin = response.data.data.is_admin;
            sessionStorage.setItem('token', response.data.data.token); 
            sessionStorage.setItem('state', '');
            sessionStorage.setItem('is_login', 'yes');
            sessionStorage.setItem('huiqu', 1);
            this.success();
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
        if (!this.is_admin) {
          this.$message({
            message: '恭喜你，用户登录成功！',
            type: 'success'
          });
          this.goState();
          this.startPolling();
        } else {
          this.$message({
            message: '恭喜你，管理员登录成功！',
            type: 'success'
          });
          this.admin();
        }
      } else {
        this.$message.error(this.message);
      }
    },
    startPolling() {
      this.timer = window.setInterval(() => {
        setTimeout(() => {
            this.goState()
          }, 0)
      }, 2000);
    },
    goState() {  // 进入轮询
      var is_login = sessionStorage.getItem('is_login');
      if (is_login === 'not') {
        window.clearInterval(this.timer);
        this.timer = null
      }
      else {
        var nowtoken = 'Bearer ' + sessionStorage.getItem("token");
        this.axios.get('/queue/info', {
          headers: {'Authorization': nowtoken}
        }).then(response => {
          var state = sessionStorage.getItem('state');
          sessionStorage.setItem('prestate', state);
          sessionStorage.setItem('state', response.data.data.curState);
          // 获取state数据，根据state数据进入相应页面
          var prestate = sessionStorage.getItem('prestate');
          var nowstate = sessionStorage.getItem('state');
          var pre = 'pre';
          var now = 'now';
          if (prestate === 'NOTCHARGING') {
            pre = 1;
          } else if (prestate === 'WAITINGSTAGE1' || 
                    prestate === 'CHANGEMODEREQUEUE' || 
                    prestate === 'WAITINGSTAGE2' || 
                    prestate === 'FAULTREQUEUE') {
            pre = 2;
          } else if (prestate === 'CHARGING') {
            pre = 3;
          } else {
            pre = 4;
          }
          if (nowstate === 'NOTCHARGING') {
            now = 1;
          } else if (nowstate === 'WAITINGSTAGE1' || 
                    nowstate === 'CHANGEMODEREQUEUE' || 
                    nowstate === 'WAITINGSTAGE2' || 
                    nowstate === 'FAULTREQUEUE') {
            now = 2;
          } else if (nowstate === 'CHARGING') {
            now = 3;
          } else {
            now = 4;
          }
          var huiqu = sessionStorage.getItem('huiqu');
          if (now !== pre) {
            if (now === 1 && huiqu === '1') {
              // console.log('huiqu ' + huiqu)
              this.UserNotCharging();
            } else if (now === 2) {
              this.UserWaiting();
            } else if (now === 3) {
              this.UserCharging();
            }
          }
          console.log(pre)
          console.log(now)
          console.log(response.data)
        }, error => {
            console.log('错误', error.message)
        })
      }
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;/* 使用 margin 属性实现水平居中 */
  background-color: transparent;
  border: 2px solid #000000;  /* 边框颜色 */
  margin-top: 250px;
  border-radius: 25px;
}

.login-background {
  background-image: url('../assets/home.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8; /* 设置透明度为50% */
  z-index: -1;
}

.login-title {
  margin-top: 20px;
  margin-bottom: -10px;
  font-size: 35px;
  font-weight: 200;
  color: #000000;
  font-family: "AaMaKeTi", sans-serif;
}

.login-item {
  display: block;
  margin-top: 30px;
}

.login-item >>> .el-form-item__label{
  color:#000000;
}

.login-text {  
  display: block;
  width: 290px;
  height: 40px;
}

.login-button {
  margin-top: 5px;
  margin-right: 60px;
}

</style>
