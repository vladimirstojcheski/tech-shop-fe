<script>
import Product from "@/components/Product.vue";
import Filter from "@/components/Filter.vue"
import axios from "axios";

export class ProductModel {
  search;
  constructor() {
    this.search = {
      "manufacturers" : []
    }
  }

}
export default {
  components: {Filter, Product},
  data() {
    return {
      products: [],
      productModel: new ProductModel()
    }
  },
  async mounted() {
    await axios.post('/api/products/all', this.productModel)
        .then(data => this.products = data.data)
        .catch(err => console.log(err))
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
      }
  }
}

</script>

<template>
  <div class="container-fluid text-center">
    <div class="row">
      <div class="col-xxl-1">
        <Filter @filterManu="updateProducts"/>
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