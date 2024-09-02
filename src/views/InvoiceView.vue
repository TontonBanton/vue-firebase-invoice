<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const route = useRoute()
const store = useStore();

const invoiceId = ref(null)
const currentInvoice = ref(null); // Define currentInvoice as a ref
const currentInvoiceArray= computed(() => store.state.currentInvoiceArray);

const toggleEditInvoice = ()=> {
  store.commit('TOGGLE_EDIT_INVOICE');
  store.commit('TOGGLE_INVOICE');
}

const getCurrentInvoice = ()=> {
  invoiceId.value = route.params.invoiceId
  //alert('dispatching vuex set_Current')
  store.commit('SET_CURRENT_INVOICE', invoiceId.value)
  currentInvoice.value = currentInvoiceArray.value[0] || null;
}

const formatCurrency = (value) => {
  // Convert the value to a number if it's a string (item.price)
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (value !== null && value !== undefined) {
    return numericValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "0.00";
};

const deleteInvoice = async (docId) => {
  await store.dispatch('DELETE_INVOICE', docId);
  router.push({ name: "Home" })
  store.dispatch('GET_INVOICES');  //Fetch the updated list of invoices after uploading
}

const updateStatusPaid = (docId)=> {
  alert('dispatching UPDATES_STATUS' + docId)
  store.dispatch('UPDATE_STATUS_TO_PAID', docId)
}
const updateStatusPending = (docId)=> {
  store.dispatch('UPDATE_STATUS_TO_PENDING', docId)
}

onMounted(()=> {
  getCurrentInvoice()
})

</script>

<template>
  <!-- {{  currentInvoice }} -->
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link to="/" style="color:white;">
      <img src="@/assets/left-arrow.png" alt="" style="width: 15px; height: 15px" /> Back to List
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div class="status-button flex"
          :class="{ paid: currentInvoice.invoicePaid, draft: currentInvoice.invoiceDraft, pending: currentInvoice.invoicePending}">
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditInvoice" class="orange">Edit</button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="orange">Delete</button>
        <button v-if="currentInvoice.invoicePending" @click="updateStatusPaid(currentInvoice.docId)" class="orange">Mark as Paid</button>
        <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid" @click="updateStatusPending(currentInvoice.docId)" class="orange">Mark as Pending</button>
      </div>
    </div>
    <!--Invoice Details-->
    <div class="invoice-details flex flex-column">
      <div class="top flex" >
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex" >
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>{{ currentInvoice.invoiceDate }}</p>
          <h4>Payment Date</h4>
          <p>{{ currentInvoice.paymentDueDate }}</p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <!--Items Details-->
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <!--Loop the items-->
          <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="item flex">
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ formatCurrency(item.price) }}</p>
            <p>{{ formatCurrency(item.total) }}</p>
          </div>
        </div>
        <div class="total flex orange">
          <p>Amount Due</p>
          <p>{{ formatCurrency(currentInvoice.invoiceTotal) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img { margin-right: 16px; width: 7px; height: 10px; }
  }
  .header, .invoice-details {
    background-color: #21232e;
    border-radius: 20px;
  }
  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;
    .left {
      align-items: center;
      span { color: #dfe3fa; margin-right: 16px;}
    }
    .right {
      flex: 1;
      justify-content: flex-end;
      button { color: #fff; }
    }
  }

  .invoice-details {
    padding: 48px;
    margin-top: 24px;
    .top {
      div { flex: 1; color: #dfe3fa; }
      .left {
        font-size: 12px;
        p:first-child { font-size: 24px; text-transform: uppercase; color: #fff; margin-bottom: 8px;}
        p:nth-child(2) { font-size: 16px; }
        span { color: #888eb0; }
      }
      .right { font-size: 12px; align-items: flex-end; }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;
      h4 { font-size: 12px; font-weight: 800; margin-bottom: 12px; }
      p { font-size: 16px; }
      .bill, .payment { flex: 1; }

      .payment {
        h4:nth-child(3) { margin-top: 32px; }
        p { font-weight: 600; }
      }

      .bill {
        p:nth-child(2) { font-size: 16px; }
        p:nth-child(3) { margin-top: auto;}
        p { font-size: 12px; }
      }
      .send-to { flex: 2; }
    }

    .bottom {
      margin-top: 50px;
      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #2b2c36;
        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;
          p:first-child { flex: 3; text-align: left; }
          p { flex: 1; text-align: right;}
        }
        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;
          &:last-child { margin-bottom: 0; }
          p:first-child { flex: 3; text-align: left;}
          p { flex: 1; text-align: right; }
        }
      }

      .total {
        color: #fff;
        padding: 15px;
        align-items: center;
        border-radius: 0 0 20px 20px;
        p { flex: 1; font-size: 12px;}
        p:nth-child(2) { font-size: 28px; text-align: right;}
      }
    }
  }
}
</style>