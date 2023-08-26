<script>
import axios from "axios";
import {mapActions, mapMutations} from "vuex";

export default {
  data: () => ({
    query : '',
    items: [],
    locations: [
      'top',
      'bottom',
      'start',
      'end',
      'center',
    ],
    location: 'end',
  }),
  async mounted() {
    await axios.get('/api/categories/all')
        .then(data => this.items = data.data)
        .catch(err => console.log(err))
  },
  methods: {
    ...mapActions(["updateQuery"]),
    selectSection(item) {
      const query = {}
      query.category = item.id
      this.$store.dispatch('updateQuery', query);
      this.$router.push({ path: '/', query });
    }
  }
}
</script>

<template>
  <div class="header">
    <v-card
        color="grey-lighten-4"
        flat
        rounded="0"
    >
      <v-toolbar density="compact">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <div class="d-flex justify-space-around">
          <v-btn
              color="primary"
          >
            Categories

            <v-menu activator="parent">
              <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="item.id"
                    :value="item.id"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-menu activator="parent" :location="location">
                    <v-list>
                      <v-list-item
                          v-for="(item, index) in item.sub_categories"
                          :key="index"
                          :value="index"
                          @click="selectSection(item)"
                      >
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>


        </div>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi:mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
}
</style>