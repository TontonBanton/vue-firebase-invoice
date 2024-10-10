<script setup>
import '@/styles/components/ModalStyle.scss'
import { useStore } from 'vuex'
const store = useStore();

const closeModal = ()=> {
  store.commit('TOGGLE_MODAL');
}
const closeInvoice = ()=> {
  //Change states mutation
  store.commit('TOGGLE_INVOICE');
  store.commit('TOGGLE_MODAL');
  if (store.state.editInvoice === true ) {
    store.commit('TOGGLE_EDIT_INVOICE')
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <p>Are you sure you want to exit, changes will not be saved?</p>
      <div class="actions flex">
        <button @click="closeModal" class="orange">Return</button>
        <button @click="closeInvoice" class="orange">Close</button>
      </div>
    </div>
  </div>
</template>
