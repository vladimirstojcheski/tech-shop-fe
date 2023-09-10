# TechShop Frontend

![TechShop Logo](documentation/logo.png)

TechShop Frontend is a Vue.js 3 application designed for online shopping. It offers a range of features to enhance the shopping experience, including product categorization, manufacturer filtering, product details, a shopping cart, and more. One notable feature is that the application ensures that reloading the page does not result in the loss of saved products in the cart.
It makes api calls to a seperate backend application which can be found [here](https://github.com/vladimirstojcheski/tech-shop-be)

## Routes and Components
### Routes
- "/"
- "/product/{id}"
- "/product/add"
- "/shopping-cart"
- "/checkout"
- "/order/{id}

### Components
- [Header](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/Header.vue)
- [Shop](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/Shop.vue)
- [Product](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/Product.vue)
- [Filter](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/Filter.vue)
- [ProductDetails](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/ProductDetails.vue)
- [ShoppingCart](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/ShoppingCart.vue)
- [ShoppingCartProduct](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/ShoppingCartProduct.vue)
- [Checkout](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/Checkout.vue)
- [CheckoutProduct](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/CheckoutProduct.vue)
- [Order](https://github.com/vladimirstojcheski/tech-shop-fe/blob/main/src/components/Order.vue)



This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
