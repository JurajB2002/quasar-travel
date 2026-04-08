<template>
  <q-page padding v-if="location">
    <h5>{{ location.name }}</h5>

    <img v-if="location.photo" :src="location.photo" width="250" />

    <p>Latitude: {{ location.lat }}</p>
    <p>Longitude: {{ location.lng }}</p>

    <q-btn
      label="Share Location"
      color="primary"
      @click="shareLocation"
      class="q-mt-md"
    />
  </q-page>



  <q-page v-else padding>
    <p>Location not found</p>
  </q-page>
</template>

<script setup>
import { Share } from "@capacitor/share"
import { useRoute } from "vue-router"

const route = useRoute()

const locations = JSON.parse(localStorage.getItem("locations")) || []

const location = locations.find(l => l.id == route.params.id)


async function shareLocation() {
  try {
    if (!location) {
      console.log("No location")
      return
    }

    await Share.share({
      title: "My location",
      text: `https://maps.google.com/?q=${location.lat},${location.lng}`
    })

    console.log("Share OK")
  } catch (err) {
    console.log("Share error:", err)
  }
}
</script>
