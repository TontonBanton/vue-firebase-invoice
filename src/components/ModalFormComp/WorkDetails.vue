<script setup>
import '@/styles/components/InvoiceModalStyle.scss'
import { useInvoiceForm } from '@/composables/useInvoiceForm'
const { addNewInvoiceItem, deleteInvoiceItem } = useInvoiceForm();

const props = defineProps({
  form: Object
})
</script>

<template>
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
        Add New Item
      </div>
    </div>
  </div>
</template>