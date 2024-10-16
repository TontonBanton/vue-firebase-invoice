<script setup>
  const props = defineProps({
    form: Object,
    //submitAction: Function,
  })
</script>

<template>
  <form @submit.prevent="submitAction(form)" class="invoice-content">
    <!-- Bill From -->
    <div class="bill-from flex flex-column">
      <h4>Bill From</h4>
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
        <select required id="paymentTerms" v-model="form.paymentTerms">
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
            <td class="item-name">
              <input type="text" v-model="item.itemName" />
            </td>
            <td class="qty">
              <input type="text" v-model="item.qty" />
            </td>
            <td class="price">
              <input type="text" v-model="item.price" />
            </td>
            <td class="total flex">
              ${{ (item.total = item.qty * item.price) }}
            </td>
            <img @click="deleteInvoiceItem(item.id)" src="@/assets/x-icon.png" alt="" />
          </tr>
        </table>
        <div @click="addNewInvoiceItem" class="flex button" style="color: orange">
          Add New Item
        </div>
      </div>
    </div>
  </form>
</template>
