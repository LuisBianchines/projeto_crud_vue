<template>
  <v-card>
      <v-text-field
        v-model="search"
        label="Pesquisar"
        single-line
        hide-details
        id="pesquisar"
      ></v-text-field>    
    <v-data-table :search="search"></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style scoped>
#pesquisar {
  min-width: 400px;
}
</style>