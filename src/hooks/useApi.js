// useState stores:
// data, loading and error.
//
// useEffect runs the API request.
import {
  useState,
  useEffect
} from 'react';


// ==================================================
// USE API CUSTOM HOOK
// ==================================================

export function useApi(
  apiFn,
  deps = []
) {

  // ==================================================
  // STATE
  // ==================================================

  // Data returned from the API.
  const [data, setData] =
    useState(null);


  // Start with loading = true
  // because the request has not finished yet.
  const [loading, setLoading] =
    useState(true);


  // No error at the beginning.
  const [error, setError] =
    useState(null);


  // ==================================================
  // API REQUEST
  // ==================================================

  useEffect(() => {

    // This variable helps us avoid
    // updating state after the component
    // has already disappeared.
    let cancelled = false;


    async function fetchData() {

      try {

        // New request starts.
        setLoading(true);


        // Remove an old error.
        setError(null);


        // Run the API function
        // that was given to the hook.
        const result =
          await apiFn();


        // Only update state if
        // the component still exists.
        if (!cancelled) {
          setData(result);
        }

      } catch (err) {

        // Only save the error if
        // the component still exists.
        if (!cancelled) {
          setError(err);
        }

      } finally {

        // Request finished.
        if (!cancelled) {
          setLoading(false);
        }

      }

    }


    // Run the request.
    fetchData();


    // ==================================================
    // CLEANUP
    // ==================================================

    // When the component unmounts
    // or dependencies change,
    // mark the old request as cancelled.
    return () => {
      cancelled = true;
    };

  }, deps);


  // ==================================================
  // RETURN
  // ==================================================

  return {
    data,
    loading,
    error
  };
}