<script>
import {mapState} from "vuex";
import ShoppingCartProduct from "@/components/ShoppingCartProduct.vue";

export default {
  name: "ShoppingCart",
  components: {ShoppingCartProduct},
  data() {
    return {
      products: [],
    }
  },
  created() {
    this.products = this.$store.state.cart;
  },
  computed: {
    calculateTotal() {
      let sum = 0
      for (let productId in this.products) {
        sum += this.products[productId].price
      }
      return sum
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch('removeProductFromCart', productId);
      this.products = this.$store.state.cart
      // Update local storage after removing item
      localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
    },
    navigateToCheckout() {
      this.$router.push({ path: '/checkout'})
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="row gx-5">
      <div class="col-xxl-8">
        <div v-for="product in products" :key="product.id">
          <ShoppingCartProduct @removeProduct="removeFromCart" :product="product"></ShoppingCartProduct>
        </div>
        <div v-if="products.length===0" class="custom-card-2 centered em">
          The cart is empty
        </div>
      </div>
      <div class="col mt-5 custom-card-2 cc">
        <h1 class="padding-bottom">Summary</h1>
        <div class="row align-items-center ">
          <div class="col">
            <h3 class="padding-bottom">Total: </h3>
          </div>
          <div class="col">
            <h3 class="padding-bottom">{{ calculateTotal }}$</h3>
          </div>
        </div>
        <div class="row">
          <div class="col padding-bottom">
            <v-btn @click="navigateToCheckout()" style="width: 100%" color="orange-lighten-2">CHECKOUT ({{this.products.length}})</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--<ul>-->
<!--<li v-for="item in products" :key="item.id">-->
<!--  {{ item.title }} - {{ item.price }}-->
<!--  <button @click="removeFromCart(item.id)">Remove</button>-->
<!--</li>-->
<!--</ul>-->

<style scoped>
.padding-bottom {
  padding-bottom: 3vh;
}

.container {
  padding-top: 30px;
  padding-bottom: 30px;
}

.cc {
  height: 100%;
}

.em {
  margin-top: 18px;
}

</style>