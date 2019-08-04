<template>
  <div class="registed-box">
    <el-form
      :model="registedForm"
      status-icon
      :rules="rules2"
      ref="registedForm"
      class="form-box"
    >
      <el-row class="registed-title">
        <span>注册企业</span>
      </el-row>
      <el-row class="form-head">
        企业信息
      </el-row>
      <el-form-item
        class="form-list-item"
        prop="mobile"
      >
        <span class="head">
          <i>*</i>所在城市:
        </span>
        <el-cascader
          :options="options2"
          @active-item-change="handleItemChange"
          :props="props"
        ></el-cascader>
        <!-- <el-input v-model="registedForm.mobile" v-on:blur="blurMobile" placeholder="请输入手机号"></el-input> -->
      </el-form-item>
      <el-form-item class="form-list-item">
        <span class="head">
          <i>*</i>公司简称:
        </span>
        <el-input placeholder="如：链家地产"></el-input>
      </el-form-item>
      <el-row class="form-head form-head-top">
        管理员信息
      </el-row>
      <el-form-item class="form-list-item">
        <span class="head">
          <i>*</i>管理员姓名:
        </span>
        <el-input placeholder="请填写管理员姓名"></el-input>
      </el-form-item>
      <el-form-item class="form-list-item">
        <span
          class="head"
          prop="mobile"
        >
          <i>*</i>管理员电话:
        </span>
        <el-input
          v-model="registedForm.mobile"
          v-on:blur="blurMobile"
          placeholder="请填写11位有效手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-list-item">
        <span class="head">
        </span>
        <el-input
          class="msg-code"
          placeholder="短信验证码"
        ></el-input>
        <el-button
          class="msg-code-btn"
          type="primary"
          :disabled="getCodeFlag"
        >获取短信验证码</el-button>
      </el-form-item>
      <el-form-item class="form-list-item">
        <span
          class="head"
          prop="mobile"
        >
          <i>*</i>登录密码:
        </span>
        <el-input placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="form-list-item">
        <span
          class="head"
          prop="mobile"
        >
          <i>*</i>确认登录密码:
        </span>
        <el-input placeholder="请确认登录密码"></el-input>
      </el-form-item>
      <el-form-item class="form-list-item">
        <p class="head">
          <i>*</i>管理员微信:
        </p>
        <el-row class="administrator-wx">
          <el-col :span="12"><img
              src="../../../public/images/code.jpg"
              alt=""
            ></el-col>
          <el-col :span="12">扫码的微信号将成为管理员微信号</el-col>
        </el-row>
      </el-form-item>
      <el-checkbox v-model="checked">我已阅读并同意相关服务条款和隐私政策
        <router-link to="">《房通系统服务协议》</router-link>
      </el-checkbox>
      <el-form-item class="registed-form-btn">
        <el-button
          type="primary"
          @click="submitForm('registedForm')"
          v-loading.fullscreen.lock="fullscreenLoading"
        >立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    let checkMobile = (rule, value, callback) => {
      var pattern = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!value) {
        this.phoneVerification = false
        return callback(new Error('手机号不能为空'))
      } else {
        if (!pattern.test(value)) {
          this.phoneVerification = false
          return callback(new Error('请输入格式正确的手机号'))
        } else {
          this.phoneVerification = true
          callback()
        }
      }
    }

    return {
      fullscreenLoading: false,
      registedForm: {
        code: '',
        mobile: ''
        // checkCode: '',
        // pass: '',
        // checkPass: ''
      },
      rules2: {
        mobile: [{ validator: checkMobile, trigger: 'blur' }]
        // checkCode: [{ validator: checkCodes, trigger: "blur" }],
        // pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },

      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      }
    }
  },

  methods: {
    blurMobile () {
      let pattern = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!pattern.test(this.registedForm.mobile)) {
      }
    },

    handleItemChange (val) {
      console.log('active item:', val)
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
          this.options2[0].cities = [{
            label: '南京'
          }]
        } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
          this.options2[1].cities = [{
            label: '杭州'
          }]
        }
      }, 300)
    }
  }
}
</script>
<style scoped>
.registed-box {
  width: 100%;
}

.form-box {
  width: 500px;
  margin: 0 auto;
  margin-top: 40px;
}

.registed-title {
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 30px;
  /* font-weight: bold; */
  border-bottom: 1px solid #ccc;
}

.form-head {
  margin: 20px 0;
  padding-left: 10px;
  border-left: 2px solid #f60;
}

.form-head-top {
  margin-top: 60px;
}

.form-list-item i {
  color: #f00;
  margin-right: 5px;
}

.form-list-item .head {
  display: inline-block;
  width: 100px;
}

.form-list-item .el-cascader--small,
.form-list-item .el-input--small {
  margin-left: 10px;
  margin-top: 5px;
  width: 320px;
}

.form-list-item .el-form-item__error {
  left: 88px;
  margin-top: 10px;
}

.form-list-item .msg-code {
  width: 186px;
}

.form-list-item .msg-code-btn {
  width: 120px;
  margin-left: 10px;
}

.administrator-wx {
  width: 400px;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
}

.administrator-wx img {
  display: inline-block;
  width: 100%;
  height: 170px;
}

.administrator-wx .el-col-12:last-child {
  margin-top: 50px;
}

.registed-form-btn .el-button--primary {
  width: 80%;
  margin: 20px auto;
}
</style>
