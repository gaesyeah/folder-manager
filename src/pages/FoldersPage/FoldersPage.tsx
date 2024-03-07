import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { key } from "../../utils/localStorage";
import { route } from "../../utils/routes";
import { StyledFoldersPage } from "./styles";
import Header from "../../components/FoldersPage/Header/Header";

const FoldersPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(key.userData)) navigate(route.login);
  });

  return (
    <StyledFoldersPage>
      <Header />
    </StyledFoldersPage>
  );
};

export default FoldersPage;
