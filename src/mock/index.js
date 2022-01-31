import Mock from 'mockjs'
import qs from 'qs'

// 基本配置
Mock.setup({
  // 隨機延遲500-1000毫秒, 模擬網路延遲
  timeout: '500-1000'
})

// 攔截接口 /my/test
// 1. 接口地址路徑規則, 需要匹配到它
// 2. 請求方式
// 3. 返回資料(函式返回資料)
Mock.mock(/\/my\/test/, 'get', () => {
  // 隨機資料邏輯 目標: 5筆資料 [{id:'', name:''},...]
  const arr = []
  for (let i = 0; i < 5; i++) {
    // arr.push(Mock.mock('@id'))
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname'
    }))
  }
  return { msg: '獲取資料成功', result: arr }
})

// 模擬我的收藏
Mock.mock(/\/member\/collect/, 'get', (config) => {
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }
  return {
    msg: '獲取模擬收藏商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items: items
    }
  }
})