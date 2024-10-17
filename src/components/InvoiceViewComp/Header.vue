<script setup>
  import store from '@/store';
  import { useRouter } from 'vue-router';
  import { useStoreActions } from '@/composables/useStoreActions';

  const router = useRouter()
  const { updateStatusPaid, updateStatusPending } = useStoreActions()

  const props = defineProps({
    currentInvoice: Object
  });

  const toggleEditInvoice = ()=> {
    store.commit('TOGGLE_EDIT_INVOICE');
    store.commit('TOGGLE_INVOICE');
  }

  const deleteInvoice = async (docId) => {
    await store.dispatch('DELETE_INVOICE', docId);
    router.push({ name: "Home" })
    store.dispatch('GET_INVOICES');
  }
</script>

<template>
  <div class="header flex">
    <div class="left flex">
      <span>Status</span>
      <div class="status-button flex"
        :class="{
          paid: currentInvoice.invoicePaid,
          draft: currentInvoice.invoiceDraft,
          pending: currentInvoice.invoicePending
        }">
        <span v-if="currentInvoice.invoicePaid">Paid</span>
        <span v-if="currentInvoice.invoiceDraft">Draft</span>
        <span v-if="currentInvoice.invoicePending">Pending</span>
      </div>
    </div>

    <div class="right flex">
      <button @click="toggleEditInvoice" class="orange">Edit</button>
      <button @click="deleteInvoice(currentInvoice.docId)" class="orange">Delete</button>
      <button v-if="currentInvoice.invoicePending"
        @click="updateStatusPaid(currentInvoice.docId)" class="orange">Mark as Paid
      </button>
      <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
        @click="updateStatusPending(currentInvoice.docId)" class="orange">Mark as Pending
      </button>
    </div>
  </div>
</template>

