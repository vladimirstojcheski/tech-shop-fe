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
        firstName: '',
        lastName: '',
        deliveryAddress: {
          country: '',
          streetName: '',
          city: '',
          zipCode: '',
        },
        email: '',
        phoneNumber: null,
        cardNumber: '',
        ccv: ''
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
      const formData = new FormData();
      formData.append('first_name', this.customerInfo.firstName);
      formData.append('last_name', this.customerInfo.lastName);
      formData.append('email', this.customerInfo.email);
      formData.append('phone', this.customerInfo.phoneNumber);
      formData.append('country', this.customerInfo.deliveryAddress.country);
      formData.append('city', this.customerInfo.deliveryAddress.city);
      formData.append('streetName', this.customerInfo.deliveryAddress.streetName);
      formData.append('zip_code', this.customerInfo.deliveryAddress.zipCode);
      formData.append('total_amount', this.calculateTotal);

      let productIds = []
      for (let product of this.products) {
        productIds.push(product.id)
      }
      for (let productId of productIds) {
        formData.append('products[]', productId);
      }
      try {
        await axios.post('/api/order/create', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        alert('Order created successfully');
        // Clear form fields and image data
        this.customerInfo.firstName = ''
        this.customerInfo.lastName = ''
        this.customerInfo.email = ''
        this.customerInfo.phoneNumber = ''
        this.customerInfo.deliveryAddress.country = ''
        this.customerInfo.deliveryAddress.city = ''
        this.customerInfo.deliveryAddress.streetName = ''
        this.customerInfo.deliveryAddress.country.zipCode = ''
      } catch (error) {
        console.error('Error creating order:', error);
        alert('An error occurred while creating the order.');
      }
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
            <h3>Personal info</h3>
            <div class="col">
              <v-text-field
                  v-model="customerInfo.firstName"
                  label="First name"
              ></v-text-field>
            </div>
            <div class="col">
              <v-text-field
                  v-model="customerInfo.lastName"
                  label="Last Name"
              ></v-text-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h3>Delivery address</h3>
              <v-text-field
                  v-model="customerInfo.deliveryAddress.country"
                  label="Country"
              ></v-text-field>
              <v-text-field
                  v-model="customerInfo.deliveryAddress.city"
                  label="City"
              ></v-text-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xxl-10">
              <v-text-field
                  v-model="customerInfo.deliveryAddress.streetName"
                  label="Street name"
              ></v-text-field>
            </div>
            <div class="col-xxl-2">
              <v-text-field
                  v-model="customerInfo.deliveryAddress.zipCode"
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
                      v-model="customerInfo.cardNumber"
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
                      v-model="customerInfo.ccv"
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