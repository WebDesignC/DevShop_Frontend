import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BarraOfertas from "../components/BarraOfertas";
import "../styles/Layout.css"; 
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
