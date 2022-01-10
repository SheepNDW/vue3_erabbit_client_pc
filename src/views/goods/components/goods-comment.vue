<template>
  <div class="goods-comment">
    <!-- 評價頭部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人購買</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好評率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在說 :</div>
        <div class="dd">
          <a
            v-for="(item, i) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="{ active: currentTagIndex === i }"
            @click="changeTag(i)"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort" v-if="commentInfo">
      <span>排序 : </span>
      <a
        @click="changeSort(null)"
        :class="{ active: reqParams.sortField === null }"
        href="javascript:;"
        >默認</a
      >
      <a
        @click="changeSort('createTime')"
        :class="{ active: reqParams.sortField === 'createTime' }"
        href="javascript:;"
        >最新</a
      >
      <a
        @click="changeSort('praiseCount')"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        href="javascript:;"
        >最熱</a
      >
    </div>
    <!-- 評價列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + 's'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5 - item.score" :key="i + 'k'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 評論圖片元件 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分頁元件 -->
    <XtxPagination
      v-if="total"
      @current-change="changePagerFn"
      :total="total"
      :page-size="reqParams.pageSize"
      :current-page="reqParams.page"
    />
  </div>
</template>
<script>
import { inject, reactive, ref, watch } from 'vue';
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product';
import GoodsCommentImage from './goods-comment-image.vue';
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup() {
    // 獲取評價資訊
    const commentInfo = ref(null);
    const goods = inject('goods');
    findGoodsCommentInfo(goods.value.id).then(data => {
      data.result.tags.unshift({
        title: '有照片',
        tagCount: data.result.hasPictureCount,
        type: 'img',
      });
      data.result.tags.unshift({
        title: '全部評價',
        tagCount: data.result.evaluateCount,
        type: 'all',
      });
      // 設置資料之前, 在tags陣列前追加 有照片tag 全部評價tag
      commentInfo.value = data.result;
    });

    // 紀錄當前及觸發tags索引值
    const currentTagIndex = ref(0);
    const changeTag = i => {
      currentTagIndex.value = i;
      // 點擊tag時, 修改篩選條件
      const tag = commentInfo.value.tags[i];
      // 情況1: 全部評價
      // 情況2: 有照片
      // 情況3: 正常tag
      if (tag.type === 'all') {
        reqParams.hasPicture = null;
        reqParams.tag = null;
      } else if (tag.type === 'img') {
        reqParams.hasPicture = true;
        reqParams.tag = null;
      } else {
        reqParams.hasPicture = null;
        reqParams.tag = tag.title;
      }
      // 頁碼重置成1
      reqParams.page = 1;
    };

    // 點擊排序
    const changeSort = sortField => {
      reqParams.sortField = sortField;
      // 頁碼重置成1
      reqParams.page = 1;
    };

    // 準備篩選條件資料
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      // 排序方式: praiseCount 熱度, createTime 最新
      sortField: null,
    });

    // 初始化需要發請求並且篩選條件發生改變也要發請求
    const commentList = ref([]);
    const total = ref(0);
    watch(
      reqParams,
      () => {
        findGoodsCommentList(goods.value.id, reqParams).then(data => {
          commentList.value = data.result.items;
          total.value = data.result.counts;
        });
      },
      { immediate: true }
    );

    // 定義轉換資料的函式
    const formatSpecs = specs => {
      return specs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, '').trim();
    };
    const formatNickname = nickname => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1);
    };

    // 實現分頁切換
    const changePagerFn = newPage => {
      reqParams.page = newPage;
    };

    return {
      commentInfo,
      currentTagIndex,
      changeTag,
      reqParams,
      commentList,
      changeSort,
      formatSpecs,
      formatNickname,
      total,
      changePagerFn,
    };
  },
};
</script>

<style lang="scss" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: $priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: $xtxColor;
            background: lighten($xtxColor, 50%);
            color: $xtxColor;
          }
          &.active {
            border-color: $xtxColor;
            background: $xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: $xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
