import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import PhotoGrid from "./components/PhotoGrid";
import "./App.css";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos"; 
const API_KEY = "Z0Nls9vx63-zNWxm5K0wgaHcul9GUHjwoOGKX9fyWyA"; 

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUnsplashPhotos("nature"); 
  }, []);

  const fetchUnsplashPhotos = async (searchQuery) => {
    try {
      const response = await axios.get(UNSPLASH_API_URL, {
        params: { query: searchQuery, per_page: 12 },
        headers: { Authorization: `Client-ID ${API_KEY}` },
      });

      // Map Unsplash data to your local structure////////////////////
      const unsplashPhotos = response.data.results.map((photo) => ({
        id: photo.id,
        file_path: photo.urls.small,
        description: photo.alt_description || "No description",
      }));

      setPhotos(unsplashPhotos);
    } catch (err) {
      setError("Failed to fetch photos from Unsplash API.");
    }
  };

  const handleSearch = () => {
    if (query) {
      fetchUnsplashPhotos(query);
    }
  };

  return (
    <div className="gallery-container">
      <h1>Photo Gallery</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <PhotoGrid photos={photos} />
    </div>
  );
};

export default App;


