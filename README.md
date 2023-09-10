# TechShop Frontend

![TechShop Logo](documentation/logo.png)

TechShop Frontend is a Vue.js 3 application designed for online shopping. It offers a range of features to enhance the shopping experience, including product categorization, manufacturer filtering, product details, a shopping cart, and more. One notable feature is that the application ensures that reloading the page does not result in the loss of saved products in the cart.
It makes api calls to a seperate backend application which can be found [here](https://github.com/vladimirstojcheski/tech-shop-be).

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running](#running)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Backend Application](#backend-application)
- [Contact Information](#contact-information)

# Project Overview

TechShop Frontend is a Vue.js 3 application designed for online shopping. It provides a comprehensive set of features to create a fully functional online shop, including:

- **Product Categorization:** Easily navigate through a wide range of products organized into intuitive categories, making it simple to find what you're looking for.

- **Manufacturer Filtering:** Narrow down your product search by filtering items by manufacturer, allowing you to shop by your favorite brands.

- **Product Details:** Get comprehensive information about each product, including price, detailed descriptions, and high-quality images.

- **Shopping Cart:** Seamlessly add products to your cart with a single click, review your selections, and proceed to checkout when you're ready.

- **Persistence:** Experience worry-free shopping – even if you accidentally reload the page, your saved products in the cart remain intact.

- **Ordering:** Effortlessly place orders within the application, streamlining the entire shopping process.

- **Order Details:** Keep track of your order history and view detailed information about your previous purchases.

TechShop Frontend is your one-stop destination for a hassle-free online shopping experience. Whether you're a shopper exploring products or a business owner looking for an elegant and functional frontend solution, this application has you covered.

## Getting Started

To get started with TechShop Frontend and run it on your local machine, follow these steps:

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/): You'll need Node.js to run the application and manage dependencies. Install the latest LTS version if you haven't already.

### Installation

1. Clone the repository to your local machine using your preferred method (HTTPS or SSH):

    ```bash
   git clone https://github.com/vladimirstojcheski/tech-shop-fe.git
   ```
3. Change your current directory to the project's root folder:

   ```bash
   cd tech-shop-fe
   ```
4. Install the project dependencies using npm (Node Package Manager):

   ```bash
   npm install
   ```
### Running
Once the installation is complete, you can start the development server to run TechShop Frontend locally. Use the following command:

  ```bash
  npm run dev
  ```
After the development server has started, open your web browser and navigate to http://127.0.0.1:5173/ to access the application. You should now be able to explore TechShop Frontend and its features on your local machine.


## Usage

TechShop Frontend provides an intuitive and user-friendly interface for online shopping. Below are the steps and instructions to help you make the most of the application:

1. **Home Page:** Upon launching the application, you'll land on the home page. Here, you can start exploring products immediately.

2. **Product Browsing:** Use the navigation menu, categories, and manufacturer filters to browse and discover products that interest you. Click on a category or apply a filter to narrow down your choices.

3. **Product Details:** Click on READ MORE button of the product to view its detailed information. You'll find product images, descriptions, and pricing details.

4. **Adding to Cart:** To add a product to your shopping cart, simply click the "Add to Cart" button on the product detail page or on the home page. You can add multiple products to your cart.

5. **Shopping Cart:** Access your shopping cart by clicking the cart icon in the navigation menu. Review the items in your cart or remove products as needed.

6. **Checkout:** When you're ready to complete your purchase, click the "Checkout" button from the shopping cart. Follow the on-screen prompts to provide shipping and payment information.

7. **Order Details:** After successfully placing an order, you'll receive an email of the order details.

TechShop Frontend is designed to provide a seamless and enjoyable online shopping experience. Whether you're a customer looking for products or an administrator managing the shop, the application's user-friendly interface ensures a smooth experience.

## Project Structure

TechShop Frontend follows a structured directory layout to keep the codebase organized and maintainable. Below is an overview of the project's directory structure:

- **`public/`**: This directory contains public assets

- **`src/`**: The heart of the application, this directory contains the source code. Key subdirectories include:
  - `assets/`: Store static assets such as images and fonts. (main styling css file is located here)
  - `components/`: Vue components used throughout the application.
  - `store/`: Vuex store modules for state management.
  - `App.vue`: The main Vue application component.
  - `main.js`: The entry point for the application, where it's initialized. (router config is defined here)

- **`index.html`**: main HTML template used to render the application.

- **`.gitignore`**: A file that specifies which files and directories should be ignored by Git.

- **`package.json`**: The project's configuration file that includes dependencies and scripts.

- **`README.md`**: The documentation file you're currently reading, providing information about the project.

The project structure is designed to facilitate code organization, modularity, and maintainability, making it easier to develop and maintain your frontend application.

## Technologies Used

TechShop Frontend is built using a modern tech stack that includes:

- **Programming Languages**: JavaScript (ECMAScript 6)

- **Frontend Framework**: Vue.js 3

- **Package Manager**: npm

- **State Management**: Vuex

- **Routing**: Vue Router

- **Styling**: CSS, SCSS

- **UI Components**: Vuetify, Bootstrap 5

- **Version Control**: Git ([GitHub Repository](https://github.com/vladimirstojcheski/tech-shop-fe))

- **Build Tools**: Vue CLI

This tech stack enables us to create a robust and responsive frontend application that offers a seamless online shopping experience.

## Backend Application

TechShop Frontend is part of a comprehensive online shopping solution. While this repository focuses on the frontend application, please note that we also have a separate backend application that handles data storage and other server-side functionalities.

If you're interested in exploring or contributing to the backend component, you can find the associated repository here:

- **Backend Repository**: [Link to Backend Repository](https://github.com/vladimirstojcheski/tech-shop-be)

Feel free to visit the backend repository to learn more about its features and development. The synergy between the frontend and backend ensures a robust and secure online shopping experience.

## Contact Information

If you have any questions, suggestions, or feedback regarding TechShop Frontend, please feel free to reach out. We're here to help and improve the application.

- **Email**: [vladimir.stojcheski@students.finki.ukim.mk](mailto:vladimir.stojcheski@students.finki.ukim.mk)

- **GitHub**: [vladimirstojcheski](https://github.com/vladimirstojcheski)

Please don't hesitate to contact us. Your input is valuable to us, and we're always open to collaboration and contributions from the community.
