<script>
import axios from "axios";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  created() {
    if (localStorage.getItem('cart')) {
      if (JSON.parse(localStorage.getItem('cart')).length > 0) {
        console.log(JSON.parse(localStorage.getItem('cart')))
        this.products = JSON.parse(localStorage.getItem('cart'))
        for (let productId in this.products) {
          const product = this.products[productId];
          this.$store.dispatch('addProductToCart', product);
        }
      }
    }
  },
  data: () => ({
    query : '',
    items: [],
    locations: [
      'top',
      'bottom',
      'start',
      'end',
      'center',
    ],
    location: 'end'
  }),
  async mounted() {
    await axios.get('/api/categories/all')
        .then(data => this.items = data.data)
        .catch(err => console.log(err))
  },
  computed: {
    ...mapState(["cart"]),
    cartItemsLength() {
      return this.cart.length;
    }
  },
  methods: {
    ...mapActions(["updateQuery"]),
    selectSection(item) {
      const query = {}
      query.category = item.id
      this.$store.dispatch('updateQuery', query);
      this.$router.push({ path: '/', query });
    },
    navigateHome() {
      const query = {}
      this.$store.dispatch('updateQuery', query);
      this.$router.push({ path: '/'})
    }
  },
}
</script>

<template>
  <div class="header">
    <v-card
        color="grey-lighten-4"
        flat
        rounded="0"
    >
      <v-toolbar class="header mar-right" density="compact">


        <v-toolbar-title class="navigation" @click="navigateHome"><img height="100" src="/src/assets/logo.png"></v-toolbar-title>

        <div class="d-flex justify-space-around">
          <v-btn
              color="primary"
          >
            Categories

            <v-menu activator="parent">
              <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="item.id"
                    :value="item.id"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-menu activator="parent" :location="location">
                    <v-list>
                      <v-list-item
                          v-for="(item, index) in item.sub_categories"
                          :key="index"
                          :value="index"
                          @click="selectSection(item)"
                      >
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>


        </div>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi:mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <router-link
              color="orange-lighten-2"
              variant="text"
              :to="'/shopping-cart'">
          <v-icon class="cart">mdi-cart</v-icon>
            <div class="cart-count count">{{ cartItemsLength }}</div>
          </router-link>
        </v-btn>

      </v-toolbar>
    </v-card>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: white !important;
}
.cart-count {
  position: absolute;
  top: 3px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}
.navigation {
  cursor: pointer;
}

.mar-right {
  padding-right: 60px;
}
</style>