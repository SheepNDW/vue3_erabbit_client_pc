<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用帳號登入
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用簡訊登入
      </a>
    </div>
    <Form class="form" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="請輸入用戶名"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              v-model="form.password"
              name="password"
              type="password"
              placeholder="請輸入密碼"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="請輸入手機號碼"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              v-model="form.code"
              name="code"
              type="password"
              placeholder="請輸入驗證碼"
            />
            <span class="code">發送驗證碼</span>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隱私條款》</a>
          <span>和</span>
          <a href="javascript:;">《服務條款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn">登入</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘記密碼</a>
        <a href="javascript:;">免費註冊</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { Form, Field } from 'vee-validate';
import schema from '@/utils/vee-validate-schema';
export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup() {
    // 切換簡訊登入
    const isMsgLogin = ref(false);
    // 表單資料物件
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      moblie: null,
      code: null,
    });

    // vee-validate 校驗基本步驟
    // 1. 匯入 Form Field 元件, 將 form 和 input 替換掉, 需要加上name用來指定將來的校驗規則函式
    // 2. Field 需要進行資料綁定, 字段名稱最好和後台接口需要的一致
    // 3. 定義Field的name屬性指定的校驗規則函式, Form的validation-schema接收定義好的校驗規則(物件)
    const mySchema = {
      // 校驗函式規則: 返回true就是成功, 返回字符串就是失敗, 字符串就是錯誤提示
      account: schema.account,
    };

    return { isMsgLogin, form, schema: mySchema };
  },
};
</script>

<style lang="scss" scoped>
// account容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: $xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: $priceColor;
          }
          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
