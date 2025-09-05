import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./router/routes";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}