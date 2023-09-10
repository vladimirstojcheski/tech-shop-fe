<script>
import axios from "axios";
import CheckoutProduct from "@/components/CheckoutProduct.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
  name: "Order",
  components: {LoadingScreen, CheckoutProduct},
  data() {
    return {
      orderId: '',
      order: {},
      isLoading: false
    }
  },
  async created() {
    this.isLoading = true
    this.orderId = this.$route.params['id'];
    await axios.get('/api/order/' + this.orderId)
        .then(data => this.order = data.data.order)
        .catch(err => console.log(err))
    this.isLoading = false;
  },
}
</script>

<template>
  <LoadingScreen v-if="isLoading" />
  <div class="container">
    <div class="row">
      <div class="col-xxl-8 offset-2 custom-card-2 content">
        <h1>Order number: #{{ order.order_number }}</h1>
        <div class="row">
          <div class="col">
            {{ order.first_name }} {{ order.last_name }}
            <br>
            {{ order.street_name }}, {{ order.city }}, {{ order.country }}
          </div>
          <div class="col right">
            {{ order.email }}
            <br>
            {{ order.phone_number }}
          </div>
        </div>
        <div class="row products">
          <div class="col">
            <div v-for="product in order.products" :key="product.id">
              <div class="row align-items-center">
                <div class="col">
                  <img :src="product.img">
                </div>
                <div class="col centered">
                  {{ product.title }}
                </div>
                <div class="col right">
                  {{ product.price }}$
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
          </div>
          <div class="col">
          </div>
          <div class="col right">
            Total: {{ order.total_amount }}$
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card-2 {
  margin-top: 20px;
}
img {
  width: 80px;
  height: 80px;
}
.products {
  padding-top: 40px;
}
.content {
  padding: 20px;
}
</style>