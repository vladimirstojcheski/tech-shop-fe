<template>
  <div class="container">
    <div class="row">
      <div class="col-xxl-6 offset-3">
        <input type="file" accept="image/*" @change="handleFileChange" />
        <button @click="uploadPicture">Upload</button>
        <form @submit.prevent="createProduct">
          <v-text-field
              v-model="product.title"
              label="Product title"
          ></v-text-field>

          <v-text-field
              v-model="product.price"
              label="Price"
              type="number"
          ></v-text-field>

          <v-select
              v-model="selectedCategory"
              :items="categories"
              label="Category"
              item-title="name"
              item-value="id"
              @input="onCategorySelected"
          ></v-select>
          <v-select
              v-model="product.category_id"
              :items="subCategories"
              label="Subcategory"
              item-title="name"
              item-value="id"
          ></v-select>

          <v-select
              v-model="product.manufacturer_id"
              :items="manufacturers"
              label="Manufacturer"
              item-title="name"
              item-value="id"
          ></v-select>

          <v-card
              title="Description"
          ><editor :init="{height: 450}" v-model="product.description"></editor>
          </v-card>

          <v-btn
              class="me-4"
              type="submit"
          >
            submit
          </v-btn>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Editor from "@tinymce/tinymce-vue";

export default {
  name: 'AddProduct',
  components: {
    'editor' : Editor
  },
  data() {
    return {
      selectedFile: null,
      product: {
        title: '',
        description: '',
        price: null,
        category_id: null,
        manufacturer_id: null,
        img: null,
      },
      categories: [],
      subCategories: [],
      selectedCategory: null,
      manufacturers: []
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadPicture() {
      if (!this.selectedFile) {
        alert('Please select a file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        // Store the actual image file, not the Data URL
        this.product.img = this.selectedFile;
        alert('Picture uploaded successfully.');
      };
      reader.readAsDataURL(this.selectedFile);
    },
    async createProduct() {
      const formData = new FormData();
      formData.append('title', this.product.title);
      formData.append('description', this.product.description);
      formData.append('price', this.product.price);
      formData.append('category_id', this.product.category_id);
      formData.append('manufacturer_id', this.product.manufacturer_id);
      formData.append('img', this.selectedFile);

      try {
        await axios.post('/api/products/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Product created successfully');
        // Clear form fields and image data
        this.product.title = 'Test';
        this.product.description = 'Test';
        this.product.price = null;
        this.product.category_id = null;
        this.product.manufacturer_id = null;
        this.product.img = null;
        this.selectedFile = null;
      } catch (error) {
        console.error('Error creating product:', error);
        alert('An error occurred while creating the product.');
      }
    },
    async fetchCategories() {
      try {
        await axios.get('/api/categories/all')
            .then(data => this.categories = data.data)
        // const response = await axios.get('/api/categories/all');
        // this.categories = response.data
        console.log(this.categories)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    onCategorySelected() {
      const cat = this.categories.filter(x => x.id === this.selectedCategory)
      this.subCategories = cat[0].sub_categories
    },
    async onSubCategorySelected() {
      console.log(this.product.category_id)
      try {
        console.log(this.product.manufacturer_id)
        await axios.get('/api/manufacturers/' + this.product.category_id)
            .then(data => this.manufacturers = data.data)
        console.log(this.manufacturers)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
  },
  created() {
    this.fetchCategories();
  },
  watch: {
    'selectedCategory': 'onCategorySelected',
    'product.category_id': 'onSubCategorySelected',
  },
};
</script>

<style scoped>
.form {
  width: 20px;
}
</style>