<script setup>
import Shop from "@/components/Shop.vue";
import Header from "@/components/Header.vue";
import { RouterView } from "vue-router"

</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
main {
  height: 100%;
}


</style>
