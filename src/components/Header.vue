<script>
import axios from "axios";
import {mapActions, mapMutations, mapState} from "vuex";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
  components: {LoadingScreen},
  created() {
    this.loggedInMenu.push({
      name: 'Profile',
      action: 1
    })
    this.loggedInMenu.push({
      name: 'Logout',
      action: 2
    })
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
    if (localStorage.getItem('userData')) {
      this.user = JSON.parse(localStorage.getItem('userData'))
      this.isLoggedIn = true
    }
  },

  data: () => ({
    query : '',
    items: [],
    loggedInMenu: [],
    isLoading: false,
    locations: [
      'top',
      'bottom',
      'start',
      'end',
      'center',
    ],
    location: 'end',
    user: {},
    isLoggedIn: false
  }),
  async mounted() {
    this.emitter.on('userLoggedIn',  (isLoggedIn) => {
      this.user = JSON.parse(localStorage.getItem('userData'))
      this.isLoggedIn = isLoggedIn;
    });
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
    async menuAction(item) {
      if (item.action === 1) {
        this.$router.push({path: '/profile'})
      } else {
        this.isLoading = true
        await axios.get('/api/logout', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.access_token
          },
        }).then(data => this.isLoggedIn = false)
            .catch(error => this.isLoading = false);
        localStorage.removeItem('userData')

        this.$router.push({ path: '/login'});
        this.isLoading = false
      }
    },
    navigateHome() {
      const query = {}
      this.$store.dispatch('updateQuery', query);
      this.$router.push({ path: '/'})
    },
    navigateToProductForm() {
      this.$router.push({ path: '/product/add'})
    },
    navigateToLogin() {
      this.$router.push({ path: '/login'})
    },
    navigateToRegister() {
      this.$router.push({ path: '/register'})
    }
  },
}
</script>

<template>
  <LoadingScreen v-if="isLoading"/>
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

          <v-btn v-if="isLoggedIn && user.role === 'admin'" @click="navigateToProductForm"
              color="primary"
          >
            Add product
          </v-btn>

        </div>

        <v-spacer></v-spacer>


        <v-btn icon>
          <router-link
              color="orange-lighten-2"
              variant="text"
              :to="'/shopping-cart'">
          <v-icon class="cart">mdi-cart</v-icon>
            <div class="cart-count count">{{ cartItemsLength }}</div>
          </router-link>
        </v-btn>

        <div class="nav" v-if="!isLoggedIn">
          <v-btn @click="navigateToLogin"
                 color="primary"
          >
            Login
          </v-btn>
          <v-btn @click="navigateToRegister"
                 color="primary"
          >
            Register
          </v-btn>
        </div>

        <v-btn v-if="isLoggedIn"
            color="primary" class="nav"
        >
          {{ user.name }}

          <v-menu activator="parent">
            <v-list>
              <v-list-item
                  v-for="(item, index) in loggedInMenu"
                  :key="item.action"
                  :value="item.action"
                  @click="menuAction(item)"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
  padding-right: 10px;
}

.nav {
  margin-left: 20px;
}
</style>