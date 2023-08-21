<script>
import Product from "@/components/Product.vue";
import Filter from "@/components/Filter.vue"
import axios from "axios";

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
  async mounted() {
    this.$route.path,async (to, from) => {
      await this.getProducts(to, from)
    }
    this.$watch( ()=> this.$route.query.category,async (value) => {
      console.log(value)
      await this.getProducts(value)
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
    async getProducts(category) {
      this.productModel.search.category = Number(category)
      await axios.post('/api/products/all', this.productModel)
          .then(data => this.products = data.data)
          .catch(err => console.log(err))
      this.productModel.search.manufacturersToFilter = []
      for (const product of this.products) {
        this.productModel.search.manufacturersToFilter.push(product.manufacturer_id)
      }
      await axios.post('/api/manufacturers/all', this.productModel)
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