import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { key } from "../../utils/localStorage";
import { route } from "../../utils/routes";
import { StyledFoldersPage } from "./styles";
import Header from "../../components/FoldersPage/Header/Header";
import Folders from "../../components/FoldersPage/Folders/Folders";
import EditBlocker from "../../components/FoldersPage/EditBlocker/EditBlocker";

const FoldersPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(key.userData)) navigate(route.login);
  });

  return (
    <StyledFoldersPage>
      <Header />
      <Folders />
      <EditBlocker />
    </StyledFoldersPage>
  );
};

export default FoldersPage;
