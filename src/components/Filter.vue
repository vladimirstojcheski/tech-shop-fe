<script>
export default {
  name: "Filter",
  data () {
    return {
      selected: [],
    }
  },
  methods: {
    setManufacturers() {
      if (this.selected.length === 0) {
        const query = Object.assign({}, this.$route.query);
        console.log(query)
        delete query.manufacturers
        console.log(query)
        this.$router.replace({ query });
        this.$emit('filterManu')
      } else {
        let values = ""
        const iterator = this.selected.values()
        for (const value of iterator) {
          values += value + ","
        }
        values = values.substring(0, values.length - 1)
        console.log(values)
        this.$router.push("?manufacturers=" + values)
        this.$emit('filterManu', [values])
      }
    }
  }
}
</script>

<template>
<!--    <p>{{ selected }}</p>-->
  <div class="row label">
    <div class="col">
      <b>Manufacturer</b>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <v-checkbox v-on:Change="setManufacturers"
          v-model="selected"
          label="John"
          value="John"
      ></v-checkbox>
      <v-checkbox v-on:Change="setManufacturers"
          v-model="selected"
          label="Jacob"
          value="Jacob"
      ></v-checkbox>
    </div>
  </div>
</template>

<style scoped>

::v-deep .v-checkbox .v-selection-control {
  min-height: auto;
  height: 2vh;
}
.label {
  padding-bottom: 20px;
}

</style>