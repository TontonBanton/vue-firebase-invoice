<script setup>
import '@/styles/AppStyle.scss'
import { onMounted, onUnmounted } from 'vue'
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue';
import Modal from './components/Modal.vue';
import { useScreenCheck } from '@/composables/useScreenCheck'

import { computed } from 'vue';
import { useStore } from 'vuex';
const { isMobile, checkScreen } = useScreenCheck(750);

const store = useStore();
const invoiceModal = computed(() => store.state.invoiceModal);
const modalActive = computed(() => store.state.modalActive);
const invoicesLoaded = computed(()=> store.state.invoicesLoaded)

const fetchInvoices = async () => {
  await store.dispatch('GET_INVOICES'); // Execute vuex action
};

onMounted(() => {
  checkScreen();
  fetchInvoices();                                  //Initial check
  window.addEventListener('resize', checkScreen);    //CheckScreen @ resize DOM event
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
});
</script>

<template>
  <div v-if="invoicesLoaded">
    <div v-if="!isMobile" class="app flex flex-column">
      <Navigation/>
      <div class="app-content flex flex-column">
        <Modal v-if="modalActive"/>
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
        <router-view />
      </div>
    </div>
    <div v-else class="mobile-message flex flex-column">
      <h2>Mobile not yet supported</h2>
    </div>
  </div>
</template>
