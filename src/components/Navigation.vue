<script setup>
</script>

<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/zen.png" alt="">
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: black;
  @media(min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
  }
  .branding {
    background-color: black;
    justify-content: center;
    padding: 1px;
    @media(min-width: 900px) {
      width: 100%;
    }
  }
  img {
    width: auto;
    height: 80px;
  }
}
</style>
