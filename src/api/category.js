// 定義分類相關的API接口函式
import request from "@/utils/request";

// 獲取所有分類(頂級, 二級, 對應商品推薦資料)
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}