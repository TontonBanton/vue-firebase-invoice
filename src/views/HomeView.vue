<script setup>
import '@/styles/HomeViewStyle.scss'
import Invoice from '@/components/Invoice.vue'
import { ref, computed } from 'vue';

import { useStore } from 'vuex';
const store = useStore();
const invoiceData= computed(() => store.state.invoiceData);
const newInvoice = () => { store.commit('TOGGLE_INVOICE') };

const filterShow = ref(null)
const toggleFilterMenu = ()=> filterShow.value = !filterShow.value

const currentFilter = ref(null)
const setFilter = (e) => {
  const selectedFilter = e.target.innerText;   //Get the text in the <li>
  currentFilter.value = (selectedFilter === 'Clear' || selectedFilter === 'Draft') ? null : selectedFilter;
}

const filteredInvoices = computed(() => {
  if (!currentFilter.value) return invoiceData.value   // Clear and Draft - all invoices
    //For invoicePending=true InvoicePaid=true condition
    const statusFilter = `invoice${currentFilter.value}`;
    const matchInvoices = invoiceData.value.filter(invoice => invoice[statusFilter] === true );
  return matchInvoices;
});

</script>

<template>
  <div class="home container">
    <StatusHeader :invoice="currentInvoice"
      @edit="toggleEditInvoice" @delete="deleteInvoice"
      @markPaid="updateStatusPaid" @markPending="updateStatusPending"
    />

    <!--Loop invoiceData to INVOICE Component-->
    <div v-if="invoiceData.length > 0">
      <Invoice v-for="invoice in filteredInvoices" :invoice="invoice" :key="invoice.invoiceId"/>
    </div>

    <!--No Data-->
    <div v-else class="empty flex flex-column">
      <img src="@/assets/no-data1.png" alt="">
      <h3>No Invoices Data</h3>
      <p>Click the New Invoice button above to create one</p>
    </div>

  </div>
</template>
