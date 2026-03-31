<template>
  <q-page padding>
    <q-input v-model="name" label="Location name" />

    <q-btn label="Take Photo" @click="takePhoto" class="q-mt-md" />
    <q-btn label="Get Location" @click="getLocation" class="q-mt-md" />

    <q-btn label="Save" color="primary" @click="saveLocation" class="q-mt-md" />

    <img v-if="photo" :src="photo" width="200" />
    <div v-if="lat !== null && lng !== null">
      <p>Location succesfuly added,  Lat: {{ lat }}, Lng: {{ lng }}</p>
    </div>
    <div v-else-if="btnClicked">
      <p>Getting location failed. Please allow location access and try again.</p>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue"
import { Camera } from "@capacitor/camera"
import { Geolocation } from "@capacitor/geolocation"
import { useRouter } from "vue-router"

const router = useRouter()

const name = ref("")
const photo = ref(null)
const lat = ref(null)
const lng = ref(null)
const btnClicked = ref(false)

async function takePhoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: "dataUrl"
  })

  photo.value = image.dataUrl
}

async function getLocation() {
  try {
    const permission = await Geolocation.requestPermissions()

    if (permission.location === "granted") {
      const position = await Geolocation.getCurrentPosition()

      lat.value = position.coords.latitude
      lng.value = position.coords.longitude

      console.log("GPS OK", lat.value, lng.value)
      btnClicked.value = true
    } else {
      console.log("Permission denied")
      btnClicked.value = true
    }
  } catch (err) {
    console.log("GPS error:", err)
    btnClicked.value = true
  }
}

function saveLocation() {
  const locations = JSON.parse(localStorage.getItem("locations")) || []

  locations.push({
    id: Date.now(),
    name: name.value,
    photo: photo.value,
    lat: lat.value,
    lng: lng.value
  })

  localStorage.setItem("locations", JSON.stringify(locations))

  router.push("/")
}
</script>
