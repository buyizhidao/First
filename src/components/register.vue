<template>
  <div class="register-container">
    <h2 class="register-title">注册界面</h2>
    <el-form ref="register" status-icon :model="register" :rules="rules" label-width="92px">
      <el-form-item label="用户名:" class="register-item" prop="username">
        <el-input class="register-text" v-model="register.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" class="register-item" prop="password">
        <el-input class="register-text" v-model="register.password" placeholder="请输入密码" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" class="register-item" prop="repassword">
        <el-input class="register-text" v-model="register.repassword" placeholder="请再次输入密码" show-password autocomplete="off" @keyup.enter.native="goRegister('register')"></el-input>
      </el-form-item>
      <el-form-item label="密钥:" class="register-item" prop="key">
        <el-input class="register-text" v-model="register.key" placeholder="用户注册时密钥为空" @keyup.enter.native="goRegister('register')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goRegister('register')" class="register-button">注册</el-button>
        <el-button @click="back" class="register-button">返回</el-button>
      </el-form-item>
    </el-form>
    <div class="register-background"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"register",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.register.repassword !== '') {
          this.$refs.register.validateField('repassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.register.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      is_success: '-1',
      messgae: '',
      register: {
        username: '',
        password: '',
        repassword: '',
        key: '',
      },
      rules: {
        username: [
          { validator: validateName, required: true, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        repassword: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    goRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/register', {
            username: this.register.username,
            password: this.register.password,
            key: this.register.key
          }).then(response => {
            this.is_success = response.data.code;
            this.messgae = response.data.message;
            this.success()
            console.log(response.data)
            console.log(this.is_success)
          }, error => {
            console.log('错误', error.message)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.push('/');
    },
    success() {
      if (this.is_success === 0) {
        this.$message({
          message: '恭喜你，注册成功！！！！！',
          type: 'success'
        });
      } else {
        this.$message.error(this.messgae);
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 420px;
  margin: 0 auto;/* 使用 margin 属性实现水平居中 */
  background-color: transparent;
  border: 2px solid #000000;  /* 边框颜色 */
  margin-top: 200px;
  border-radius: 25px;
}

.register-background {
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

.register-title {
  margin-top: 20px;
  margin-bottom: -10px;
  font-size: 35px;
  font-weight: 200;
  color: #000000;
  font-family: "AaMaKeTi", sans-serif;
}

.register-item {
  display: block;
  margin-top: 30px;
}

.register-item >>> .el-form-item__label{
  color:#000000;
}

.register-text {  
  display: block;
  width: 290px;
  height: 40px;
}

.register-button{
  margin-top: 5px;
  margin-right: 60px;
}
</style>