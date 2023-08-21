<script>

export default {
  props: ["product"],
}
</script>

<template>
  <div class="col">
  <v-card
      class="mx-auto"
      max-width="344"
  >
    <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
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
      <router-link
          color="orange-lighten-2"
          variant="text"
       :to="'product/' + product.id">
        Read more
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
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

</style>