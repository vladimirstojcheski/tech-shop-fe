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
import store from "@/store";
import AddProduct from "@/components/AddProduct.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
import Checkout from "@/components/Checkout.vue";
import Order from "@/components/Order.vue";
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css"
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import mitt from 'mitt'
import Profile from "@/components/Profile.vue";

const toastOptions = {
    position: 'bottom-right'
}

const routes = [
    { path: '/', component: Shop, name: "Home" },
    { path: '/product/:id', component: () => import('@/components/ProductDetails.vue'), name: "ProductDetails"},
    { path: '/product/add', component: AddProduct, name: "AddProduct"},
    { path: '/shopping-cart', component: ShoppingCart, name: "ShoppingCart"},
    { path: '/checkout', component: Checkout, name: "Checkout"},
    { path: '/order/:id', component: Order, name: "Order"},
    { path: '/login' , component: LoginForm, name: "LoginForm"},
    { path: '/register' , component: RegisterForm, name: "RegisterForm"},
    { path: '/profile' , component: Profile, name: "Profile"},

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

const emitter = mitt()

const app = createApp(App)
app.use(router).use(store).use(vuetify).use(Toast, toastOptions)
app.config.globalProperties.emitter = emitter
app.mount('#app')



