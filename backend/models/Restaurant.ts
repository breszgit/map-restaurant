import mongoose, { Schema, Document, Decimal128 } from 'mongoose';

export type Geometry = {
  location: Location;
  viewport: Viewport;
}

export type Viewport = {
  northeast: Location;
  southwest: Location;
}

export type Location = {
  lat: Decimal128;
  lng: Decimal128;
}

export type OpenNow = {
  open_now: boolean;
}

export type Photos = {
  height: number;
  width: number;
  photo_reference: string;
  html_attributions: string[];
}

export type PlusCode = {
  compound_code: string;
  global_code: string;
}

export interface IRestaurant extends Document {
  keyword: string;
  business_status: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours:OpenNow
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
}

const RestaurantSchema: Schema = new Schema({
  keyword: { type: String, required: true },
  business_status: { type: String },
  geometry: { 
    location:{
      lat: { type: Number },
      lng: { type: Number },
    },
    viewport:{
      northeast:{
        lat: { type: Number },
        lng: { type: Number },
      },
      southwest:{
        lat: { type: Number },
        lng: { type: Number },
      },
    }
  },
  icon: { type: String, required: false },
  icon_background_color: { type: String, required: false },
  icon_mask_base_uri: { type: String, required: false },
  name: { type: String, required: true },
  opening_hours: {
    open_now: { type: Boolean, required: false}
  },
  photos: [
    {
      height: {type: Number, required: false},
      html_attributions:[ {type: String, required: false} ],
      photo_reference: {type: String, required: false},
      width: {type: Number, required: false},
    }
  ],
  place_id: { type: String, required: false },
  plus_code:{
    compound_code: {type: String, required: false},
    global_code: {type: String, required: false},
  },
  rating: { type: Number, required: false },
  reference: { type: String, required: false },
  types: [
    {type: String, required: false}
  ],
  user_ratings_total: { type: Number, required: false}
},
{
  versionKey: false
});

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
