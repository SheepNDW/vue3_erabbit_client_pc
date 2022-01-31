import request from '@/utils/request'

/**
 * 獲取收藏分頁資料
 * @param {Integer} collectType - 收藏類型, 1為商品 2為專題 3為品牌
 * @returns 
 */
export const findCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}