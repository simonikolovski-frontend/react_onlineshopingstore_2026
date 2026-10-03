// We need useState to store data.
// We need useEffect to run the fetch.
import { useState, useEffect } from 'react';

function useFetch(url) {
  // Stores the data we get from the API.
  const [data, setData] = useState(null);

  // true while we are waiting for the API.
  const [isLoading, setIsLoading] = useState(true);

  // Stores an error message if something goes wrong.
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Start loading.
        setIsLoading(true);

        // Get data from the URL.
        const response = await fetch(url);

        // If request failed, create an error.
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Convert JSON into JavaScript data.
        const result = await response.json();

        // Save the data.
        setData(result);

      } catch (err) {
        // Save the error message.
        setError(err.message);

      } finally {
        // Stop loading.
        setIsLoading(false);
      }
    }

    // Run the function.
    fetchData();

  }, [url]);

  // Give these values back to the component.
  return {
    data,
    isLoading,
    error
  };
}

export default useFetch;