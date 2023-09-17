<script>
import axios from "axios";
import ShoppingCartProduct from "@/components/ShoppingCartProduct.vue";
import ProfileOrder from "@/components/ProfileOrder.vue";
import {useToast} from "vue-toastification";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
  name: "Profile",
  components: {LoadingScreen, ProfileOrder, ShoppingCartProduct},
  data() {
    return {
      isLoading: false,
      user: {
        first_name: '',
        last_name: '',
        name: '',
        country: '',
        city: '',
        street_name: '',
        zip: '',
        phone_number: '',
        email: ''
      },
      isLoggedIn: false,
      access_token: '',
      usr: {}
    }
  },
  async created() {
    this.isLoading = true
    if (!localStorage.getItem('userData')) {
      this.$router.push('/login')
    } else {
      this.access_token = JSON.parse(localStorage.getItem('userData')).access_token
      this.isLoggedIn = true
    }
    await axios.get('/api/profile', {
      headers: {
        "Authorization": 'Bearer ' + this.access_token,
        "Accept": "application/json"
      }
    })
        .then(data => this.user = data.data.user)
        .catch(err => console.log(err))
    this.transformName(this.user.name)
    this.isLoading = false
  },
  methods: {
    transformName(fullName) {
      const split = fullName.split(' ')
      this.user.first_name = split[0]
      this.user.last_name = split[1]
    },
    async updateProfile() {
      if (!this.isLoggedIn) {
        this.$router.push('/login')
      }
      this.isLoading = true
      const formData = new FormData();
      const toast = useToast()
      formData.append('phone_number', this.user.phone_number);
      formData.append('country', this.user.country);
      formData.append('city', this.user.city);
      formData.append('street_name', this.user.street_name);
      formData.append('zip', this.user.zip);
      console.log(formData)
      try {
        await axios.put('/api/profile/edit', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.access_token
          },
        })
        toast.success('Profile updated successfully', {timeout: 3000})
      } catch (error) {
        toast.error(error.response.data.message , {timeout: 3000})
      }
      this.isLoading = false
    }
  }
}
</script>

<template>
  <LoadingScreen v-if="isLoading"/>
  <div class="container">
    <div class="custom-card-2">
      <h2>Profile</h2>
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <v-text-field v-model="user.first_name" label="First name" variant="underlined"></v-text-field>
            </div>
            <div class="col">
              <v-text-field v-model="user.last_name" label="Last name" variant="underlined"></v-text-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <v-text-field v-model="user.country" label="Country" variant="underlined"></v-text-field>
            </div>
            <div class="col">
              <v-text-field v-model="user.city" label="City" variant="underlined"></v-text-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xxl-9">
              <v-text-field v-model="user.street_name" label="Street name" variant="underlined"></v-text-field>
            </div>
            <div class="col">
              <v-text-field v-model="user.zip" label="Zip" variant="underlined"></v-text-field>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="col">
            <v-text-field v-model="user.email" label="Email" readonly variant="underlined"></v-text-field>
          </div>
          <div class="col">
            <v-text-field v-model="user.phone_number" label="Phone number" variant="underlined"></v-text-field>
          </div>
          <div class="col centered save">
            <v-btn color="orange-lighten-2" style="width: 70%" @click="updateProfile()">Save</v-btn>
          </div>
        </div>
      </div>
      <h2>Order history</h2>
      <div v-for="order in this.user.orders" :key="order.id">
        <ProfileOrder  :order="order"></ProfileOrder>
      </div>
      <div v-if="this.user.orders && this.user.orders.length === 0">
        <h5>You have not made any orders yet!</h5>
      </div>
    </div>
    </div>
</template>

<style scoped>

.container {
  padding-top: 30px;
}

</style>