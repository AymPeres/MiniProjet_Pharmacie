<script setup>
import {ref, watch} from "vue";

const searchQuery = ref('')
const emit = defineEmits(['handlerUpdateSearchQuery'])


function emitSearchQuery(newQuery) {
  emit('handlerUpdateSearchQuery', newQuery)
}

watch(searchQuery, (newQuery) => {
  emitSearchQuery(newQuery);
})


</script>


<template>

  <v-container class="search-card bottom-left" >

    <v-text-field
        v-model="searchQuery"
        label="Rechercher"
        outlined
        prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <!--
        <v-btn @click="emitSearchQuery(searchQuery)" class="btn" block>
          Rechercher
        </v-btn>
    -->

  </v-container>
</template>


<style scoped>
.search-card{
  background-color: rgba(255, 255, 255, 0.65);
  padding: 2px;
  margin: 0;
  min-width: 180px;
}

.bottom-left {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
