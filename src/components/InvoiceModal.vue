<script setup>
import '@/styles/components/InvoiceModalStyle.scss'
import Loading from '@/components/Loading.vue'
import BillFromTo from './ModalFormComp/BillFromTo.vue';
import WorkDetails from './ModalFormComp/WorkDetails.vue';
import { onMounted, watch, ref, computed } from 'vue'

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute()
const store = useStore();
const routeInvId =  route.params.invoiceId
const editInvoice = computed(() => store.state.editInvoice);
const currentInvoiceArray = computed(() => store.state.currentInvoiceArray);

import { useInvoiceForm } from '@/composables/useInvoiceForm'
import { useInvoiceActions } from '@/composables/useInvoiceActions';
const { form, populateForm, calculateInvoiceTotal } = useInvoiceForm();
const { uploadInvoice, updateInvoice } = useInvoiceActions();

const loading = ref(null);
const dateOptions = ref({ year: "numeric", month: "short", day: "numeric" });

onMounted(() => {
  if (!editInvoice.value) {
    form.invoiceDateUnix = Date.now();
    form.invoiceDate= new Date(form.invoiceDateUnix).toLocaleDateString('en-us', dateOptions.value)
  } else {
    const currentInvoice = currentInvoiceArray.value[0];
    populateForm(currentInvoice);
  }
});

  const submitForm = () => {
    loading.value = true;
    calculateInvoiceTotal();
    if (editInvoice.value) {
      updateInvoice(form);
      store.dispatch('UPDATE_INVOICE', { docId: form.docId, routeId: route.params.invoiceId });
      store.commit('TOGGLE_EDIT_INVOICE');
      store.commit('SET_CURRENT_INVOICE', routeInvId)
    } else {
      uploadInvoice(form);
      store.commit('TOGGLE_INVOICE');
      store.dispatch('GET_INVOICES');
    }
    loading.value = false;
  };

  watch(() => form.paymentTerms, (termsSelect) => {
  if (termsSelect !== undefined && termsSelect !== null) {
    const futureDate = new Date();
    form.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(termsSelect));
    form.paymentDueDate = new Date(form.paymentDueDateUnix).toLocaleDateString("en-us", dateOptions.value);
  }
  });

  const invoiceWrap = ref(null)
  const checkClick = (e)=> {
    if (e.target === invoiceWrap.value) {
      store.commit('TOGGLE_MODAL');
    }
  }

  const draftInvoice = ()=> form.invoiceDraft = true
  const pendInvoice = ()=>  form.invoicePending = true
  const closeInvoice = ()=> {
    store.commit('TOGGLE_INVOICE');
    if (store.state.editInvoice === true ) {
      store.commit('TOGGLE_EDIT_INVOICE')
    }
  };
</script>

<template>
<div @click="checkClick" class="invoice-wrap flex flex-column" ref="invoiceWrap">

  <form @submit.prevent="submitForm" class="invoice-content">
    <Loading v-show="loading"/>
    <h1 v-if="!store.state.editInvoice">New Invoice</h1>
    <h1 v-else>Edit Invoice</h1>
      <BillFromTo :form="form"/>
      <WorkDetails :form="form"/>
       <!-- Bottom Buttons-->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeInvoice" class="orange">Cancel</button>
        </div>
        <div class="right flex">
          <button v-if="!store.state.editInvoice" type="submit" @click="draftInvoice" class="orange">Save Draft</button>
          <button v-if="!store.state.editInvoice" type="submit" @click="pendInvoice" class="orange">Create Invoice</button>
          <button v-if="store.state.editInvoice" type="submit" class="orange">Update Invoice</button>
        </div>
      </div>
  </form>

</div>
</template>
