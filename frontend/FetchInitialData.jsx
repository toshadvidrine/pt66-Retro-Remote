import React, { useEffect } from 'react';
import axios from 'axios';
import useGlobalReducer from './hooks/useGlobalReducer'; // Adjust the import path as necessary

const FetchInitialData = () => {
  const { dispatch } = useGlobalReducer();
  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL + "/api";

  useEffect(() => {
    const fetchData = async () => {
      // try {
        // Fetch top-rated movies
        const movieResponse = await axios.get(`${apiBaseUrl}/top-rated/movies`);
        console.log('Movies fetched:', movieResponse.data); // Log the fetched movies
        dispatch({ type: 'set_movies', payload: movieResponse.data });

        // Fetch top-rated TV shows
        const showResponse = await axios.get(`${apiBaseUrl}/top-rated/shows`);
        console.log('Shows fetched:', showResponse.data); // Log the fetched shows
        dispatch({ type: 'set_shows', payload: showResponse.data });
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }
    };

    fetchData();
  }, [dispatch]);

  return null; // This component does not render anything
};

export default FetchInitialData;