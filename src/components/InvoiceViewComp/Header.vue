<script setup>
const props = defineProps({
  currentInvoice: Object
});

const emit = defineEmits(['edit', 'delete', 'markPaid', 'markPending']);
  const onEdit = () => emit('edit')
  const onDelete = (id) => emit('delete', id)
  const onMarkPaid = (id) => emit('markPaid', id)
  const onMarkPending = (id) => emit('markPending', id)
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
      <button @click="onEdit" class="orange">Edit</button>
      <button @click="onDelete(currentInvoice.docId)" class="orange">Delete</button>
      <button v-if="currentInvoice.invoicePending" @click="onMarkPaid(currentInvoice.docId)" class="orange">Mark as Paid</button>
      <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid" @click="onMarkPending(currentInvoice.docId)" class="orange">Mark as Pending</button>
    </div>
  </div>
</template>

