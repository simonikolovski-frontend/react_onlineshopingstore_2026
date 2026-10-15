// apiClient is our central function
// for all API requests.
import { apiClient } from './client.js';


// ==================================================
// PRODUCTS API
// ==================================================

export const products = {


  // ==================================================
  // GET ALL PRODUCTS
  // ==================================================

  async getAll() {

    return apiClient(
      '/products?limit=0'
    );

  },


  // ==================================================
  // GET PRODUCT BY ID
  // ==================================================

  async getById(id) {

    return apiClient(
      `/products/${id}`
    );

  },


  // ==================================================
  // SEARCH PRODUCTS
  // ==================================================

  async search(
    query,
    options = {}
  ) {

    // Make the search text safe for the URL.
    const safeQuery =
      encodeURIComponent(query);


    return apiClient(
      `/products/search?q=${safeQuery}&limit=0`,

      // This lets us send things like:
      //
      // signal: controller.signal
      options
    );

  },


  // ==================================================
  // GET CATEGORIES
  // ==================================================

  async getCategories() {

    return apiClient(
      '/products/categories'
    );

  }

};