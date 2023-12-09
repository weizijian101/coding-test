import { ref, onMounted, onUnmounted } from 'vue';

const useScreenSize = () => {
  // 定义一个响应式引用，用于存储屏幕尺寸状态
  const isSmallScreen = ref(false);

  // 定义检测屏幕变化的函数
  function checkScreenSize() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    isSmallScreen.value = mediaQuery.matches;
  }

  // 添加事件监听器
  function onScreenSizeChange(e) {
    isSmallScreen.value = e.matches;
  }

  onMounted(() => {
    // 首次检查
    checkScreenSize();
    window.matchMedia('(max-width: 768px)').addEventListener('change', onScreenSizeChange);
  });

  onUnmounted(() => {
    window.matchMedia('(max-width: 768px)').removeEventListener('change', onScreenSizeChange);
  });

  // 返回屏幕尺寸状态
  return { isSmallScreen };
};

export default useScreenSize;
