// 提供複用邏輯的函式(鉤子)
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/**
 * 資料懶加載函式
 * @param {Element} target - DOM物件
 * @param {Function} apiFn - API函式
 */
export const useLazyData = (apiFn) => {
  const result = ref([])
  const target = ref(null)
  // stop 停止觀察
  const { stop } = useIntersectionObserver(
    // target 監聽的目標元素
    target,
    ([{ isIntersecting }]) => {
      // isIntersecting是否進入可視區
      if (isIntersecting) {
        stop()
        // 調用api函式獲取資料
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置選項, 相交比例 > 0 就觸發
    {
      threshold: 0
    }
  )
  return { result, target }
}