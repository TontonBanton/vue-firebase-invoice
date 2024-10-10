<script setup>
import '@/styles/AppStyle.scss'
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue';
import Modal from './components/Modal.vue';

import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
//Vuex Store States
const invoiceModal = computed(() => store.state.invoiceModal);
const modalActive = computed(() => store.state.modalActive);
const invoicesLoaded = computed(()=> store.state.invoicesLoaded)

const mobile = ref(null)
const checkScreen = ()=> {
  const windowWidth = window.innerWidth
  mobile.value = windowWidth <= 750 ? true : false;
}

const fetchInvoices = async () => {
  await store.dispatch('GET_INVOICES');       //Execute vuex action
};

onMounted(()=> {
  fetchInvoices()
  checkScreen()
  window.addEventListener("resize", checkScreen)
})
onUnmounted(() => {
  window.removeEventListener("resize", checkScreen)
})

</script>


<template>
  <div v-if="invoicesLoaded">
    <div v-if="!mobile" class="app flex flex-column">
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
