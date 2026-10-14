// Outlet shows the current page.
import { Outlet } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';


function Layout() {
  return (
    <>
      {/* Shared header */}
      <Header />


      {/* Shared breadcrumb */}
      <Breadcrumb />


      {/* Current page */}
      <Outlet />
    </>
  );
}


export default Layout;