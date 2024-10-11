export function useFormatCurrency(value) {
    // Convert the value to a number if it's a string (item.price)
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (value !== null && value !== undefined) {
      return numericValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return "0.00";
}