// ==================================================
// API BASE URL
// ==================================================

const BASE_URL = 'https://dummyjson.com';


// ==================================================
// CUSTOM API ERROR
// ==================================================

export class ApiError extends Error {

  constructor(message, status, data) {

    super(message);

    this.status = status;

    this.data = data;

  }

}


// ==================================================
// WAIT FUNCTION
// ==================================================

// This function pauses the code.
//
// Example:
// wait(1000)
//
// means:
// wait 1 second.
function wait(milliseconds) {

  return new Promise(resolve => {

    setTimeout(
      resolve,
      milliseconds
    );

  });

}


// ==================================================
// API CLIENT
// ==================================================

export async function apiClient(
  endpoint,
  options = {}
) {

  // Combine base URL and endpoint.
  const url =
    `${BASE_URL}${endpoint}`;


  // Maximum number of attempts.
  const maxAttempts = 3;


  // ==================================================
  // RETRY LOOP
  // ==================================================

  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {

    try {

      // ==============================================
      // REQUEST CONFIG
      // ==============================================

      const config = {

        // Keep options like:
        // method
        // body
        // signal
        ...options,


        // Default headers + custom headers.
        headers: {

          'Content-Type':
            'application/json',

          ...options.headers

        }

      };


      // ==============================================
      // FETCH
      // ==============================================

      const response =
        await fetch(
          url,
          config
        );


      // ==============================================
      // HTTP ERROR
      // ==============================================

      if (!response.ok) {

        const data =
          await response
            .json()
            .catch(() => null);


        throw new ApiError(
          `API error: ${response.status}`,
          response.status,
          data
        );

      }


      // ==============================================
      // SUCCESS
      // ==============================================

      return response.json();


    } catch (error) {

      // ==============================================
      // ABORTED REQUEST
      // ==============================================

      // If AbortController cancelled the request,
      // do NOT retry it.
      if (error.name === 'AbortError') {

        throw error;

      }


      // ==============================================
      // DO NOT RETRY 4xx ERRORS
      // ==============================================

      // Examples:
      // 400 Bad Request
      // 401 Unauthorized
      // 404 Not Found
      //
      // Retrying these usually will not help.
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {

        throw error;

      }


      // ==============================================
      // LAST ATTEMPT
      // ==============================================

      // If this was attempt 3,
      // there are no more retries.
      if (attempt === maxAttempts) {

        throw error;

      }


      // ==============================================
      // RETRY
      // ==============================================

      console.log(
        `Request failed. Retry ${attempt + 1} of ${maxAttempts}...`
      );


      // Wait 1 second
      // before trying again.
      await wait(1000);

    }

  }

}