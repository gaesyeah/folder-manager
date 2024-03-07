import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { key } from "../../utils/localStorage";
import { route } from "../../utils/routes";

const FoldersPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(key.userData)) navigate(route.login);
  });

  return <>FoldersPage</>;
};

export default FoldersPage;
