<template>
  <q-page padding>
    <h5>Travel Log</h5>

    <q-btn label="Add Location" color="primary" to="/add" />

    <div v-for="loc in locations" :key="loc.id">
      <q-card class="q-mt-md" clickable @click="openDetails(loc)">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>{{ loc.name }}</div>
            <div v v-if="loc.photo">
              <img :src="loc.photo" width="300" />
            </div>
            <q-btn
                color="negative"
                icon="delete"
                size="large"
                round
                flat
                @click.stop="deleteLocation(loc.id)"></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const locations = ref([])

onMounted(() => {
  const data = localStorage.getItem("locations")
  if (data) locations.value = JSON.parse(data)
})

function openDetails(loc) {
  router.push(`/details/${loc.id}`)
}
function deleteLocation(id) {
  locations.value = locations.value.filter(loc => loc.id !== id)
  localStorage.setItem("locations", JSON.stringify(locations.value))
}
</script>
