// import Employees from "./pages/Employees";
import "../styles/style.scss";
// import EmployeeDetails from "./pages/EmployeeDetails";
// import RolesAndPermissions from "./pages/RolesAndPermissions";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import NotFoundDetailsPage from "./pages/NotFoundDetails";
import { Outlet, useLocation } from "react-router";
import Header from "./components/Header";
import { useState } from "react";
import MobileMenu from "./components/MobileMenu";

function App() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup";

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  function triggerRefresh() {
    setRefreshKey((prev) => prev + 1);
  }
  return (
    <>
      {!hideHeader && (
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      <main className="container" id="app">
        {!hideHeader && isMobileMenuOpen && (
          <MobileMenu
            isMobileMenuOpen={isMobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}

        <Outlet context={{ refreshKey, triggerRefresh }} />
      </main>
    </>
  );
}

export default App;
