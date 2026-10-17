// ==================================================
// REACT
// ==================================================

import {
  createContext,
  useContext
} from 'react';


// ==================================================
// LOCAL STORAGE HOOK
// ==================================================

import useLocalStorage
  from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. TRANSLATIONS
// ==================================================

const translations = {


  // ==================================================
  // ENGLISH
  // ==================================================

  English: {

    // HEADER
    home: 'Home',
    about: 'About',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    cart: 'Cart',
    welcome: 'Hello',


    // HOME PAGE
    categories: 'Categories',
    all: 'All',
    latestProducts: 'Latest Products',
    searchProducts: 'Search products...',
    clearFilters: 'Clear Filters',
    products: 'products',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    loading: 'Loading...',
    error: 'Error',
    noProducts: 'No products found.',


    // CART PAGE
    cartTitle: 'Shopping Cart',
    emptyCart: 'Your cart is empty.',
    remove: 'Remove',
    clearCart: 'Clear Cart',
    total: 'Total',


    // PRODUCT DETAILS
    back: 'Back',
    brand: 'Brand',
    addToCart: 'Add to Cart',
    loginToAddToCart: 'Login to Add to Cart',

    loginFirstMessage:
      'Please login first to add products to your cart.',


    // BREADCRUMB
    productsPage: 'Products',
    searchPage: 'Search',


    // ABOUT PAGE
    aboutTitle: 'About Us',

    aboutText:
      'Welcome to our online store. Here you can browse products, view product details and add products to your cart.'

  },


  // ==================================================
  // MACEDONIAN
  // ==================================================

  Macedonian: {

    // HEADER
    home: 'Почетна',
    about: 'За нас',
    login: 'Најави се',
    logout: 'Одјави се',
    register: 'Регистрирај се',
    cart: 'Кошничка',
    welcome: 'Здраво',


    // HOME PAGE
    categories: 'Категории',
    all: 'Сите',
    latestProducts: 'Најнови производи',
    searchProducts: 'Пребарај производи...',
    clearFilters: 'Исчисти филтри',
    products: 'производи',
    previous: 'Претходна',
    next: 'Следна',
    page: 'Страница',
    of: 'од',
    loading: 'Се вчитува...',
    error: 'Грешка',
    noProducts: 'Нема пронајдени производи.',


    // CART PAGE
    cartTitle: 'Кошничка',
    emptyCart: 'Вашата кошничка е празна.',
    remove: 'Отстрани',
    clearCart: 'Испразни кошничка',
    total: 'Вкупно',


    // PRODUCT DETAILS
    back: 'Назад',
    brand: 'Бренд',
    addToCart: 'Додај во кошничка',
    loginToAddToCart: 'Најави се за да додадеш',

    loginFirstMessage:
      'Најавете се за да додадете производ во кошничката.',


    // BREADCRUMB
    productsPage: 'Производи',
    searchPage: 'Пребарување',


    // ABOUT PAGE
    aboutTitle: 'За нас',

    aboutText:
      'Добредојдовте во нашата онлајн продавница. Тука можете да разгледувате производи, да ги видите нивните детали и да додавате производи во кошничката.'

  }

};


// ==================================================
// 2. CREATE LANGUAGE CONTEXT
// ==================================================

const LanguageContext =
  createContext(null);


// ==================================================
// 3. LANGUAGE PROVIDER
// ==================================================

export function LanguageProvider({
  children
}) {


  // ==================================================
  // LANGUAGE + LOCAL STORAGE
  // ==================================================

  // Before we had:
  //
  // useState('English')
  //
  // Now we use:
  //
  // useLocalStorage('language', 'English')
  //
  // "language" is the localStorage key.
  //
  // "English" is the default value.

  const [
    language,
    setLanguage
  ] = useLocalStorage(
    'language',
    'English'
  );


  // ==================================================
  // 4. CHANGE LANGUAGE
  // ==================================================

  function changeLanguage() {

    setLanguage(previousLanguage => {

      if (
        previousLanguage === 'English'
      ) {

        return 'Macedonian';

      }


      return 'English';

    });

  }


  // ==================================================
  // 5. TRANSLATE FUNCTION
  // ==================================================

  function t(key) {

    return (
      translations[language][key]
      ?? key
    );

  }


  // ==================================================
  // 6. PROVIDE LANGUAGE DATA
  // ==================================================

  return (
    <LanguageContext
      value={{
        language,
        changeLanguage,
        t
      }}
    >

      {children}

    </LanguageContext>
  );

}


// ==================================================
// 7. CUSTOM HOOK
// ==================================================

export function useLanguage() {

  const context =
    useContext(LanguageContext);


  if (context === null) {

    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    );

  }


  return context;

}