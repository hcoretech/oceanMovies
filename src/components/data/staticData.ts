import { type MockMovie } from "../../types";

export const FEATURED_ITEMS: MockMovie[] = [
  { 
    id: 1, 
    title: "The Cinematic Ocean Expedition", 
    category: "Documentary", 
    rating: 8.9, 
    image: "https://unsplash.com",
    overview: "An immersive deep-sea journey mapping untouched aquatic eco-systems and majestic oceanic life across uncharted waters.",
    isFeatured: true 
  },
  { 
    id: 2, 
    title: "Deep Sea Anomalies", 
    category: "Sci-Fi Thriller", 
    rating: 7.4, 
    image: "https://unsplash.com",
    overview: "When a deep-trench research facility intercepts a rhythmic subsonic signature, the crew discovers they aren't alone.",
    isFeatured: true 
  },
  { 
    id: 3, 
    title: "Coral Reef Guardians", 
    category: "Nature Story", 
    rating: 9.1, 
    image: "https://unsplash.com",
    overview: "Following local coastal conservationists battling environmental tides to restore global life networks.",
    isFeatured: true 
  },
  { 
    id: 4, 
    title: "Midnight Midnight Tides", 
    category: "Action Drama", 
    rating: 6.8, 
    image: "https://unsplash.com" 
  },
];

export const FILTER_CATEGORIES = [
  "All Movies", 
  "Highly Rated (★7.5+)", 
  "Blockbuster Popular (★6.5+)"
];
