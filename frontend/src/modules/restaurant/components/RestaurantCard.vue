<template>
  <div>
    <v-card
      class="mx-auto mb-2"
      max-width="300"
      @click="on_click(restaurant)"
    >
      <v-img
        v-if="restaurantPhotoUrl !== ''"
        :src="getPlaceImageUrl"
        height="100px"
        cover
      ></v-img>

      <v-card-title>
        {{ restaurantName }}
      </v-card-title>

      <v-card-text>
        <v-rating
          v-model="restaurantRating"
          bg-color="orange-lighten-1"
          color="amber"
          density="compact"
          half-increments
          readonly
        ></v-rating>
        <div :class="'text-body-2 ' + (restaurantIsOpen === true ? 'text-success' : 'text-error')">{{ restaurantIsOpen === true ? 'เปิดอยู่' : 'ปิด' }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

interface Props {
  name: string;
  photo_url: string;
  rating: number;
  is_open: boolean;
  item: any;
  on_click: (item:any) => void;
}

const props = defineProps<Props>()
const restaurantName = ref(props.name)
const restaurantPhotoUrl = ref(props.photo_url)
const restaurantRating = ref(props.rating)
const restaurantIsOpen = ref(props.is_open)
const restaurant = ref(props.item)
const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY

watch(restaurantPhotoUrl, (new_val) => {
  restaurantPhotoUrl.value = new_val
});
watch(restaurantName, (new_val) => {
  restaurantName.value = new_val
});
watch(restaurantRating, (new_val) => {
  restaurantRating.value = new_val
});
watch(restaurantIsOpen, (new_val) => {
  restaurantIsOpen.value = new_val
});
watch(restaurant, (new_val) => {
  restaurant.value = new_val
});

const getPlaceImageUrl = computed(() => {
  return restaurantPhotoUrl.value !== '' ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurantPhotoUrl.value}&key=${googleApiKey}` : ''
})
</script>
