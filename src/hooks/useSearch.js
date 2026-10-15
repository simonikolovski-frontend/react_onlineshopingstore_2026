// useState stores:
// results, loading and error.
//
// useEffect runs the search request.
import {
  useState,
  useEffect
} from 'react';


// Products API module.
import { products } from '../api/products.js';


// ==================================================
// USE SEARCH HOOK
// ==================================================

export function useSearch(query) {

  // ==================================================
  // STATE
  // ==================================================

  // Search results.
  const [data, setData] =
    useState(null);


  // Search loading state.
  const [loading, setLoading] =
    useState(false);


  // Search error state.
  const [error, setError] =
    useState(null);


  // ==================================================
  // SEARCH EFFECT
  // ==================================================

  useEffect(() => {

    // If there is no search text,
    // clear the old results.
    if (!query) {

      setData(null);

      setLoading(false);

      setError(null);

      return;
    }


    // ==================================================
    // CREATE ABORT CONTROLLER
    // ==================================================

    const controller =
      new AbortController();


    // ==================================================
    // SEARCH FUNCTION
    // ==================================================

    async function searchProducts() {

      try {

        // Search starts.
        setLoading(true);


        // Remove old error.
        setError(null);


        // Send request.
        //
        // controller.signal allows us
        // to cancel this request later.
        const result =
          await products.search(
            query,
            {
              signal: controller.signal
            }
          );


        // Save results.
        setData(result);

      } catch (err) {

        // AbortError is expected when
        // we cancel an old request.
        //
        // We do NOT want to show it
        // as a real error to the user.
        if (err.name !== 'AbortError') {

          setError(err);

        }

      } finally {

        // Only stop loading if
        // this request was not aborted.
        if (!controller.signal.aborted) {

          setLoading(false);

        }

      }

    }


    // Run search.
    searchProducts();


    // ==================================================
    // CLEANUP
    // ==================================================

    // When query changes,
    // cancel the old request.
    return () => {

      controller.abort();

    };

  }, [query]);


  // ==================================================
  // RETURN
  // ==================================================

  return {
    data,
    loading,
    error
  };
}