<script setup>
import '@/styles/AppStyle.scss'
import { onMounted, onUnmounted } from 'vue'
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue';
import CloseModal from './components/CloseModal.vue';
import { useUtilities } from '@/composables/useUtilities'

import { computed } from 'vue';
import { useStore } from 'vuex';
const { isMobile, checkScreen } = useUtilities();

const store = useStore();
const invoiceModal = computed(() => store.state.invoiceModal);
const modalActive = computed(() => store.state.modalActive);
const invoicesLoaded = computed(()=> store.state.invoicesLoaded)

const fetchInvoices = async () => {
  await store.dispatch('GET_INVOICES'); // Execute vuex action
};

onMounted(() => {
  checkScreen();
  fetchInvoices();
  window.addEventListener('resize', checkScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
});
</script>

<template>
  <div v-if="invoicesLoaded"> <!--Toggle after all SET_INVOICE_DATA is finished -->

    <!--isMobile=True-->
    <div v-if="!isMobile" class="app flex flex-column">
      <Navigation/>
      <div class="app-content flex flex-column">
        <CloseModal v-if="modalActive"/>
        <transition name="invoice"> <InvoiceModal v-if="invoiceModal" />  </transition>
        <router-view />
      </div>
    </div>
     <!--isMobile=False-->
    <div v-else class="mobile-message flex flex-column">
      <h2>Mobile not yet supported</h2>
    </div>

  </div>
</template>

<style>
/* Vue transition */
.invoice-enter-active, .invoice-leave-active {
  transition: 0.8s ease all;
}
.invoice-enter-from, .invoice-leave-to {
  transform: translateX(-700px);
}
</style>