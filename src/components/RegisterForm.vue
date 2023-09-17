<script>
import editor from "@tinymce/tinymce-vue";
import axios from "axios";
import {useToast} from "vue-toastification";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
  name: "RegisterForm",
  components: {LoadingScreen},
  data() {
    return {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  },
  methods: {
    async register() {
      this.isLoading = true
      const toast = useToast()
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('password_confirmation', this.password_confirmation);

      try {
        await axios.post('/api/register', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        toast.success('Register success', {timeout: 3000})
        this.$router.push({ path: '/login'})
      } catch (error) {
        toast.error(error.message, {timeout: 3000})
      }
      this.isLoading = false
    }
  }
}
</script>

<template>
  <LoadingScreen v-if="isLoading"/>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="custom-card-2">
          <form @submit.prevent="register">
            <v-text-field
                v-model="name"
                label="Name"
            ></v-text-field>
            <v-text-field
                v-model="email"
                label="Email"
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                type="password"
            ></v-text-field>
            <v-text-field
                v-model="password_confirmation"
                label="Password Confirmation"
                type="password"
            ></v-text-field>
            <v-btn
                class="me-4 btn"
                type="submit"
                color="primary"
            >
              Register
            </v-btn>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card-2 {
  margin-top: 20px;
}
.container {
  width: 30%;
}
.btn {
  width: 100%;
}
.label {
  text-align: center;
}
</style>