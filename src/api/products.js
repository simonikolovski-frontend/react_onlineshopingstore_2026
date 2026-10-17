// apiClient is our central function
// for communicating with DummyJSON.
import { apiClient } from './client.js';


// ==================================================
// PRODUCTS API
// ==================================================

export const products = {


  // ==================================================
  // GET ALL PRODUCTS
  // ==================================================

  async getAll(options = {}) {

    return apiClient(
      '/products?limit=0',
      options
    );

  },


  // ==================================================
  // GET ONE PRODUCT BY ID
  // ==================================================

  async getById(
    id,
    options = {}
  ) {

    return apiClient(
      `/products/${id}`,
      options
    );

  },


  // ==================================================
  // SEARCH PRODUCTS
  // ==================================================

  async search(
    query,
    options = {}
  ) {

    // Make search text safe for a URL.
    const safeQuery =
      encodeURIComponent(query);


    return apiClient(
      `/products/search?q=${safeQuery}&limit=0`,
      options
    );

  },


  // ==================================================
  // GET PRODUCT CATEGORIES
  // ==================================================

  async getCategories(options = {}) {

    return apiClient(
      '/products/categories',
      options
    );

  }

};