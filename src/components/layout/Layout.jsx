import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BarraOfertas from "./BarraOfertas";
import "../../styles/Layout.css"; 
export default function Layout() {
  return (
    <>
      <BarraOfertas />
      <Navbar />

      <main className="page-shell">
        <div className="page-container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}
