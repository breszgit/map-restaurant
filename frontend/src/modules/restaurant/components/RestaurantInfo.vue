<template>
  <div>
    <v-card class="mx-auto" max-width="350">
      <v-img
        v-if="focusRestaurant.photos !== undefined && focusRestaurant.photos.length > 0 && focusRestaurant.photos[0].photo_reference !== undefined"
        cover
        height="200"
        :src="getPlaceImageUrl"
      ></v-img>

      <v-card-item>
        <v-card-title>{{ focusRestaurant.name }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">Restarunt</span>

          <v-icon
            color="error"
            icon="mdi-food-fork-drink"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :model-value="focusRestaurant.rating"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>

          <div class="text-grey ms-4">
            {{ focusRestaurant.rating }} ({{
              focusRestaurant.user_ratings_total
            }})
          </div>
        </v-row>

        <div
          class="mt-3"
          v-if="focusRestaurant.formatted_address !== ''"
        >
          {{ focusRestaurant.formatted_address }}
        </div>
      </v-card-text>

      <div class="px-4" v-if="focusRestaurant.opening_hours !== undefined">
        <v-chip
          v-if="focusRestaurant.opening_hours.open_now === true"
          class="mt-1 mb-1"
          color="success"
          label
        >
          <v-icon start icon="mdi-calendar-check"></v-icon>
          Open Now
        </v-chip>

        <v-chip
          v-if="focusRestaurant.opening_hours.open_now === false"
          class="mt-1 mb-1"
          color="error"
          label
        >
          <v-icon start icon="mdi-calendar-remove"></v-icon>
          Closed
        </v-chip>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRestaurantStore } from "../stores/useRestaurantStore";
import { storeToRefs } from "pinia";

const restaurantStore = useRestaurantStore();
const { focusRestaurant } = storeToRefs(restaurantStore);
const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY

const getPlaceImageUrl = computed(() => {
  if(focusRestaurant.value.photos !== undefined && focusRestaurant.value.photos.length > 0 && focusRestaurant.value.photos[0].photo_reference !== undefined)
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${focusRestaurant.value.photos[0].photo_reference}&key=${googleApiKey}`
  else
    return ''
})
</script>
