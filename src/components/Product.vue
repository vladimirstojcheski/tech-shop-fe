<script>

export default {
  props: ["product"],
  methods: {
    navigateToProductDetails(productId) {
      this.$router.push({ path: '/product/' + productId})
    },
    addToCart(product) {
      console.log(product)
      this.$store.dispatch('addProductToCart', product);
      // Save cart data to local storage
      localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
    },
  }
}
</script>

<template>
  <div class="col">
  <v-card
      class="mx-auto"
      max-width="344"
  >
    <v-img class="full"
        :src="product.img"
        height="200px" aspect-ratio="16/9"
    ></v-img>

    <div>
    <v-card-title>
      {{ product.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ product.price }}$
    </v-card-subtitle>
    </div>
    <v-card-actions>
      <v-btn @click="navigateToProductDetails(product.id)" color="orange-lighten-2"
             variant="text">
          Read more
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn @click="addToCart(product)"
          color="orange-lighten-2"
          variant="text"
      >
        Add to cart
      </v-btn>

    </v-card-actions>
  </v-card>

  </div>

</template>

<style scoped>
.v-card--variant-elevated {
  width: 260px;
}

.v-card--variant-elevated {
  width: 260px; /* Optional: Set the desired width for the v-card */
}

.full {
  width: 100%;
  max-width: 100%;
  object-fit: fill;
}

::v-deep .v-img__img--contain {
  object-fit: fill;
}

</style>