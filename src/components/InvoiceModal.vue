<script setup>
import '@/styles/components/InvoiceModalStyle.scss'
import Loading from '@/components/Loading.vue'
import { onMounted, watch, ref, computed } from 'vue'
import db from '@/firebase/firebaseinit'
import { doc, updateDoc } from 'firebase/firestore'

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute()
const store = useStore();
const editInvoice = computed(() => store.state.editInvoice);
const currentInvoiceArray = computed(() => store.state.currentInvoiceArray);

import { useInvoiceForm } from '@/composables/useInvoiceForm'
const { form, populateForm, addNewInvoiceItem, deleteInvoiceItem, calculateInvoiceTotal } = useInvoiceForm();
import { useInvoiceActions } from '@/composables/useInvoiceActions';
const { uploadInvoice } = useInvoiceActions();

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

  watch(() => form.paymentTerms, (termsSelect) => {
  if (termsSelect !== undefined && termsSelect !== null) {
    const futureDate = new Date();
    form.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(termsSelect));
    form.paymentDueDate = new Date(form.paymentDueDateUnix).toLocaleDateString("en-us", dateOptions.value);
  }
  });

  const updateInvoice = async () => {
    if (form.invoiceItemList.length <= 0) {
      alert('Please enter required data');
      return;
    }
    loading.value = true;
    calculateInvoiceTotal();
    // FIREBASE UPDATE
    const invoiceRef = doc(db, 'invoices', form.docId); // Reference to the invoice document
    try {
      await updateDoc(invoiceRef, {
        billerStreetAddress: billerStreetAddress.value,
        billerCity: billerCity.value,
        billerZipCode: billerZipCode.value,
        billerCountry: billerCountry.value,
        clientName: clientName.value,
        clientEmail: clientEmail.value,
        clientStreetAddress: clientStreetAddress.value,
        clientCity: clientCity.value,
        clientZipCode: clientZipCode.value,
        clientCountry: clientCountry.value,
        paymentTerms: paymentTerms.value,
        paymentDueDate: paymentDueDate.value,
        paymentDueDateUnix: paymentDueDateUnix.value,
        productDescription: productDescription.value,
        invoiceItemList: invoiceItemList.value,
        invoiceTotal: invoiceTotal.value,
      })
      console.log('Invoice successfully updated!');
    } catch (error) {
      console.error('Error updating invoice: ', error.message || error);
    }
    const data = {
        docId: docId.value,
        routeId: route.params.invoiceId,
    }
    store.dispatch('UPDATE_INVOICE', data); // Update Vuex store
    loading.value = false;
    //alert('temporary reload fetch the db from fbase')
    window.location.reload()           //Temporay reload solution
}

  //For click on invoiceWrap main container show modal
  const invoiceWrap = ref(null)
  const checkClick = (e)=> {
    if (e.target === invoiceWrap.value) {
      store.commit('TOGGLE_MODAL');
    }
  }

  const submitForm = () => {
  if (editInvoice.value) {
    updateInvoice(); // Update existing invoice
  } else {
    loading.value = true;
    calculateInvoiceTotal();
    uploadInvoice(form); // Create new invoice
    loading.value = false;
    store.commit('TOGGLE_INVOICE');
    store.dispatch('GET_INVOICES'); // Fetch the updated list of invoices after uploading
  }};

  const saveDraft = ()=> form.invoiceDraft = true
  const publishInvoice = ()=>  form.invoicePending = true
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

      <!-- Bill From -->
      <div class="bill-from flex flex-column">
        <h4 class>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input required type="text" id="billerStreetAddress" v-model="form.billerStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="form.billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="form.billerZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="form.billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="form.clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="form.clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="form.clientStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="form.clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="form.clientZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="form.clientCountry" />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="form.invoiceDate" />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="form.paymentDueDate" />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select require id="paymentTerms" v-model="form.paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="form.productDescription" />
        </div>
        <div class="work-items">
          <h4>Item List</h4>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr class="table-items flex" v-for="(item, index) in form.invoiceItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.itemName" /></td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total flex">${{ (item.total = item.qty * item.price) }}</td>
              <img @click="deleteInvoiceItem(item.id)" src="@/assets/x-icon.png" alt="" />
            </tr>
          </table>
          <div @click="addNewInvoiceItem" class="flex button" style="color: orange">
            <!-- <img src="@/assets/plus-icon.png" alt="" style="width: 30px; height:30px"/> -->
            Add New Item
          </div>
        </div>
      </div>

       <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeInvoice" class="orange">Cancel</button>
        </div>
        <div class="right flex">
          <button v-if="!store.state.editInvoice" type="submit" @click="saveDraft" class="orange">Save Draft</button>
          <button v-if="!store.state.editInvoice" type="submit" @click="publishInvoice" class="orange">Create Invoice</button>
          <button v-if="store.state.editInvoice" type="submit" class="orange">Update Invoice</button>
        </div>
      </div>

  </form>
</div>
</template>
