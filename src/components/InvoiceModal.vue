<script setup>
import Loading from '@/components/Loading.vue'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import db from '@/firebase/firebaseinit'
import { ref, computed ,onMounted, watch } from 'vue'
import { uid } from 'uid';

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute()
const store = useStore();

const editInvoice = computed(() => store.state.editInvoice);
const currentInvoiceArray = computed(() => store.state.currentInvoiceArray);

  const dateOptions = ref({ year: "numeric", month: "short", day: "numeric" });
  const docId = ref(null);
  const loading = ref(null);
  const billerStreetAddress = ref(null);
  const billerCity = ref(null);
  const billerZipCode = ref(null);
  const billerCountry = ref(null);
  const clientName = ref(null);
  const clientEmail = ref(null);
  const clientStreetAddress = ref(null);
  const clientCity = ref(null);
  const clientZipCode = ref(null);
  const clientCountry = ref(null);
  const invoiceDateUnix = ref(null);
  const invoiceDate = ref(null);
  const paymentTerms = ref(null);
  const paymentDueDateUnix = ref(null);
  const paymentDueDate = ref(null);
  const productDescription = ref(null);
  const invoicePending = ref(null);
  const invoiceDraft = ref(null);
  const invoiceItemList = ref([]);
  const invoiceTotal = ref(0);

  onMounted(() => {
  //For New Invoice
  if (!editInvoice.value) {
    invoiceDateUnix.value = Date.now();
    invoiceDate.value = new Date(invoiceDateUnix.value).toLocaleDateString('en-us', dateOptions.value);
  //For Edit Invoice
  } else {
    const currentInvoice = currentInvoiceArray.value[0];
    docId.value = currentInvoice.docId;
    billerStreetAddress.value = currentInvoice.billerStreetAddress;
    billerCity.value = currentInvoice.billerCity;
    billerZipCode.value = currentInvoice.billerZipCode;
    billerCountry.value = currentInvoice.billerCountry;
    clientName.value = currentInvoice.clientName;
    clientEmail.value = currentInvoice.clientEmail;
    clientStreetAddress.value = currentInvoice.clientStreetAddress;
    clientCity.value = currentInvoice.clientCity;
    clientZipCode.value = currentInvoice.clientZipCode;
    clientCountry.value = currentInvoice.clientCountry;
    invoiceDateUnix.value = currentInvoice.invoiceDateUnix;
    invoiceDate.value = currentInvoice.invoiceDate;
    paymentTerms.value = currentInvoice.paymentTerms;
    paymentDueDateUnix.value = currentInvoice.paymentDueDateUnix;
    paymentDueDate.value = currentInvoice.paymentDueDate;
    productDescription.value = currentInvoice.productDescription;
    invoicePending.value = currentInvoice.invoicePending;
    invoiceDraft.value = currentInvoice.invoiceDraft;
    invoiceItemList.value = currentInvoice.invoiceItemList;
    invoiceTotal.value = currentInvoice.invoiceTotal;
  }
  });

  watch(paymentTerms, (termsSelect) => {                                                                      //Watch change value in term option
    const futureDate = new Date();                                                                            //Get the initial current date
    paymentDueDateUnix.value = futureDate.setDate(futureDate.getDate() + parseInt(termsSelect));              //Get timestamp + terms
    paymentDueDate.value = new Date(paymentDueDateUnix.value).toLocaleDateString("en-us", dateOptions.value); //Format
    //console.log(paymentDueDateUnix.value, paymentDueDate.value)
  });

  const addNewInvoiceItem = ()=> {
    invoiceItemList.value.push({ id: uid(), itemName: "", qty: "", price: 0, total: 0 })
  }
  const deleteInvoiceItem = (xid)=> {
    invoiceItemList.value = invoiceItemList.value.filter(item => item.id !== xid )
  }
  const calInvoiceTotal = ()=> {
    invoiceTotal.value = 0
    invoiceItemList.value.forEach((item) => {
      invoiceTotal.value += item.total
    })
  }

  //Saving data on submit
  const submitForm = () => {
  if (editInvoice.value) {
    updateInvoice(); // Update existing invoice
  } else {
    uploadInvoice(); // Create new invoice
  }
}

  const uploadInvoice = async () => {
    if (invoiceItemList.value.length <= 0) {
      alert('Please enter required data');
      return;
    }
    loading.value = true
    calInvoiceTotal();

    //FIREBASE ADD
    const invoicesCollectionRef = collection(db, 'invoices');   // Get a reference to the "invoices" collection
    const newInvoiceRef = doc(invoicesCollectionRef);           // Create a new document in the "invoices" collection with a generated ID
    try {
      await setDoc(newInvoiceRef, {
        invoiceId: uid(6),
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
        invoiceDate: invoiceDate.value,
        invoiceDateUnix: invoiceDateUnix.value,
        paymentTerms: paymentTerms.value,
        paymentDueDate: paymentDueDate.value,
        paymentDueDateUnix: paymentDueDateUnix.value,
        productDescription: productDescription.value,
        invoiceItemList: invoiceItemList.value,
        invoiceTotal: invoiceTotal.value,
        invoicePending: invoicePending.value,
        invoiceDraft: invoiceDraft.value,
        invoicePaid: null,
      });
      console.log('Invoice successfully uploaded to server');
    } catch (error) {
      console.error('Error uploading invoice: ', error.message || error);
    }
    loading.value = false
    store.commit('TOGGLE_INVOICE');
    store.dispatch('GET_INVOICES');  //Fetch the updated list of invoices after uploading
  }

  const updateInvoice = async () => {
  if (invoiceItemList.value.length <= 0) {
    alert('Please enter required data');
    return;
  }
  loading.value = true;
  calInvoiceTotal();

  // FIREBASE UPDATE
  const invoiceRef = doc(db, 'invoices', docId.value); // Reference to the invoice document
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

  const saveDraft = ()=> invoiceDraft.value = true
  const publishInvoice = ()=>  invoicePending.value = true

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
          <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select require id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="productDescription" />
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
            <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
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

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar { display: none; }
  @media (min-width: 900px) { left: 90px;}

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #534f48;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 { margin-bottom: 48px; color: #fff; }
    h4 { color: #da881e; font-size: 12px; margin-bottom: 24px; }

    .bill-to, .bill-from {
      margin-bottom: 48px;
      .location-details {
        gap: 16px;
        div { flex: 1; }
      }
    }

    .invoice-work {
      .payment {
        gap: 24px;
        div { flex: 1; }
      }

      .work-items {
        .item-list {
          width: 100%;
          // Item Table Styling
          .table-heading, .table-items {
            gap: 16px;
            font-size: 12px;
            .item-name { flex-basis: 50%; }
            .qty   { flex-basis: 10%; }
            .price { flex-basis: 20%; }
            .total { flex-basis: 20%; align-self: center;}
          }
          .table-heading {
            margin-bottom: 16px;
            th { text-align: left; }
          }
          .table-items {
            position: relative;
            margin-bottom: 10px;
            img { position: absolute; top: 15px; right: 0; width: 20px; height: 20px; }
          }
        }

        .button {
          color: #fff;
          background-color: black;
          align-items: center;
          justify-content: center;
          width: 100%;
          img { margin-right: 4px; }
        }
      }
    }

    .save {
      margin-top: 60px;
      div { flex: 1; }
      .right { justify-content: flex-end; }
    }
  }

  .input { margin-bottom: 24px; }

  label { font-size: 12px; margin-bottom: 6px; }

  input, select {
    width: 100%;
    background-color: black;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus { outline: none; }
  }
}
</style>