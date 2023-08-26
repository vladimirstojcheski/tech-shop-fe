<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Filter",
  props: ["manufacturersToFilter"],
  data() {
    return {
      selected: [],
      manufacturers: []
    };
  },
  created() {
    let selected = this.$route.query.manufacturers;
    if (selected !== undefined) {
      const selectedArray = selected.split(",");
      this.selected = selectedArray.map(item => Number(item));
      this.manufacturers = [...this.selected];
    }
  },
  methods: {
    ...mapMutations(['updateQuery']),
    setManufacturers() {
      let query = { ...this.$store.state.query };
      let manu = { manufacturers: [] };
      if (this.selected.length === 0) {
        query.manufacturers = undefined;
      } else {
        query.manufacturers = this.selected.join(',');
        manu.manufacturers = this.selected;
      }
      this.updateQuery(query);
      this.$router.push({ path: '/', query });
      this.$emit('filterManu', manu);
    }
  }
};
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