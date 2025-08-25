import { Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Layout from "./Layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}
