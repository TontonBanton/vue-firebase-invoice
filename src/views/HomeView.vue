<script setup>
import '@/styles/HomeViewStyle.scss'
import Invoice from '@/components/Invoice.vue'
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const invoiceData= computed(() => store.state.invoiceData);

const newInvoice = () => {
  store.commit('TOGGLE_INVOICE');    //Excecute store mutation
};

const filterMenu = ref(null)
const filteredInvoice = ref(null)

const toggleFilterMenu = ()=> {
  filterMenu.value = !filterMenu.value
}
const filteredInvoices = (e)=> {
  if (e.target.innerText === 'Clear Filter') {
    filteredInvoice.value = null
    return
  }
  filteredInvoice.value = e.target.innerText
}

const filteredData= computed(() => {
  return invoiceData.value.filter((invoice) => {    //Filter invoiceData
    if (filteredInvoice === 'Draft') {              //Test for draft
      return invoice.invoiceDraft === true          //Return invoice/invoices w/ invoiceDraft=true
    }
    if (filteredInvoice.value === 'Pending') {
      return invoice.invoicePending === true;
    }
    if (filteredInvoice.value === 'Paid') {
      return invoice.invoicePaid === true;
    }
    return invoice                                  //Return all invoice if no match
  })

});
</script>

<template>
  <div class="home container">
    <div class="header flex">
      <!--Right-->
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status: <span> : {{ filteredInvoice }}</span> </span>
          <img src="@/assets/arrow-down.png" alt="" />
          <ul v-show="filterMenu" class="filter-menu orange">
            <li @click="filteredInvoices">Draft</li>
            <li @click="filteredInvoices">Pending</li>
            <li @click="filteredInvoices">Paid</li>
            <li @click="filteredInvoices">Clear Filter</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex orange">
          <div class="inner-button flex"><img src="@/assets/plus-icon.png" alt="" /></div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>
    <!--Loop invoiceData Load and load on Invoice Component-->
    <div v-if="invoiceData.length > 0">
      <!-- <Invoice v-for="(invoice, index) in invoiceData" :invoice="invoice" :key="index"/> -->
      <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index"/>
    </div>
    <!--No Invoice Data-->
    <div v-else class="empty flex flex-column">
      <img src="@/assets/no-data1.png" alt="">
      <h3>No Invoices Data</h3>
      <p>Click the New Invoice button above to create one</p>
    </div>
  </div>
</template>
