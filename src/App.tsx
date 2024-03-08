import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import FoldersPage from "./pages/FoldersPage/FoldersPage";
import { route } from "./utils/routes";
import { GlobalContextProvider } from "./contexts/globalContext";

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path={route.login} element={<LoginPage />} />
        <Route
          path={`${route.folders}/:identifier`}
          element={<FoldersPage />}
        />
        <Route path="/" element={<Navigate to={`${route.folders}/root`} />} />
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
