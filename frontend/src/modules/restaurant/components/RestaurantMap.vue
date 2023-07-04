<template>
  <v-container class="fill-height" :fluid="true">
    <v-responsive class="align-center fill-height">
      <GoogleMap
        api-key="AIzaSyAU-E8DW16W3p2Jz6fZ_giYdCwCZq7RkXA"
        style="width: 100%; height: 85vh"
        :center="center"
        :zoom="15"
        :map-type-control="false"
        :street-view-control="false"
      >
        <CustomControl position="TOP_LEFT">
          <v-card max-height="400" min-width="300" class="ml-4 mt-4 mx-auto">
            <v-card-text>
              <v-text-field label="Search" v-model="keyword"></v-text-field>
              <v-btn
                prepend-icon="mdi-map-search"
                variant="outlined"
                @click="fetchRestaurants"
              >
                Search
              </v-btn>
            </v-card-text>

            <v-card-text
              class="search-result"
              max-width="300"
              v-if="restaurants.length > 0"
            >
              <small class="mb-2"
                >Found: {{ restaurants.length }} restaurants.</small
              >
              <v-divider></v-divider>
              <RestaurantCard
                v-for="restaurant in restaurants" :key="restaurant.place_id"
                v-bind:name="restaurant.name"
                v-bind:photo_url="restaurant.photos !== undefined && restaurant.photos.length > 0 && restaurant.photos[0].photo_reference !== undefined ? restaurant.photos[0].photo_reference : ''"
                v-bind:is_open="restaurant.opening_hours !== undefined ? restaurant.opening_hours.open_now : false"
                v-bind:rating="restaurant.rating"
                v-bind:item="restaurant"
                v-bind:on_click="showPlaceInfo"
              />
            </v-card-text>
          </v-card>
        </CustomControl>

        <Marker :options="markerOptions" v-if="focusRestaurant.name !== undefined" />
        <InfoWindow :options="{ position: markerOptions.position }" v-if="focusRestaurant.name !== undefined">
          <RestaurantInfo v-if="focusRestaurant.name !== undefined" />
        </InfoWindow>
      </GoogleMap>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRestaurantStore } from "../stores/useRestaurantStore";
import { storeToRefs } from "pinia";
import { GoogleMap, Marker, InfoWindow, CustomControl } from "vue3-google-map";
import RestaurantCard from "@/modules/restaurant/components/RestaurantCard.vue"
import RestaurantInfo from "@/modules/restaurant/components/RestaurantInfo.vue"

const restaurantStore = useRestaurantStore();
const { restaurants, focusRestaurant } = storeToRefs(restaurantStore);
const { getRestaurant } = restaurantStore;

const keyword = ref("");
const center = ref({ lat: 13.8157767, lng: 100.5334677 });
const markerOptions = ref([] as any);

const fetchRestaurants = async () => {
  await getRestaurant(keyword.value);
};

const showPlaceInfo = (place: any) => {
  const icon = {
    url: place.icon, // url
    scaledSize: {width: 50, height:50}, // scaled size
  };

  markerOptions.value = {
    position: place.geometry.location,
    icon: icon,
    title: place.name,
  };
  center.value = place.geometry.location;
  focusRestaurant.value = place;
};
</script>

<style scoped>
.search-result {
  overflow-y: scroll;
  max-height: 250px;
}
</style>
