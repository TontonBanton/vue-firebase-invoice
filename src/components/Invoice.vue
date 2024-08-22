<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  invoice: Object
})
</script>

<template>
  <router-link class="invoice flex" style="color: white;"
  :to="{ name: 'Invoice', params: {invoiceId: invoice.invoiceId} } " >
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">${{ invoice.invoiceTotal }}</span>
      <div class="status-button flex"
        :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending}">
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/right-arrow.png" alt="" style="width: 15px; height: 15px" />
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #21232e;
  align-items: center;
  span {font-size: 13px}

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
    span {flex: 1;}
    .tracking-number {text-transform: uppercase;}
  }
  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>