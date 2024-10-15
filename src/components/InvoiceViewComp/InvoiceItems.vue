<script setup>
import { useFormatCurrency } from '@/composables/useFormatCurrency';

const props = defineProps({
  currentItems: Object
})


</script>

<template>
  <div class="bottom flex flex-column">
    <div class="billing-items">
      <div class="heading flex">
        <p>Item Name</p>
        <p>QTY</p>
        <p>Price</p>
        <p>Total</p>
      </div>
      <!--Loop the items-->
      <div v-for="(item, index) in currentItems" :key="index" class="item flex">
        <p>{{ item.itemName }}</p>
        <p>{{ item.qty }}</p>
        <p>{{ useFormatCurrency(item.price) }}</p>
        <p>{{ useFormatCurrency(item.total) }}</p>
      </div>
    </div>
    <div class="total flex orange">
      <p>Amount Due</p>
      <p>{{ useFormatCurrency(currentItems.invoiceTotal) }}</p>
    </div>
  </div>
</template>