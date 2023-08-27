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