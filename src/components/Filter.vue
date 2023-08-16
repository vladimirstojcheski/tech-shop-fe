<script>
import axios from "axios";

export default {
  name: "Filter",
  data () {
    return {
      selected: [],
      manufacturers: []
    }
  },
  async mounted() {
    await axios.get('/api/manufacturers/' + 2)
        .then(data => this.manufacturers = data.data)
        .catch(err => console.log(err))
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
      <div v-for="manu in manufacturers">
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