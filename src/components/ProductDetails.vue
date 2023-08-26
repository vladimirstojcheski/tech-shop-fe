<script>
import axios from "axios";

export default {
  name: "ProductDetails",
  data() {
    return {
      productId: '',
      product: [],
      userCountry: null,
    }
  },
  async created() {
    this.productId = this.$route.params['id'];
    await axios.get('/api/products/' + this.productId)
        .then(data => this.product = data.data)
        .catch(err => console.log(err))
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
  },
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <v-img
            :width="450"
            aspect-ratio="16/9"
            cover
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        ></v-img>
      </div>
      <div class="col">
        {{ product[0].price }}$<hr>
        {{ product[0].description }}
      </div>
      <div class="col border">
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
              <v-btn color="primary" size="x-large">ADD TO CART</v-btn>
            </v-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding-top: 5vh;
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

.border {
  height: 100%;
}

</style>