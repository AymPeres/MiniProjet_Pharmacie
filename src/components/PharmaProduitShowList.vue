<script setup>
import { onMounted, reactive, ref } from "vue";
import Produit from "@/js/Produit";
import PharmaProduitCard from "@/components/PharmaProduitCard.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import AddNewItemComponent from "@/components/AddNewItemComponent.vue";
import EditProduitComponent from "@/components/EditProduitComponent.vue";

const listeProduits = reactive([]);
const url = "https://apipharmacie.pecatte.fr/api/24/medicaments";
let searchQuery = '';

const editDialog = ref(false);
const selectedProduitToEdit = ref(null);

function fetchProduits() {
  fetch(url + "?search=" + searchQuery)
      .then(response => response.json())
      .then(dataJson => {
        console.log("Données reçues de l'API:", dataJson);
        // Réinitialise le tableau
        listeProduits.splice(0, listeProduits.length, ...dataJson.map(produit => new Produit(
            produit.id,
            produit.denomination,
            produit.qte,
            produit.photo,
            produit.formepharmaceutique
        )));

        checkIfSomeItemsAreAtZero();
      })
      .catch(error => {
        console.log(error);
      });
}


function handlerAddProduits(produit) {
  fetchForPostPut(url, produit.postOptions);
}

function fetchForPostPut(fetchUrl, fetchOptions) {
  console.log(fetchOptions);
  fetch(fetchUrl, fetchOptions)
      .then((reponse) => reponse.json())
      .then((dataJson) => {
        if (dataJson.status !== 1) {
          console.log(dataJson);
          console.log(fetchOptions);
        }
        fetchProduits();
      })
      .catch((error) => {
        console.log(error);
        console.log(fetchOptions);
      });
}

function checkIfSomeItemsAreAtZero() {
  for (let i = listeProduits.length - 1; i >= 0; i--) {
    if (listeProduits[i].qte <= 0) {
      handlerDelete(listeProduits[i].id);
    }
  }
}

function handlerDelete(idProduit) {
  const fetchOptionsDelete = {
    method: "DELETE",
  };
  fetch(url + "/" + idProduit, fetchOptionsDelete)
      .then((reponse) => reponse.json())
      .then((dataJson) => {
        if (dataJson.status !== 1) {
          console.log(idProduit + " " + dataJson);
        }
        fetchProduits();
      })
      .catch((error) => {
        console.log(error);
      });
}

function handlerUpdateSearchQuery(newSearchQuery) {
  searchQuery = newSearchQuery;
  fetchProduits();
}

function handlerAdd(produit) {
  fetchForPostPut(url, produit.addQtyOption);
}

function handlerRemove(produit) {
  fetchForPostPut(url, produit.removeQtyOption);
}

// Ouvre le dialog d'édition pour le produit sélectionné
function handlerEdit(produit) {
  selectedProduitToEdit.value = produit;
  editDialog.value = true;
}

// Gestion de l'événement d'édition depuis EditProduitComponent
function handlerEditProduit(editedData) {
  fetchForPostPut(url, selectedProduitToEdit.value.updateOptions(
      editedData.newDenomination,
      editedData.newPhoto,
      editedData.newForme
  ));
}

onMounted(() => {
  fetchProduits();
});
</script>

<template>
  <div class="pharma">
    <v-container class="d-flex pa-0">
      <SearchComponent class="justify-start" @handlerUpdateSearchQuery="handlerUpdateSearchQuery" />
      <AddNewItemComponent class="justify-end" @handlerAddProduits="handlerAddProduits" />
    </v-container>
    <v-row dense>
      <PharmaProduitCard
          class="pharmaCard pt-5"
          v-for="produit in listeProduits"
          :key="produit.id"
          :produit="produit"
          :handlerRemove="handlerRemove"
          :handlerAdd="handlerAdd"
          :handlerDelete="handlerDelete"
          :handlerEdit="handlerEdit"
      />
    </v-row>
    <EditProduitComponent
        v-model="editDialog"
        :produit="selectedProduitToEdit"
        @handlerEditProduit="handlerEditProduit"
    />
  </div>
</template>

<style scoped>
/* Ajoute ici tes styles si nécessaire */
</style>
