<script setup>
import '@/styles/InvoiceViewStyle.scss'
import InvoiceHeader from '@/components/InvoiceViewComp/Header.vue'
import InvoiceDetails from '@/components/InvoiceViewComp/InvoiceDetails.vue'
import InvoiceItems from '@/components/InvoiceViewComp/InvoiceItems.vue';
import { ref, computed, onMounted } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute()
const routeInvId =  route.params.invoiceId

import { useStore } from 'vuex';
const store = useStore();
const currentInvoiceArray= computed(() => store.state.currentInvoiceArray);

const currentInvoice = ref(null); // Define currentInvoice as a ref

onMounted(()=> {
  getCurrentInvoice()
  console.log(currentInvoice.value)
})

const getCurrentInvoice = ()=> {
  store.commit('SET_CURRENT_INVOICE', routeInvId)
  currentInvoice.value = currentInvoiceArray.value[0] || null;
}

</script>

<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link to="/" style="color:white;">
      <img src="@/assets/left-arrow.png" alt="" style="width: 15px; height: 15px" /> Back to List
    </router-link>
    <InvoiceHeader :currentInvoice="currentInvoice"/>

    <div class="invoice-details flex flex-column">
      <InvoiceDetails :currentInvoice="currentInvoice" />
      <InvoiceItems :currentItems="currentInvoice" />
    </div>
  </div>
</template>
