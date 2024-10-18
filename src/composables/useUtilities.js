import { ref } from 'vue';

export function useUtilities(widthThreshold = 750) {
  // Format Currency
  const formatCurrency = (value) => {
    // Convert the value to a number if it's a string
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (value !== null && value !== undefined) {
      return numericValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return "0.00";
  };

  const isMobile = ref(false);
  const checkScreen=() => {
    isMobile.value = window.innerWidth <= widthThreshold;
  };

  return {
    formatCurrency,
    isMobile,
    checkScreen
  };
}
