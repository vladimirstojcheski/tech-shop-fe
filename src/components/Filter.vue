<script>
import axios from "axios";

export default {
  name: "Filter",
  props: ["manufacturersToFilter"],
  data () {
    return {
      selected: [],
      manufacturers: []
    }
  },
  methods: {
    setManufacturers() {
      let manu = {"manufacturers" : []};
      if (this.selected.length === 0) {
        this.$emit('filterManu', manu)
      } else {
        let values = ""
        const iterator = this.selected.values()
        for (const value of iterator) {
          values += value + ","
          manu.manufacturers.push(value)
        }
        const query = this.$router.query
        query.manufacturer = this.selected.join(',');
        this.$router.push({ path: '/', query });
        this.$emit('filterManu', manu)
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
      <div v-for="manu in manufacturersToFilter">
        <v-checkbox v-on:Change="setManufacturers"
                    v-model="selected"
                    :label="manu.name"
                    :value="manu.id"
        ></v-checkbox>
      </div>
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