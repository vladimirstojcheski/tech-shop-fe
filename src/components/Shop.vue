<script setup>
import Product from "@/components/Product.vue";
import Filter from "@/components/Filter.vue"
import { useRoute } from "vue-router"
import {reactive, ref, watch} from "vue";

const route = useRoute()

let products = reactive(getProducts())


// watch( () => route.query.manufacturers, () => {
//   console.log('test')
//   products[1].show = false
//   console.log(products[1])
// }, {deep: true})

function updateProducts(event) {
  if (event === undefined) {
    for (let i = 0; i < products.length; i++) {
      products[i].show = true
    }
  } else {
    const filters = event[0].split(',')
    for (let i = 0; i < products.length; i++) {
      products[i].show = !!filters.includes(products[i].manu);
    }
  }
  return products
}

function getProducts() {
  return [{id: 1,title: 'LenovoThinkpad x280', price: 1000.00, qty: 1, image: './src/assets/img/ThinkPad_x280.png', manu: "John", show: false},
    {id: 2,title: 'Apple Macbook Pro',price: 2500.00, qty: 1,image: './src/assets/img/MacBook-Pro.png', manu: "John", show: true},
    {id: 3,title: 'Amazon Kindle Ebook',price: 150.00,qty: 1,image: './src/assets/img/Amazon_Kindle.png', manu: "John", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "John", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "John", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "John", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "John", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "John", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "John", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true},
    {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './src/assets/img/usbC_to_hdmi.jpg', manu: "Jacob", show: true}]
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
            <Product v-if="product.show" :product="product" :key="product.id"/>
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