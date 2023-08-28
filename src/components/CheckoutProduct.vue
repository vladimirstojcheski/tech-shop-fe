<script>
export default {
  name: "CheckoutProduct",
  props: ["product"],
}
</script>

<template>
  <div class="row align-items-center">
    <div class="col big">
      {{product.title}}
    </div>
    <div class="col end">
      {{product.price}}$
    </div>
  </div>
  <hr>
</template>

<style scoped>
.padding {
  padding: 5px;
}
.big {
  font-size: 20px;
}
.end {
  text-align: right;
}
</style>
