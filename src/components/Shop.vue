<script>
import Product from "@/components/Product.vue";
import Filter from "@/components/Filter.vue"
import axios from "axios";
import {mapState} from "vuex";

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
  components: {Filter, Product},
  props: ["category"],
  data() {
    return {
      products: [],
      productModel: new ProductModel(),
      manufacturersToFilter: []
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
    },

    async getProducts(query) {
      if (query.category !== undefined && query.category !== '') {
        this.productModel.search.category = Number(query.category)
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
      await axios.get('/api/manufacturers/' + query.category)
          .then(data => this.manufacturersToFilter = data.data)
          .catch(err => console.log(err))
    }
  }
}

</script>

<template>
  <div class="container-fluid text-center">
    <div class="row">
      <div class="col-xxl-1">
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
</style>