<script setup>
import {onMounted, reactive} from "vue";
import Produit from "@/js/Produit";
import PharmaProduitCard from "@/components/PharmaProduitCard.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import AddNewItemComponent from "@/components/AddNewItemComponent.vue";

const listeProduits = reactive([]);
const url = "https://apipharmacie.pecatte.fr/api/24/medicaments"
let searchQuery = '';

function fetchProduits() {
  fetch(url + "?search=" + searchQuery)
      .then((response) => {
        return response.json()
      })
      .then((dataJson) => {
        console.log("Données reçues de l'API:", dataJson); // à supprimer
        listeProduits.splice(0, listeProduits.length, ...dataJson);

        checkIfSomeItemsAreAtZero();
      })
      .catch((error) => {
        console.log(error)
      })
}

function handlerAddProduits(produit) {
  fetchForPostPut(url, produit.postOptions)
}

function fetchForPostPut(fetchUrl, fetchOptions) {
  console.log(fetchOptions)
  fetch(fetchUrl, fetchOptions)
      .then((reponse) => {
        return reponse.json();
      })
      .then((dataJson) => {
        if (dataJson.status !== 1) {
          console.log(dataJson)
          console.log(fetchOptions);
        }
        fetchProduits();
      })
      .catch((error) => {
        console.log(error)
        console.log(fetchOptions)
      })
}

function checkIfSomeItemsAreAtZero() {
  for (let i = listeProduits.length - 1; i >= 0; i--) {
    if (listeProduits[i].qte <= 0) {
      handlerDelete(listeProduits[i].id)
    }
  }
}

function handlerDelete(idProduit) {
  const fetchOptionsDelete = {
    method: "DELETE"
  }
  fetch(url + "/" + idProduit, fetchOptionsDelete)
      .then((reponse) => {
        return reponse.json();
      })
      .then((dataJson) => {
        if (dataJson.status !== 1) {
          console.log(idProduit + " " + dataJson);
        }
        fetchProduits();
      })
      .then((error) => {
        console.log(error);
      })
}

function handlerUpdateSearchQuery(newSearchQuery) {
  searchQuery = newSearchQuery;
  fetchProduits()
}

function handlerAdd(produit) {
  console.log(produit)
  fetchForPostPut(url, produit.addQtyOption);
}

function handlerRemove(produit) {
  fetchForPostPut(url, produit.removeQtyOption);
}

onMounted(() => {
  fetchProduits();
})
</script>

<template>
  <div class="pharma">
    <v-container class="d-flex pa-0">
      <SearchComponent class="justify-start" @handlerUpdateSearchQuery="handlerUpdateSearchQuery"></SearchComponent>
      <!--
          <h3>Produits de la pharma :</h3>
      -->
      <AddNewItemComponent class="justify-end" @handlerAddProduits="handlerAddProduits"></AddNewItemComponent>
    </v-container>
    <v-row dense>
      <PharmaProduitCard class="pharmaCard pt-5" v-for="produit in listeProduits"
                        :key="`${produit.id}`"
                        :produit="produit"
                        :handlerRemove="handlerRemove"
                        :handlerAdd="handlerAdd"
                        :handlerDelete="handlerDelete"/>
    </v-row>
  </div>
</template>

<style scoped>


</style>
