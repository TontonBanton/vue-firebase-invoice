<script setup>
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

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
    p { text-align: center;}
    .actions {
      margin-top: 24px;
      button { flex: 1; }
    }
  }
}
</style>