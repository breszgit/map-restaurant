import { defineStore } from "pinia";

import RestaurantService from "../services/RestaurantService";

export const useRestaurantStore = defineStore("restaurantStore", {
    state:() => ({
        restaurants: [] as any,
        focusRestaurant: {} as any
    }),
    actions:{
        async getRestaurant(keyword:string){
            const res = await RestaurantService.getRestaurants(keyword);
            if(res !== undefined && res.status === 200){
                this.restaurants = res.data;
            }
        }
    }
})
