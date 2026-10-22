// ==================================================
// REACT ROUTER
// ==================================================

import {
  Outlet
} from 'react-router-dom';


// ==================================================
// COMPONENTS
// ==================================================

import Header
  from '../components/Header.jsx';

import Breadcrumb
  from '../components/Breadcrumb.jsx';


// ==================================================
// LAYOUT
// ==================================================

function Layout() {

  return (
    <>

      {/* NAVBAR - stays normal size */}

      <Header />


      {/* ==========================================
          PAGE CONTENT

          Everything below the navbar
          can now be resized together.
          ========================================== */}

      <div className="pageContent">

        <Breadcrumb />

        <Outlet />

      </div>

    </>
  );

}

export default Layout;