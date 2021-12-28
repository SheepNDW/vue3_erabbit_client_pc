<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">請選擇配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currList"
          :key="item.code"
        >
          {{ item.name }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    // 顯示與隱藏資料
    const visible = ref(false);

    // 所有的省市區資料
    const allCityData = ref([]);
    // 是否正在載入資料
    const loading = ref(false);

    // 提供打開和關閉函式
    const open = () => {
      visible.value = true;
      // 獲取城市資料
      loading.value = true;
      getCityData().then(data => {
        allCityData.value = data;
        loading.value = false;
      });
      // 清空之前選擇
      for (const key in changeResult) {
        changeResult[key] = '';
      }
    };
    const close = () => {
      visible.value = false;
    };
    // 提供一個切換函式給select使用
    const toggle = () => {
      visible.value ? close() : open();
    };
    // 實現點擊元件外部元件進行關閉操作
    const target = ref(null);
    onClickOutside(target, () => {
      // 參數1: 監聽哪個元素
      // 參數2: 點擊了該元素外的其他地方觸發的函式
      close();
    });

    // 計算屬性: 獲取當前顯示的地區陣列
    const currList = computed(() => {
      // 默認省一級
      let list = allCityData.value;
      // 可能: 市一級
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find(p => p.code === changeResult.provinceCode).areaList;
      }
      // 可能: 縣地區一級
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find(c => c.code === changeResult.cityCode).areaList;
      }
      return list;
    });

    // 定義選擇的 省市區 資料
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: '',
    });
    // 當點擊按鈕的時候紀錄
    const changeItem = item => {
      if (item.level === 0) {
        // 省
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      }
      if (item.level === 1) {
        // 市
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      }
      if (item.level === 2) {
        // 區
        changeResult.countyCode = item.code;
        changeResult.countyName = item.name;
        // 完整路徑
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
        // 這是最後一級, 選完了, 關閉對話框, 通知父元件資料
        close();
        emit('change', changeResult);
      }
    };

    return { visible, toggle, target, loading, currList, changeItem };
  },
};
// 獲取省市區資料的函式
const getCityData = () => {
  // 資料: https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1. 當本地沒有緩存, 發請求獲取資料
  // 2. 當本地有緩存, 取出本地資料
  // 返回一個Promise在then獲取資料, 這裡可能是非同步 可能是同步
  return new Promise(resolve => {
    // 約定: 資料存在window上的cityData字段
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      const url =
        'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json';
      axios.get(url).then(res => {
        // 緩存
        window.cityData = res.data;
        resolve(res.data);
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
