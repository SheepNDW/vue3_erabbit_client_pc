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
    <Form
      ref="formRef"
      class="form"
      :validation-schema="schema"
      v-slot="{ errors }"
      autocomplete="off"
    >
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
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="請輸入密碼"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="請輸入手機號碼"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="text"
              placeholder="請輸入驗證碼"
            />
            <span @click="send" class="code">
              {{ timer === 0 ? '發送驗證碼' : `${timer}秒後發送` }}
            </span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隱私條款》</a>
          <span>和</span>
          <a href="javascript:;">《服務條款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a @click="login" href="javascript:;" class="btn">登入</a>
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
import { reactive, ref, watch, onUnmounted } from 'vue';
import { Form, Field } from 'vee-validate';
import schema from '@/utils/vee-validate-schema';
import Message from '@/components/library/Message';
import { userAccountLogin, userMobileLogin, userMobileLoginMsg } from '@/api/user';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useIntervalFn } from '@vueuse/core';
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
    // 4. 自定義元件需要校驗必須先支持 v-model 然後Field使用as指定為元件名稱
    const mySchema = {
      // 校驗函式規則: 返回true就是成功, 返回字符串就是失敗, 字符串就是錯誤提示
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree,
    };

    // 監聽isMsgLogin重置表單 (資料 + 清除校驗結果)
    const formRef = ref(null);
    watch(isMsgLogin, () => {
      // 重置資料
      form.isAgree = true;
      form.account = null;
      form.password = null;
      form.moblie = null;
      form.code = null;
      // 如果沒有銷毀Field元件, 之前的校驗結果是不會銷毀的 例如: v-show切換的
      // Form元件提供了一個 resetForm 函式清除校驗結果
      formRef.value.resetForm();
    });

    // 在setup中獲取元件實例 proxy
    // const { proxy } = getCurrentInstance();
    // proxy.$message({ text: '111' });

    // 需要在點擊登入的時候對整體表單進行校驗
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const login = async () => {
      // Form元件提供了一個 validate 函式作為整體表單校驗, 但是返回的是一個promise
      const valid = await formRef.value.validate();
      if (valid) {
        try {
          let data = null;
          if (isMsgLogin.value) {
            // **手機登入
            // 2.1 準備一個api做手機登入
            // 2.2 調用api函式
            // 2.3 成功: 儲存用戶訊息 + 跳轉至來源頁或是首頁 + 消息提示
            // 2.4 失敗: 消息提示
            const { moblie, code } = form;
            data = await userMobileLogin({ moblie, code });
          } else {
            // **帳號登入
            // 1. 準備一個api做帳號登入
            // 2. 調用api函式
            // 3. 成功: 儲存用戶訊息 + 跳轉至來源頁或是首頁 + 消息提示
            // 4. 失敗: 消息提示
            const { account, password } = form;
            data = await userAccountLogin({ account, password });
          }
          // 儲存用戶訊息
          const { id, account, avatar, mobile, nickname, token } = data.result;
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token });
          store.dispatch('cart/mergeCart').then(() => {
            // 進行跳轉
            router.push(route.query.redirectUrl || '/');
            // 成功消息提示
            Message({ type: 'success', text: '登入成功! ' });
          });
        } catch (err) {
          if (err.response.data) {
            Message({ type: 'error', text: err.response.data.message || '登入失敗! ' });
          }
        }
      }
    };

    // pause 暫停 resume 開始
    // useIntervalFn(callback,執行間隔,是否立即開啟)
    const timer = ref(0);
    const { pause, resume } = useIntervalFn(
      () => {
        timer.value--;
        if (timer.value <= 0) {
          pause();
        }
      },
      1000,
      false
    );
    onUnmounted(() => {
      pause();
    });

    // 1. 發送驗證碼
    // 1.1 綁定發送驗證碼按鈕點擊事件
    // 1.2 校驗手機號碼, 如果成功才去發送簡訊 (定義api), 請求成功後開啟60s倒計時, 不能再次點擊, 倒計時結束恢復
    // 1.3 如果失敗, 失敗的校驗樣式顯示出來
    const send = async () => {
      const valid = mySchema.mobile(form.mobile);
      if (valid === true) {
        // 通過
        if (timer.value === 0) {
          // 沒有倒計時才可以發送
          await userMobileLoginMsg(form.moblie);
          Message({ type: 'success', text: '發送成功! ' });
          timer.value = 60;
          resume();
        }
      } else {
        // 失敗, 使用vee的錯誤函式顯示錯誤訊息 setFieldError(字段,錯誤訊息)
        formRef.value.setFieldError('mobile', valid);
      }
    };

    return { isMsgLogin, form, schema: mySchema, formRef, login, send, timer };
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
