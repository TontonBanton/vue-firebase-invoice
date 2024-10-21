<script setup>
  import '@/styles/components/InvoiceModalStyle.scss'
  const props = defineProps({
    form: Object
  })
</script>

<template>
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

</template>