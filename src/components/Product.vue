<script>

export default {
  props: ["product"],
  data() {
    return {
      products: []
    }
  }
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
      {{ product.description }}
    </v-card-subtitle>
    </div>
    <v-card-actions>
      <v-btn
          color="orange-lighten-2"
          variant="text"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

    </v-card-actions>
  </v-card>

  </div>

</template>

<style scoped>
.v-card--variant-elevated {
  width: 260px;
}

</style>