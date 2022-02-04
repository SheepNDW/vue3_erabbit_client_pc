// 小兔鮮常量資料

// 默認9個頂級分類
export const topCategory = [
  '居家',
  '美食',
  '服飾',
  '育兒',
  '個護',
  '嚴選',
  '數位',
  '運動',
  '雜貨'
]

// 訂單狀態
export const orderStatus = [
  { name: 'all', label: '全部訂單' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待發貨' },
  { name: 'receive', label: '待收貨' },
  { name: 'comment', label: '待評價' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]


export const cancelReason = [
  '配送信息有誤',
  '商品買錯了',
  '重複下單/誤下單',
  '忘記使用優惠券、兔幣等',
  '其他渠道價格更低',
  '不想買了'
]
