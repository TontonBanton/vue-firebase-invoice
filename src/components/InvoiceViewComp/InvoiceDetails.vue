<script setup>
const props = defineProps({
  currentInvoice: Object
});
</script>

<template>
<div class="invoice-details flex flex-column">
  <div class="top flex" >
    <div class="left flex flex-column">
      <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
      <p>{{ currentInvoice.productDescription }}</p>
    </div>
    <div class="right flex flex-column">
      <p>{{ currentInvoice.billerStreetAddress }}</p>
      <p>{{ currentInvoice.billerCity }}</p>
      <p>{{ currentInvoice.billerZipCode }}</p>
      <p>{{ currentInvoice.billerCountry }}</p>
    </div>
  </div>
  <div class="middle flex" >
    <div class="payment flex flex-column">
      <h4>Invoice Date</h4>
      <p>{{ currentInvoice.invoiceDate }}</p>
      <h4>Payment Date</h4>
      <p>{{ currentInvoice.paymentDueDate }}</p>
    </div>
    <div class="bill flex flex-column">
      <h4>Bill To</h4>
      <p>{{ currentInvoice.clientName }}</p>
      <p>{{ currentInvoice.clientStreetAddress }}</p>
      <p>{{ currentInvoice.clientCity }}</p>
      <p>{{ currentInvoice.clientZipCode }}</p>
      <p>{{ currentInvoice.clientCountry }}</p>
    </div>
    <div class="send-to flex flex-column">
      <h4>Sent To</h4>
      <p>{{ currentInvoice.clientEmail }}</p>
    </div>
  </div>
</div>
</template>