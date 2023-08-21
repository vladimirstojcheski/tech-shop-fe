import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import {createRouter, createWebHistory} from 'vue-router'
import Shop from "@/components/Shop.vue";
// import ProductDetails from "@/components/ProductDetails.vue";

const routes = [
    { path: '/', component: Shop, name: "Home" },
    { path: '/product/:id', component: () => import('@/components/ProductDetails.vue'), name: "ProductDetails"}
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes// short for `routes: routes`
})

const vuetify= createVuetify({
    components,
    directives,
    ssr: true,
})

createApp(App).use(router).use(vuetify).mount("#app")

