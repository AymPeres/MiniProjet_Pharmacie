<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  produit: Object,      // Le produit à éditer
  modelValue: Boolean   // Pour contrôler l'ouverture du dialog via v-model
});
const emit = defineEmits(["update:modelValue", "handlerEditProduit"]);

const data = ref({
  itemName: "",
  photoUrl: "",
  forme: ""
});

// Propriété calculée pour gérer le binding bidirectionnel du dialog
const dialogValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});

// Mise à jour des données du formulaire lorsque le produit change
watch(() => props.produit, (newProduit) => {
  if (newProduit) {
    data.value.itemName = newProduit.denomination;
    data.value.photoUrl = newProduit.photo;
    data.value.forme = newProduit.formepharmaceutique;
  }
}, { immediate: true });

function updateProduit() {
  emit("handlerEditProduit", {
    id: props.produit.id,
    newDenomination: data.value.itemName,
    newPhoto: data.value.photoUrl,
    newForme: data.value.forme
  });
  // Fermeture du dialog via la propriété calculée
  dialogValue.value = false;
}
</script>

<template>
  <v-dialog v-model="dialogValue" max-width="1024">
    <v-card>
      <v-card-title>
        Modifier le produit
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="9" md="6">
              <v-text-field v-model="data.itemName" label="Nom du produit *" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="9" md="6">
              <v-text-field v-model="data.forme" label="Forme pharmaceutique *" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="data.photoUrl" label="URL de la photo"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialogValue = false">Annuler</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="updateProduit">Sauvegarder</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
