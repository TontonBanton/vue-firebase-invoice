import { ref } from 'vue'

export function useScreenCheck(widthThreshold = 750) {
  const isMobile = ref(false);
  const checkScreen = () => isMobile.value = window.innerWidth <= widthThreshold;

  return { isMobile, checkScreen };
}
