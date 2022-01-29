// 提供複用邏輯的函式(鉤子)
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs';

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

/**
 * 支付倒計時函式
 */
export const usePayTime = () => {
  // 倒計時邏輯
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
      if (time.value <= 0) pause()
    },
    1000,
    false
  );
  onUnmounted(() => {
    pause()
  })

  // 開啟定時器 countdown - 倒計時時間
  const start = (countdown) => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }

  return {
    start,
    timeText
  }
}