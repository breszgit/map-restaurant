import express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import { IRestaurant, Restaurant } from './models/Restaurant';
import cors from 'cors';

const app = express();
const port = 3000;

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://webapp', 'http://localhost'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

// Connect to MongoDB
mongoose.connect('mongodb://root:Scg!2023@mongo:27017/restaurant?authSource=admin');
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
// Route for getting restaurants
app.get('/restaurants', async (req: Request, res: Response) => {
  // Query parameter
  const keyword = req.query.keyword || 'Bang sue';

  // Search in cache
  let restaurants = await Restaurant.find({ keyword });
  if (restaurants.length === 0) {
    // Call Google Maps API if not in cache
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}+restaurants&key=${googleMapsApiKey}`);
    restaurants = response.data.results;

    // Store in cache
    // restaurants.forEach((restaurant: any) => {
    restaurants.forEach((restaurant: IRestaurant) => {
      const newRestaurant = new Restaurant({ ...restaurant, keyword });
      newRestaurant.save();
    });
  }

  res.json(restaurants);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
