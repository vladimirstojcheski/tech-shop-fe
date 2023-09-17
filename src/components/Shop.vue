<script>
import Product from "@/components/Product.vue";
import Filter from "@/components/Filter.vue"
import axios from "axios";
import LoadingScreen from '@/components/LoadingScreen.vue';

export class ProductModel {
  search;
  constructor() {
    this.search = {
      "manufacturers" : [],
      "category" : 0,
      "manufacturersToFilter" : [],
      "query" : ''
    }
  }

}
export default {
  components: {Filter, Product, LoadingScreen},
  props: ["category"],
  data() {
    return {
      products: [],
      productModel: new ProductModel(),
      manufacturersToFilter: [],
      isLoading: false
    }
  },
  async created() {
    this.$store.dispatch('updateQuery', this.$route.query);
    await this.getProducts(this.$route.query)
  },
  async mounted() {
    this.$watch( ()=> this.$route.query,async (value) => {
      await this.getProducts(this.$route.query)
    })
  },
  methods: {
    async updateProducts(event) {
      this.isLoading = true
      if (event === undefined) {
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].show = true
        }
      } else {
        this.productModel.search.manufacturers = event.manufacturers
        await axios.post('/api/products/all', this.productModel)
            .then(data => this.products = data.data)
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].show = true;
        }
      }
      this.isLoading = false
    },

    async getProducts(query) {
      this.isLoading = true
      if (Object.keys(query).length === 0) {
        await axios.get('/api/products')
            .then(data => this.products = data.data)
            .catch(err => console.log(err))
        for (const product of this.products) {
          this.productModel.search.manufacturersToFilter.push(product.manufacturer_id)
        }
        await axios.get('/api/manufacturers')
            .then(data => this.manufacturersToFilter = data.data)
            .catch(err => console.log(err))
      } else {
        if (query.category !== undefined && query.category !== '') {
          this.productModel.search.category = Number(query.category)
          await axios.get('/api/manufacturers/' + query.category)
              .then(data => this.manufacturersToFilter = data.data)
              .catch(err => console.log(err))
        } else {
          await axios.get('/api/manufacturers')
              .then(data => this.manufacturersToFilter = data.data)
              .catch(err => console.log(err))
        }
        if (query.manufacturers !== undefined && query.manufacturers.length > 0) {
          let manu = []
          for (const value of query.manufacturers.split(',')) {
            manu.push(Number(value))
          }
          this.productModel.search.manufacturers = manu
        }
        await axios.post('/api/products/all', this.productModel)
            .then(data => this.products = data.data)
            .catch(err => console.log(err))
        for (const product of this.products) {
          this.productModel.search.manufacturersToFilter.push(product.manufacturer_id)
        }
      }
      this.isLoading = false
    }
  }
}

</script>

<template>
  <LoadingScreen v-if="isLoading"/>
  <div class="container-fluid text-center">
    <div class="row gx-5">
      <div class="col-xxl-2 custom-card-2">
        <Filter @filterManu="updateProducts" :manufacturersToFilter="manufacturersToFilter"/>
<!--        <v-btn v-on:Click="showManu">Filter</v-btn>-->

      </div>
      <div class="col">
        <div class="row">
          <template v-for="product in products">
            <Product :product="product"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.row {
}
.container-fluid{
  margin: 0 auto;
  padding-top: 30px;
  width: 95%;
}
.col {
  padding-bottom: 40px;
}

.custom-card-2 {
  height: 100%;
  max-height: 35vh;
  overflow: auto;
}
</style>