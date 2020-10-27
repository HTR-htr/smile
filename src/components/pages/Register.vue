<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="register-panel">
      <van-field
        v-model="userName"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        :error-message="userNameErrorMessage"
        @click-icon="username = ''"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMessage"
      />
      <div class="register-button">
        <van-button
          type="primary"
          size="large"
          @click="registerAction"
          :loading="openLoading"
          >马上注册</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
console.log(Toast);
console.log(url);
export default {
  data() {
    return {
      userName: "",
      password: "",
      openLoading: false,
      userNameErrorMessage: "",
      passwordErrorMessage: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async axiosRegisterUser() {
      this.openLoading = true;
      await axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            Toast.success("注册成功"); //跳转到用户界面
          } else {
            console.log(res.data.message);
            Toast.fail("注册失败");
            this.openLoading = false;
          }
        })
        .catch((err) => {
          Toast.fail("注册失败");
          this.openLoading = false;
        });
    },
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.userNameErrorMessage = "用户名不能小于5位";
        this.isOk = false;
      } else {
        this.userNameErrorMessage = "";
      }
      if (this.password.length < 5) {
        this.passwordErrorMessage = "密码不能小于5位";
        this.isOk = false;
      } else {
        this.passwordErrorMessage = "";
      }
      return isOk;
    },
    registerAction() {
      if (this.checkForm()) {
        this.axiosRegisterUser();
      }
    },
  },
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>