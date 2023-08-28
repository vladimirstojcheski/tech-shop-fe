<script>
export default {
  name: "ShoppingCartProduct",
  props: ["product"],
  methods: {
    removeFromCart(productId) {
      this.$emit('removeProduct', productId);
    },
  },
}
</script>

<template>
  <div class="row mt-5 align-items-center custom-card-2">
    <div class="col">
      <v-img
          :src="product.img"
          height="200px"
      ></v-img>
    </div>
    <div class="col">
      <div class="row">
        <div class="col big">
          {{product.title}}
        </div>
      </div>
      <div class="row">
        <div class="col">
          {{product.price}}$
        </div>
      </div>
      <div class="row">
        <div class="col">
          free delivery
        </div>
      </div>
    </div>
    <div class="col">
      <v-btn color="primary" @click="removeFromCart(product.id)">Remove</v-btn>
    </div>
  </div>
</template>

<style scoped>
.padding {
  padding: 5px;
}
.big {
  font-size: 20px;
}
::v-deep .v-img__img--contain {
  object-fit: fill;
}
</style>