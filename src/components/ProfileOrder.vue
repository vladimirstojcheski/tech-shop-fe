<script>
export default {
  name: "ProfileOrder",
  props: ["order"],
  methods: {
    viewOrder(orderId){
      this.$router.push('/order/' + orderId)
    }
  }
}
</script>

<template>
  <div class="row mt-5 align-items-center">
    <div class="col">
      #{{order.order_number}}
    </div>
    <div class="col centered">
          {{order.total_amount}}$
        </div>
        <div class="col centered">
          {{Date(order.created_at).toLocaleString()}}
        </div>
    <div class="col right">
      <v-btn color="orange-lighten-2" @click="viewOrder(order.id)">View</v-btn>
    </div>
  </div>

</template>

<style scoped>

</style>