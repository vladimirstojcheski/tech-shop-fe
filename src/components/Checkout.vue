<script>
import editor from "@tinymce/tinymce-vue";
import axios from "axios";
import ShoppingCartProduct from "@/components/ShoppingCartProduct.vue";
import CheckoutProduct from "@/components/CheckoutProduct.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: "Checkout",
  components: {VueDatePicker, CheckoutProduct, ShoppingCartProduct},
  data() {
    return {
      date: null,
      products: [],
      customerInfo: {
        deliveryAddress: {
          country: '',
          streetName: '',
          city: '',
          zipCode: '',
        },
        email: '',
        phoneNumber: null
      },
    };
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
    async createOrder() {
      // const formData = new FormData();
      // formData.append('title', this.product.title);
      // formData.append('description', this.product.description);
      // formData.append('price', this.product.price);
      // formData.append('category_id', this.product.category_id);
      // formData.append('manufacturer_id', this.product.manufacturer_id);
      // formData.append('img', this.selectedFile);
      //
      // try {
      //   await axios.post('/api/products/create', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //
      //   alert('Product created successfully');
      //   // Clear form fields and image data
      //   this.product.title = 'Test';
      //   this.product.description = 'Test';
      //   this.product.price = null;
      //   this.product.category_id = null;
      //   this.product.manufacturer_id = null;
      //   this.product.img = null;
      //   this.selectedFile = null;
      // } catch (error) {
      //   console.error('Error creating product:', error);
      //   alert('An error occurred while creating the product.');
      // }
    },
  }
}
</script>

<template>
  <div class="container px-4">
    <div class="row">
      <div class="col">
        <div class="custom-card-2">
        <form @submit.prevent="createOrder">
          <div class="row">
            <div class="col">
              <h3>Delivery address</h3>
              <v-text-field
                  v-model="customerInfo.country"
                  label="Country"
              ></v-text-field>
              <v-text-field
                  v-model="customerInfo.city"
                  label="City"
              ></v-text-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xxl-10">
              <v-text-field
                  v-model="customerInfo.streetName"
                  label="Street name"
              ></v-text-field>
            </div>
            <div class="col-xxl-2">
              <v-text-field
                  v-model="customerInfo.zipCode"
                  label="Zip"
              ></v-text-field>
            </div>
          </div>
          <h3>Contact</h3>
          <v-text-field
              v-model="customerInfo.email"
              label="Email"
          ></v-text-field>

          <v-text-field
              v-model="customerInfo.phoneNumber"
              label="Phone Number"
              type="number"
          ></v-text-field>
          <h3>Payment</h3>
          <div class="row align-items-center">
            <div class="col col-xxl-9">
              <div class="row">
                <div class="col">
                  <v-text-field
                      v-model="customerInfo.phoneNumber"
                      label="Card number"
                      type="number"
                  ></v-text-field>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col">
                    <VueDatePicker input-class-name="custom-date"  v-model="date" month-picker />
                </div>
                <div class="col">
                  <v-text-field
                      v-model="customerInfo.phoneNumber"
                      label="CCV"
                      type="number"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col centered">
              <v-btn
                  class="me-4"
                  type="submit"
                  color="orange-lighten-2"
              >
                Order
              </v-btn>
            </div>
          </div>
        </form>
        </div>
      </div>
      <div class="col">
        <div class="custom-card-2">
          <div v-for="product in products" :key="product.id">
            <CheckoutProduct :product="product"></CheckoutProduct>
          </div>
          <div class="row">
            <div class="col end">
              Total: {{calculateTotal}}$
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.centered {
  text-align: center;
}
.container {
  padding-top: 30px;
}
.main-col {
  padding: 20px
}
.end {
  text-align: right;
}

.custom-date {
  height: 100%;
  color: red;
}

</style>