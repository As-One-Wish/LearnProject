<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="phoneNumber" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-show="picUrl" :src="picUrl" alt="" @click="this.getPicCaptcha">
        </div>
        <div class="form-item">
          <input v-model="msgCaptcha" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCaptcha">{{ second === totalSeconds ? '获取验证码' : `${second}秒后重新发送` }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCaptcha, getMsgCaptcha, userLogin } from '@/api/login'
import { showToast } from 'vant'

export default {
  name: 'LoginPage',
  data () {
    return {
      phoneNumber: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCaptcha: '', // 短信验证码
      picKey: '', // 图形验证码的唯一标识
      picUrl: '', // 图片地址
      totalSeconds: 60, // 总秒数
      second: 60, // 当前秒数，利用定时器对second--
      timer: null // 定时器ID
    }
  },
  async created () {
    this.getPicCaptcha()
  },
  methods: {
    /**
     * @description 获取图形验证码
     */
    async getPicCaptcha () {
      const { data: { key, base64 } } = await getPicCaptcha()
      this.picKey = key
      this.picUrl = base64
    },
    /**
     * @description 获取验证码
     */
    async getCaptcha () {
      // 没通过校验 不继续向下走
      if (!this.validateCaptcha()) {
        this.getPicCaptcha()
        return
      }
      // 当目前木有定时器开着，且totalSecond和second一致才可以开始倒计时
      if (!this.timer && this.second === this.totalSeconds) {
        // 发送请求
        try {
          await getMsgCaptcha(this.picCode, this.picKey, this.phoneNumber)

          showToast('短信发送成功，注意查收')
          // 开启倒计时
          this.timer = setInterval(() => {
            this.second--
            if (this.second <= 0) {
              clearInterval(this.timer)
              this.second = this.totalSeconds
            }
          }, 1000)
        } catch {
          this.getPicCaptcha()
          this.picCode = ''
        }
      }
    },
    /**
     * @description 手机号和图形验证码校验
     */
    validateCaptcha () {
      // 手机号不满足要求返回false
      if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
        showToast('请输入正确的手机号')
        return false
      }
      // 图形验证码不满足要求返回false
      if (!/^\w{4}$/.test(this.picCode)) {
        showToast('请输入正确的验证码')
        return false
      }
      // 通过校验
      return true
    },
    /**
     *
     */
    async login () {
      // 没通过校验 不继续向下走
      if (!this.validateCaptcha()) {
        showToast('请输入正确的手机号和验证码')
        return
      }
      if (!/^\d{6}$/.test(this.msgCaptcha)) {
        showToast('请输入正确的手机验证码')
        return
      }
      try {
        // 发送登录请求
        const res = await userLogin(this.phoneNumber, this.msgCaptcha)
        this.$store.commit('user/setUserInfo', res.data)
        showToast('登录成功')
        // 进行判断，看地址栏有无回跳地址
        const backUrl = this.$route.query.backUrl || '/'
        // 使用push到商品详情页，会再回跳
        this.$router.replace(backUrl)
      } catch { }
    }
  },
  onUnmounted () {
    // 离开页面清除计时器
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
