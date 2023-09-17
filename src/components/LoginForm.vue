<script>
import editor from "@tinymce/tinymce-vue";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen.vue";
import {useToast} from "vue-toastification";

export default {
  name: "LoginForm",
  components: {LoadingScreen},
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      access_token: "",
      userData: {}
    }
  },
  created() {
    if (localStorage.getItem('userData')) {
      this.$router.push({ path: '/'})
    }
  },
  methods: {
    async login() {
      this.isLoading = true
      const toast = useToast()
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      try {
        await axios.post('/api/login', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }).then(data => this.access_token = data.data.access_token);

        await axios.get('/api/getaccount', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.access_token
          },
        }).then(data => this.userData = data.data);
        this.userData.access_token = this.access_token
        localStorage.setItem('userData', JSON.stringify(this.userData));
        toast.success('Login success', {timeout: 3000})
        this.emitter.emit('userLoggedIn', true);
        this.$router.push({ path: '/'})
      } catch (error) {
        toast.error('Invalid credentials', {timeout: 3000})
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
          <form @submit.prevent="login">
            <v-text-field
                v-model="email"
                label="Email"
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Password"
                type="password"
            ></v-text-field>
            <v-btn
                class="me-4 btn"
                type="submit"
                color="primary"
            >
              Login
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