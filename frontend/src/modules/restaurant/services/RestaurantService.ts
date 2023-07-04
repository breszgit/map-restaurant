import http from "../../../http-common";

class RestaurantService {
  getRestaurants(keyword: string): Promise<any> {
    return http.get(`/restaurants?keyword=${keyword}`);
  }
}

export default new RestaurantService();
