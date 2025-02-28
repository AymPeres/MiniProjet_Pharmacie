<script setup>
defineProps(["produit", "handlerAdd", "handlerRemove", "handlerDelete", "handlerEdit"]);
</script>

<template>
  <v-col cols="4">
    <v-card class="card">
      <v-img class="image"
             :src="`https://apipharmacie.pecatte.fr/images/${produit.photo}`"
             :alt="`${produit.denomination} image`"
             :title="`${produit.denomination}`">
      </v-img>

      <v-card-text v-if="produit.photo === ''" class="flex-fill align-content-center justify-content-center">
        {{ produit.denomination }}
      </v-card-text>

      <!-- Bouton Supprimer existant -->
      <v-btn @click="handlerDelete(produit.id)" size="small" class="top-right px-0" icon="mdi-delete" density="comfortable"></v-btn>

      <!-- Nouveau bouton Modifier -->
      <v-btn @click="handlerEdit(produit)" size="small" class="top-right" icon="mdi-pencil" density="comfortable" style="top: 30px;"></v-btn>

      <v-card-title class="card-title">
        <v-container>
          <v-row>
            <v-col class="pa-0" cols="12">
              {{ produit.qte }} - {{ produit.denomination }}
              <br>
              <v-btn @click="() => handlerRemove(produit)" size="x-small">-</v-btn>
              <v-btn @click="() => handlerAdd(produit)" size="x-small">+</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<style scoped>
.card-title {
  background-color: rgba(66, 250, 95, 0.65);
  font-size: math;
  padding: 0;
  min-width: 50px;
}

.card {
  background-color: rgba(0, 0, 0, 0);
  margin: 0;
  min-width: 40px;
}

.top-right {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(66, 250, 95, 0.65);
}

.image {
  height: 10px;
  min-height: 40px;
  object-fit: cover;
}
</style>
