<script setup>
import { useUtilities } from '@/composables/useUtilities'
const { formatCurrency} = useUtilities();

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
      <div v-for="(item, index) in currentItems.invoiceItemList" :key="index" class="item flex">
        <p>{{ item.itemName }}</p>
        <p>{{ item.qty }}</p>
        <p>{{ formatCurrency(item.price) }}</p>
        <p>{{ formatCurrency(item.total) }}</p>
      </div>
    </div>
    <div class="total flex orange">
      <p>Amount Due</p>
      <p>{{ formatCurrency(currentItems.invoiceTotal) }}</p>
    </div>
  </div>
</template>