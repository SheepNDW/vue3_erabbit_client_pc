<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-else
          >
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set';
const spliter = '★';
// 得到一個路徑字典物件
const getPathMap = skus => {
  // 1. 得到所有的sku集合 props.goods.skus
  // 2. 從所有的sku中篩選出有效的sku
  // 3. 根據有效的sku使用power-set算法得到子集
  // 4. 根據子集往路徑字典物件中存入 key-value
  const pathMap = {};
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 計算當前有庫存的sku子集
      // 例如: [1,2,3] ==> [[1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
      // 可選值陣列
      const valueArr = sku.specs.map(val => val.valueName);
      // 可選值陣列 子集
      const valueArrPowerSet = powerSet(valueArr);
      // 遍歷子集, 往pathMap中插入資料
      valueArrPowerSet.forEach(arr => {
        // 根據arr得到字符串的key, 約定key是: ['藍色', '美國'] ==> '藍色★美國'
        const key = arr.join(spliter);
        // 給pathMap設定資料
        if (pathMap[key]) {
          pathMap[key].push(sku.id);
        } else {
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};
const getSelectedValues = specs => {
  const arr = [];
  specs.forEach(item => {
    // 選中的按鈕
    const selectedVal = item.values.find(val => val.selected);
    arr.push(selectedVal ? selectedVal.name : undefined);
  });
  return arr;
};
// 更新按鈕禁用狀態
const updateDisabledStatus = (specs, pathMap) => {
  // 1. 約定每一個按鈕的狀態由本身的disabled資料來控制
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs);
    item.values.forEach(val => {
      // 2. 判斷當前是否選中, 是選中不用判斷
      if (val.selected) return;
      // 3. 拿當前的值按照順序套入選中的陣列
      selectedValues[i] = val.name;
      // 4. 剔除 undefined 資料, 按照分隔符拼接key
      const key = selectedValues.filter(value => value).join(spliter);
      // 5. 拿著key去路徑字典中查找是否有資料, 有可以點擊, 沒有就禁用(true)
      val.disabled = !pathMap[key];
    });
  });
};

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const pathMap = getPathMap(props.goods.skus);
    // ☆元件初始化: 更新按鈕禁用狀態
    updateDisabledStatus(props.goods.specs, pathMap);
    // 1. 選中與取消選中, 約定在每一個按鈕都擁有自己的選中狀態資料: selected
    // 1.1 點擊的是已選中, 只需要取消當前的選中
    // 1.2 點擊的是未選中, 把同一個規格的按鈕改成為選中, 當前點擊的改成選中
    const changeSku = (item, val) => {
      // 當按鈕是禁用的 阻止程序運行
      if (val.disabled) return;
      // 如果不是禁用 正常運行
      if (val.selected) {
        val.selected = false;
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false;
        });
        val.selected = true;
      }
      // ☆點擊按鈕時: 更新按鈕禁用狀態
      updateDisabledStatus(props.goods.specs, pathMap);
    };

    return { changeSku };
  },
};
</script>

<style lang="scss" scoped>
@mixin sku-state-mixin() {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: $xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        @include sku-state-mixin();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        @include sku-state-mixin();
      }
    }
  }
}
</style>
