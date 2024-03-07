import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import FoldersPage from "./pages/FoldersPage/FoldersPage";
import { route } from "./utils/routes";

function App() {
  return (
    <Routes>
      <Route path={route.folders} element={<FoldersPage />} />
      <Route path={route.login} element={<LoginPage />} />
    </Routes>
  );
}

export default App;
