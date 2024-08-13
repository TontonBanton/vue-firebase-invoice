<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/zen.png" alt="">
    </div>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: black;
  @media(min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }
  .branding {
    border-radius: 0 20px 20px 0;
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
