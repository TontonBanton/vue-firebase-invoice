<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const invoiceId = ref(null)
const currentInvoice = ref([]); // Define currentInvoice as a ref
const route = useRoute()
const store = useStore();
const currentInvoiceArray= computed(() => store.state.currentInvoiceArray);

const getCurrentInvoice = ()=> {
  invoiceId.value = route.params.invoiceId
  store.commit('SET_CURRENT_INVOICE', invoiceId.value)
  currentInvoice.value = currentInvoiceArray.value[0] || null;
}

onMounted(()=> {
  getCurrentInvoice()
  console.log(invoiceId.value)
})
</script>

<template>
  <div>{{  currentInvoice }}</div>
</template>

<style>
</style>