<script setup>
import Shop from "@/components/Shop.vue";
import Header from "@/components/Header.vue";
import { RouterView } from "vue-router"
import Footer from "@/components/Footer.vue";

</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <Footer/>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}
main {
  height: 100%;
  min-height: 86.6vh;
}


</style>
