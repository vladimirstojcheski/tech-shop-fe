<template>
  <div class="container">
    <div class="row">
        <div class="col-xxl-8 offset-2">
          <div class="custom-card-2">
          <input type="file" accept="image/*" @change="handleFileChange" />
          <v-btn color="primary" @click="uploadPicture">Upload</v-btn>
            <br>
            <br>
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
            <br>

            <v-btn
                class="me-4"
                type="submit"
                color="primary"
            >
              Add Product
            </v-btn>

          </form>
        </div>
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
      access_token: '',
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
            'Authorization' : 'Bearer ' + this.access_token,
            'Content-Type': 'multipart/form-data',
            'Accept' : 'application/json'
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
    if (localStorage.getItem('userData')) {
      this.access_token = JSON.parse(localStorage.getItem('userData')).access_token
      const role = JSON.parse(localStorage.getItem('userData')).role
      if (role !== 'admin') {
        this.$router.push('/login')
      }
      this.isLoggedIn = true
    } else {
      this.$router.push('/login')
    }
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
.custom-card-2 {
  margin-top: 20px;
}
</style>