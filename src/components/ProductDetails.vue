<script>
import axios from "axios";
import {useToast} from "vue-toastification";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
  name: "ProductDetails",
  components: {LoadingScreen},
  data() {
    return {
      productId: '',
      product: [],
      userCountry: null,
      isLoading: false
    }
  },
  async created() {
    this.isLoading = true
    this.productId = this.$route.params['id'];
    await axios.get('/api/products/' + this.productId)
        .then(data => this.product = data.data)
        .catch(err => console.log(err))
    this.isLoading = false
  },
  mounted() {
    this.getUserCountry();
  },
  methods: {
    async getUserCountry() {
      try {
        const position = await this.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        // Use reverse geocoding API to get country information based on latitude and longitude
        const countryInfo = await this.getCountryInfo(latitude, longitude);
        this.userCountry = countryInfo.country;
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });
    },
    async getCountryInfo(latitude, longitude) {
      // Use your preferred reverse geocoding service here
      // Example: Use the Nominatim API
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      return {
        country: data.address.country,
      };
    },
    addToCart(product) {
      const toast = useToast()
      console.log(product)
      this.$store.dispatch('addProductToCart', product);
      // Save cart data to local storage
      localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
      toast.success('Product added to cart', {timeout: 3000})
    },
  },
}
</script>

<template>
  <LoadingScreen v-if="isLoading"/>
  <div class="container ">
    <div class="row custom-card-2 gx-5">
      <div class="col">
        <v-img v-if="product[0]"
            :width="450"
            aspect-ratio="16/9"
            cover
            :src="product[0].img"
        ></v-img>
      </div>
      <div class="col">
        <div v-if="product[0]">
          <h2>{{ product[0].title }}</h2>
          <hr>
          <h3>{{ product[0].price }}$</h3>
          <hr>
          <div v-html="product[0].description"></div>
        </div>
      </div>
      <div class="col">
        <div class="row border-bottom padd">
          <div class="col">
            <b>Ship to</b>
          </div>
          <div class="col right">
            {{ userCountry }}
          </div>
        </div>
        <div class="row border-bottom paddd">
          <div class="col">
            <b>Free Shipping</b><br>
            Estimated delivery: {{ userCountry === 'North Macedonia' ? '3-7 days' : '15-90 days' }}
          </div>
        </div>
        <div class="row paddd">
          <div class="col centered">
            <v-col cols="auto">
              <v-btn @click="addToCart(product[0])" color="primary" size="x-large">ADD TO CART</v-btn>
            </v-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding-top: 30px;
  padding-bottom: 30px;
}
.right {
  text-align: right;
}
.padd {
  padding: 20px 5px 0 5px;
}
.paddd {
  padding: 20px 5px 0 5px;
}
.centered {
  text-align: center;
  padding-bottom: 20px;
}
.border-bottom {
  border-bottom: #181818;
  padding-bottom: 20px;
}

</style>