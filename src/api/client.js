// ==================================================
// API BASE URL
// ==================================================

// Main address of DummyJSON.
const BASE_URL = 'https://dummyjson.com';


// ==================================================
// CUSTOM API ERROR
// ==================================================

// Our own error type.
//
// It keeps:
// - message
// - HTTP status
// - extra server data
export class ApiError extends Error {

  constructor(message, status, data) {

    // Call the normal Error constructor.
    super(message);


    // Example:
    // 404
    // 500
    this.status = status;


    // Extra data returned by the API.
    this.data = data;

  }

}


// ==================================================
// API CLIENT
// ==================================================

// This is our central fetch function.
//
// Example:
//
// apiClient('/products')
//
// becomes:
//
// https://dummyjson.com/products
export async function apiClient(
  endpoint,
  options = {}
) {

  // ==================================================
  // CREATE FULL URL
  // ==================================================

  const url =
    `${BASE_URL}${endpoint}`;


  // ==================================================
  // REQUEST CONFIG
  // ==================================================

  const config = {

    // Keep options like:
    // method
    // body
    // signal
    ...options,


    // Default headers + custom headers.
    headers: {

      'Content-Type': 'application/json',

      ...options.headers

    }

  };


  // ==================================================
  // SEND REQUEST
  // ==================================================

  const response =
    await fetch(
      url,
      config
    );


  // ==================================================
  // HANDLE HTTP ERRORS
  // ==================================================

  // fetch() does NOT automatically throw
  // an error for 404 or 500.
  //
  // So we check response.ok ourselves.
  if (!response.ok) {

    // Try to read error information
    // from the API.
    const data =
      await response
        .json()
        .catch(() => null);


    // Throw our custom error.
    throw new ApiError(
      `API error: ${response.status}`,
      response.status,
      data
    );

  }


  // ==================================================
  // RETURN DATA
  // ==================================================

  return response.json();

}